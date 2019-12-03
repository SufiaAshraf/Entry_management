"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var https = require("https");
var http = require("http");
var request = require("request");
var querystring = require("querystring");

var HttpClient = function () {
  function HttpClient(options, credentials) {
    _classCallCheck(this, HttpClient);

    this.credentials = credentials;
    this.host = options.host || "rest.nexmo.com";
    this.port = options.port || 443;
    this.https = options.https || https;
    this.http = options.http || http;
    this.headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json"
    };
    this.logger = options.logger;
    this.timeout = options.timeout;
    this.requestLib = request;

    if (options.userAgent) {
      this.headers["User-Agent"] = options.userAgent;
    }
  }

  _createClass(HttpClient, [{
    key: "request",
    value: function request(endpoint, method, callback) {
      var _this = this;

      var skipJsonParsing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var customResponseParser = arguments[4];

      if (typeof method === "function") {
        callback = method;
        endpoint.method = endpoint.method || "GET";
      } else if (typeof method !== "undefined") {
        endpoint.method = method;
      }

      if (endpoint.method === "POST" || endpoint.method === "DELETE") {
        // TODO: verify the following fix is required
        // Fix broken due ot 411 Content-Length error now sent by Nexmo API
        // PL 2016-Sept-6 - commented out Content-Length 0
        // headers['Content-Length'] = 0;
      }
      var options = {
        host: endpoint.host ? endpoint.host : this.host,
        port: this.port,
        path: endpoint.path,
        method: endpoint.method,
        headers: Object.assign({}, this.headers)
      };

      if (this.timeout !== undefined) {
        options.timeout = this.timeout;
      }

      // Allow existing headers to be overridden
      // Allow new headers to be added
      if (endpoint.headers) {
        Object.keys(endpoint.headers).forEach(function (key) {
          options.headers[key] = endpoint.headers[key];
        });
      }

      if (this.credentials.signatureSecret && this.credentials.signatureMethod) {
        var splitPath = options.path.split(/\?(.+)/);
        var path = splitPath[0];

        var params = querystring.decode(splitPath[1]);

        // add timestamp if not already present
        if (!params.timestamp) {
          params.timestamp = new Date().getTime() / 1000 | 0; // floor to seconds
          params.timestamp = params.timestamp.toString();
        }

        // strip API Secret
        delete params.api_secret;

        var hash = this.credentials.generateSignature(params);

        var query = "";

        // rebuild query
        Object.keys(params).sort().forEach(function (key) {
          query += "&" + key + "=" + params[key];
        });

        // replace the first & with ?
        query = query.replace(/&/i, "?");

        options.path = "" + path + query + "&sig=" + hash;
      }

      this.logger.info("Request:", options, "\nBody:", endpoint.body);
      var request;

      if (options.port === 443) {
        request = this.https.request(options);
      } else {
        request = this.http.request(options);
      }

      request.end(endpoint.body);

      // Keep an array of String or Buffers,
      // depending on content type (binary or JSON) of response
      var responseData = [];

      request.on("response", function (response) {
        var isBinary = response.headers["content-type"] === "application/octet-stream";
        if (!isBinary) {
          response.setEncoding("utf8");
        }

        response.on("data", function (chunk) {
          responseData.push(chunk);
        });

        response.on("end", function () {
          _this.logger.info("response ended:", response.statusCode);
          if (callback) {
            if (isBinary) {
              responseData = Buffer.concat(responseData);
            }

            _this.__parseResponse(response, responseData, endpoint.method, callback, skipJsonParsing, customResponseParser);
          }
        });
        response.on("close", function (e) {
          if (e) {
            _this.logger.error("problem with API request detailed stacktrace below ");
            _this.logger.error(e);
            callback(e);
          }
        });
      });
      request.on("error", function (e) {
        _this.logger.error("problem with API request detailed stacktrace below ");
        _this.logger.error(e);
        callback(e);
      });
    }
  }, {
    key: "__parseResponse",
    value: function __parseResponse(httpResponse, data, method, callback, skipJsonParsing, customResponseParser) {
      var isArrayOrBuffer = data instanceof Array || data instanceof Buffer;
      if (!isArrayOrBuffer) {
        throw new Error("data should be of type Array or Buffer");
      }

      var status = httpResponse.statusCode;
      var headers = httpResponse.headers;

      var response = null;
      var error = null;

      try {
        if (status >= 500) {
          error = {
            message: "Server Error",
            statusCode: status
          };
        } else if (httpResponse.headers["content-type"] === "application/octet-stream") {
          response = data;
        } else if (status === 429) {
          // 429 does not return a parsable body
          if (!headers["retry-after"]) {
            // retry based on allowed per second
            var retryAfterMillis = method === "POST" ? 1000 / 2 : 1000 / 5;
            headers["retry-after"] = retryAfterMillis;
          }
          error = {
            body: data.join("")
          };
        } else if (status === 204) {
          response = null;
        } else if (status >= 400 || status < 200) {
          error = {
            body: JSON.parse(data.join("")),
            headers: headers
          };
        } else if (method !== "DELETE") {
          if (!!skipJsonParsing) {
            response = data.join("");
          } else {
            response = JSON.parse(data.join(""));
          }
        } else {
          response = data;
        }
      } catch (parseError) {
        this.logger.error(parseError);
        this.logger.error("could not convert API response to JSON, above error is ignored and raw API response is returned to client");
        this.logger.error("Raw Error message from API ");
        this.logger.error("\"" + data + "\"");

        error = {
          status: status,
          message: "The API response could not be parsed.",
          body: data.join(""),
          parseError: parseError
        };
      }

      if (error) {
        error.statusCode = status;
        error.headers = headers;
      }

      if (typeof callback === "function") {
        if (typeof customResponseParser === "function") {
          // don't try to parse the response on errors
          if (response) {
            response = customResponseParser(response);
          }
        }
        callback(error, response);
      }
    }
  }, {
    key: "_addLimitedAccessMessageToErrors",
    value: function _addLimitedAccessMessageToErrors(callback, limitedAccessStatus) {
      return function (err, data) {
        if (err && err.status == limitedAccessStatus) {
          err._INFO_ = "This endpoint may need activating on your account. Please email support@nexmo.com for more information";
        }

        return callback(err, data);
      };
    }
  }, {
    key: "get",
    value: function get(path, params, callback) {
      var useJwt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var useBasicAuth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      if (!callback) {
        if (typeof params == "function") {
          callback = params;
          params = {};
        }
      }

      params = params || {};
      if (!useJwt && !useBasicAuth) {
        params["api_key"] = this.credentials.apiKey;
        params["api_secret"] = this.credentials.apiSecret;
      }

      path = path + "?" + querystring.stringify(params);

      var headers = {
        "Content-Type": "application/json"
      };
      if (useJwt) {
        headers["Authorization"] = "Bearer " + this.credentials.generateJwt();
      }
      if (useBasicAuth) {
        headers["Authorization"] = "Basic " + Buffer.from(this.credentials.apiKey + ":" + this.credentials.apiSecret).toString("base64");
      }

      this.request({
        path: path,
        headers: headers
      }, "GET", callback);
    }
  }, {
    key: "delete",
    value: function _delete(path, callback, useJwt, useBasicAuth) {
      var params = {};
      if (!useJwt && !useBasicAuth) {
        params["api_key"] = this.credentials.apiKey;
        params["api_secret"] = this.credentials.apiSecret;
      }

      var headers = {};

      if (useBasicAuth) {
        headers["Authorization"] = "Basic " + Buffer.from(this.credentials.apiKey + ":" + this.credentials.apiSecret).toString("base64");
      }
      path = path + "?" + querystring.stringify(params);

      this.request({
        path: path,
        headers: headers
      }, "DELETE", callback);
    }
  }, {
    key: "postFile",
    value: function postFile(path, options, callback, useJwt) {
      var qs = {};
      if (!useJwt) {
        qs["api_key"] = this.credentials.apiKey;
        qs["api_secret"] = this.credentials.apiSecret;
      }

      if (Object.keys(qs).length) {
        var joinChar = "?";
        if (path.indexOf(joinChar) !== -1) {
          joinChar = "&";
        }
        path = path + joinChar + querystring.stringify(qs);
      }

      var file = options.file;
      delete options.file; // We don't send this as metadata

      var formData = {};

      if (file) {
        formData["filedata"] = {
          value: file,
          options: {
            filename: options.filename || null
          }
        };
      }

      if (options.info) {
        formData.info = JSON.stringify(options.info);
      }

      if (options.url) {
        formData.url = options.url;
      }

      this.requestLib.post({
        url: "https://" + this.host + path,
        formData: formData,
        headers: {
          Authorization: "Bearer " + this.credentials.generateJwt()
        }
      }, callback);
    }
  }, {
    key: "post",
    value: function post(path, params, callback, useJwt) {
      var qs = {};
      if (!useJwt) {
        qs["api_key"] = this.credentials.apiKey;
        qs["api_secret"] = this.credentials.apiSecret;
      }

      var joinChar = "?";
      if (path.indexOf(joinChar) !== -1) {
        joinChar = "&";
      }

      path = path + joinChar + querystring.stringify(qs);

      this.request({
        path: path,
        body: querystring.stringify(params)
      }, "POST", callback);
    }
  }, {
    key: "postJson",
    value: function postJson(path, params, callback, useJwt, useBasicAuth) {
      var qs = {};
      if (!useJwt && !useBasicAuth) {
        qs["api_key"] = this.credentials.apiKey;
        qs["api_secret"] = this.credentials.apiSecret;
      }

      var joinChar = "?";
      if (path.indexOf(joinChar) !== -1) {
        joinChar = "&";
      }

      path = path + joinChar + querystring.stringify(qs);

      var headers = {
        "Content-Type": "application/json"
      };
      if (useBasicAuth) {
        headers["Authorization"] = "Basic " + Buffer.from(this.credentials.apiKey + ":" + this.credentials.apiSecret).toString("base64");
      }

      this.request({
        path: path,
        body: JSON.stringify(params),
        headers: headers
      }, "POST", callback);
    }
  }, {
    key: "postUseQueryString",
    value: function postUseQueryString(path, params, callback, useJwt) {
      params = params || {};
      if (!useJwt) {
        params["api_key"] = this.credentials.apiKey;
        params["api_secret"] = this.credentials.apiSecret;
      }

      path = path + "?" + querystring.stringify(params);

      this.request({
        path: path
      }, "POST", callback);
    }
  }]);

  return HttpClient;
}();

exports.default = HttpClient;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9IdHRwQ2xpZW50LmpzIl0sIm5hbWVzIjpbImh0dHBzIiwicmVxdWlyZSIsImh0dHAiLCJyZXF1ZXN0IiwicXVlcnlzdHJpbmciLCJIdHRwQ2xpZW50Iiwib3B0aW9ucyIsImNyZWRlbnRpYWxzIiwiaG9zdCIsInBvcnQiLCJoZWFkZXJzIiwiQWNjZXB0IiwibG9nZ2VyIiwidGltZW91dCIsInJlcXVlc3RMaWIiLCJ1c2VyQWdlbnQiLCJlbmRwb2ludCIsIm1ldGhvZCIsImNhbGxiYWNrIiwic2tpcEpzb25QYXJzaW5nIiwiY3VzdG9tUmVzcG9uc2VQYXJzZXIiLCJwYXRoIiwiT2JqZWN0IiwiYXNzaWduIiwidW5kZWZpbmVkIiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJzaWduYXR1cmVTZWNyZXQiLCJzaWduYXR1cmVNZXRob2QiLCJzcGxpdFBhdGgiLCJzcGxpdCIsInBhcmFtcyIsImRlY29kZSIsInRpbWVzdGFtcCIsIkRhdGUiLCJnZXRUaW1lIiwidG9TdHJpbmciLCJhcGlfc2VjcmV0IiwiaGFzaCIsImdlbmVyYXRlU2lnbmF0dXJlIiwicXVlcnkiLCJzb3J0IiwicmVwbGFjZSIsImluZm8iLCJib2R5IiwiZW5kIiwicmVzcG9uc2VEYXRhIiwib24iLCJpc0JpbmFyeSIsInJlc3BvbnNlIiwic2V0RW5jb2RpbmciLCJwdXNoIiwiY2h1bmsiLCJzdGF0dXNDb2RlIiwiQnVmZmVyIiwiY29uY2F0IiwiX19wYXJzZVJlc3BvbnNlIiwiZSIsImVycm9yIiwiaHR0cFJlc3BvbnNlIiwiZGF0YSIsImlzQXJyYXlPckJ1ZmZlciIsIkFycmF5IiwiRXJyb3IiLCJzdGF0dXMiLCJtZXNzYWdlIiwicmV0cnlBZnRlck1pbGxpcyIsImpvaW4iLCJKU09OIiwicGFyc2UiLCJwYXJzZUVycm9yIiwibGltaXRlZEFjY2Vzc1N0YXR1cyIsImVyciIsIl9JTkZPXyIsInVzZUp3dCIsInVzZUJhc2ljQXV0aCIsImFwaUtleSIsImFwaVNlY3JldCIsInN0cmluZ2lmeSIsImdlbmVyYXRlSnd0IiwiZnJvbSIsInFzIiwibGVuZ3RoIiwiam9pbkNoYXIiLCJpbmRleE9mIiwiZmlsZSIsImZvcm1EYXRhIiwidmFsdWUiLCJmaWxlbmFtZSIsInVybCIsInBvc3QiLCJBdXRob3JpemF0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSUEsUUFBUUMsUUFBUSxPQUFSLENBQVo7QUFDQSxJQUFJQyxPQUFPRCxRQUFRLE1BQVIsQ0FBWDtBQUNBLElBQUlFLFVBQVVGLFFBQVEsU0FBUixDQUFkO0FBQ0EsSUFBSUcsY0FBY0gsUUFBUSxhQUFSLENBQWxCOztJQUVNSSxVO0FBQ0osc0JBQVlDLE9BQVosRUFBcUJDLFdBQXJCLEVBQWtDO0FBQUE7O0FBQ2hDLFNBQUtBLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0EsU0FBS0MsSUFBTCxHQUFZRixRQUFRRSxJQUFSLElBQWdCLGdCQUE1QjtBQUNBLFNBQUtDLElBQUwsR0FBWUgsUUFBUUcsSUFBUixJQUFnQixHQUE1QjtBQUNBLFNBQUtULEtBQUwsR0FBYU0sUUFBUU4sS0FBUixJQUFpQkEsS0FBOUI7QUFDQSxTQUFLRSxJQUFMLEdBQVlJLFFBQVFKLElBQVIsSUFBZ0JBLElBQTVCO0FBQ0EsU0FBS1EsT0FBTCxHQUFlO0FBQ2Isc0JBQWdCLG1DQURIO0FBRWJDLGNBQVE7QUFGSyxLQUFmO0FBSUEsU0FBS0MsTUFBTCxHQUFjTixRQUFRTSxNQUF0QjtBQUNBLFNBQUtDLE9BQUwsR0FBZVAsUUFBUU8sT0FBdkI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCWCxPQUFsQjs7QUFFQSxRQUFJRyxRQUFRUyxTQUFaLEVBQXVCO0FBQ3JCLFdBQUtMLE9BQUwsQ0FBYSxZQUFiLElBQTZCSixRQUFRUyxTQUFyQztBQUNEO0FBQ0Y7Ozs7NEJBR0NDLFEsRUFDQUMsTSxFQUNBQyxRLEVBR0E7QUFBQTs7QUFBQSxVQUZBQyxlQUVBLHVFQUZrQixLQUVsQjtBQUFBLFVBREFDLG9CQUNBOztBQUNBLFVBQUksT0FBT0gsTUFBUCxLQUFrQixV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QUEwQixHQUExQixHQUFnQyxLQUFLdEUsV0FBTCxDQUFpQnVFLFNBRGYsRUFFbEN6QyxRQUZrQyxDQUV6QixRQUZ5QixDQUFwQztBQUdEOztBQUVELFdBQUtsQyxPQUFMLENBQ0U7QUFDRWtCLGNBQU1BLElBRFI7QUFFRXdCLGNBQU13QixLQUFLVSxTQUFMLENBQWUvQyxNQUFmLENBRlI7QUFHRXRCO0FBSEYsT0FERixFQU1FLE1BTkYsRUFPRVEsUUFQRjtBQVNEOzs7dUNBRWtCRyxJLEVBQU1XLE0sRUFBUWQsUSxFQUFVeUQsTSxFQUFRO0FBQ2pEM0MsZUFBU0EsVUFBVSxFQUFuQjtBQUNBLFVBQUksQ0FBQzJDLE1BQUwsRUFBYTtBQUNYM0MsZUFBTyxTQUFQLElBQW9CLEtBQUt6QixXQUFMLENBQWlCc0UsTUFBckM7QUFDQTdDLGVBQU8sWUFBUCxJQUF1QixLQUFLekIsV0FBTCxDQUFpQnVFLFNBQXhDO0FBQ0Q7O0FBRUR6RCxhQUFPQSxPQUFPLEdBQVAsR0FBYWpCLFlBQVkyRSxTQUFaLENBQXNCL0MsTUFBdEIsQ0FBcEI7O0FBRUEsV0FBSzdCLE9BQUwsQ0FDRTtBQUNFa0IsY0FBTUE7QUFEUixPQURGLEVBSUUsTUFKRixFQUtFSCxRQUxGO0FBT0Q7Ozs7OztrQkFHWWIsVSIsImZpbGUiOiJIdHRwQ2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGh0dHBzID0gcmVxdWlyZShcImh0dHBzXCIpO1xudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcbnZhciByZXF1ZXN0ID0gcmVxdWlyZShcInJlcXVlc3RcIik7XG52YXIgcXVlcnlzdHJpbmcgPSByZXF1aXJlKFwicXVlcnlzdHJpbmdcIik7XG5cbmNsYXNzIEh0dHBDbGllbnQge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zLCBjcmVkZW50aWFscykge1xuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBjcmVkZW50aWFscztcbiAgICB0aGlzLmhvc3QgPSBvcHRpb25zLmhvc3QgfHwgXCJyZXN0Lm5leG1vLmNvbVwiO1xuICAgIHRoaXMucG9ydCA9IG9wdGlvbnMucG9ydCB8fCA0NDM7XG4gICAgdGhpcy5odHRwcyA9IG9wdGlvbnMuaHR0cHMgfHwgaHR0cHM7XG4gICAgdGhpcy5odHRwID0gb3B0aW9ucy5odHRwIHx8IGh0dHA7XG4gICAgdGhpcy5oZWFkZXJzID0ge1xuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbiAgICAgIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICB9O1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXI7XG4gICAgdGhpcy50aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0O1xuICAgIHRoaXMucmVxdWVzdExpYiA9IHJlcXVlc3Q7XG5cbiAgICBpZiAob3B0aW9ucy51c2VyQWdlbnQpIHtcbiAgICAgIHRoaXMuaGVhZGVyc1tcIlVzZXItQWdlbnRcIl0gPSBvcHRpb25zLnVzZXJBZ2VudDtcbiAgICB9XG4gIH1cblxuICByZXF1ZXN0KFxuICAgIGVuZHBvaW50LFxuICAgIG1ldGhvZCxcbiAgICBjYWxsYmFjayxcbiAgICBza2lwSnNvblBhcnNpbmcgPSBmYWxzZSxcbiAgICBjdXN0b21SZXNwb25zZVBhcnNlclxuICApIHtcbiAgICBpZiAodHlwZW9mIG1ldGhvZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBjYWxsYmFjayA9IG1ldGhvZDtcbiAgICAgIGVuZHBvaW50Lm1ldGhvZCA9IGVuZHBvaW50Lm1ldGhvZCB8fCBcIkdFVFwiO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1ldGhvZCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgZW5kcG9pbnQubWV0aG9kID0gbWV0aG9kO1xuICAgIH1cblxuICAgIGlmIChlbmRwb2ludC5tZXRob2QgPT09IFwiUE9TVFwiIHx8IGVuZHBvaW50Lm1ldGhvZCA9PT0gXCJERUxFVEVcIikge1xuICAgICAgLy8gVE9ETzogdmVyaWZ5IHRoZSBmb2xsb3dpbmcgZml4IGlzIHJlcXVpcmVkXG4gICAgICAvLyBGaXggYnJva2VuIGR1ZSBvdCA0MTEgQ29udGVudC1MZW5ndGggZXJyb3Igbm93IHNlbnQgYnkgTmV4bW8gQVBJXG4gICAgICAvLyBQTCAyMDE2LVNlcHQtNiAtIGNvbW1lbnRlZCBvdXQgQ29udGVudC1MZW5ndGggMFxuICAgICAgLy8gaGVhZGVyc1snQ29udGVudC1MZW5ndGgnXSA9IDA7XG4gICAgfVxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgaG9zdDogZW5kcG9pbnQuaG9zdCA/IGVuZHBvaW50Lmhvc3QgOiB0aGlzLmhvc3QsXG4gICAgICBwb3J0OiB0aGlzLnBvcnQsXG4gICAgICBwYXRoOiBlbmRwb2ludC5wYXRoLFxuICAgICAgbWV0aG9kOiBlbmRwb2ludC5tZXRob2QsXG4gICAgICBoZWFkZXJzOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmhlYWRlcnMpXG4gICAgfTtcblxuICAgIGlmICh0aGlzLnRpbWVvdXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgb3B0aW9ucy50aW1lb3V0ID0gdGhpcy50aW1lb3V0O1xuICAgIH1cblxuICAgIC8vIEFsbG93IGV4aXN0aW5nIGhlYWRlcnMgdG8gYmUgb3ZlcnJpZGRlblxuICAgIC8vIEFsbG93IG5ldyBoZWFkZXJzIHRvIGJlIGFkZGVkXG4gICAgaWYgKGVuZHBvaW50LmhlYWRlcnMpIHtcbiAgICAgIE9iamVjdC5rZXlzKGVuZHBvaW50LmhlYWRlcnMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIG9wdGlvbnMuaGVhZGVyc1trZXldID0gZW5kcG9pbnQuaGVhZGVyc1trZXldO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY3JlZGVudGlhbHMuc2lnbmF0dXJlU2VjcmV0ICYmIHRoaXMuY3JlZGVudGlhbHMuc2lnbmF0dXJlTWV0aG9kKSB7XG4gICAgICBjb25zdCBzcGxpdFBhdGggPSBvcHRpb25zLnBhdGguc3BsaXQoL1xcPyguKykvKTtcbiAgICAgIGNvbnN0IHBhdGggPSBzcGxpdFBhdGhbMF07XG5cbiAgICAgIHZhciBwYXJhbXMgPSBxdWVyeXN0cmluZy5kZWNvZGUoc3BsaXRQYXRoWzFdKTtcblxuICAgICAgLy8gYWRkIHRpbWVzdGFtcCBpZiBub3QgYWxyZWFkeSBwcmVzZW50XG4gICAgICBpZiAoIXBhcmFtcy50aW1lc3RhbXApIHtcbiAgICAgICAgcGFyYW1zLnRpbWVzdGFtcCA9IChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApIHwgMDsgLy8gZmxvb3IgdG8gc2Vjb25kc1xuICAgICAgICBwYXJhbXMudGltZXN0YW1wID0gcGFyYW1zLnRpbWVzdGFtcC50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICAvLyBzdHJpcCBBUEkgU2VjcmV0XG4gICAgICBkZWxldGUgcGFyYW1zLmFwaV9zZWNyZXQ7XG5cbiAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLmNyZWRlbnRpYWxzLmdlbmVyYXRlU2lnbmF0dXJlKHBhcmFtcyk7XG5cbiAgICAgIHZhciBxdWVyeSA9IFwiXCI7XG5cbiAgICAgIC8vIHJlYnVpbGQgcXVlcnlcbiAgICAgIE9iamVjdC5rZXlzKHBhcmFtcylcbiAgICAgICAgLnNvcnQoKVxuICAgICAgICAuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIHF1ZXJ5ICs9IFwiJlwiICsga2V5ICsgXCI9XCIgKyBwYXJhbXNba2V5XTtcbiAgICAgICAgfSk7XG5cbiAgICAgIC8vIHJlcGxhY2UgdGhlIGZpcnN0ICYgd2l0aCA/XG4gICAgICBxdWVyeSA9IHF1ZXJ5LnJlcGxhY2UoLyYvaSwgXCI/XCIpO1xuXG4gICAgICBvcHRpb25zLnBhdGggPSBgJHtwYXRofSR7cXVlcnl9JnNpZz0ke2hhc2h9YDtcbiAgICB9XG5cbiAgICB0aGlzLmxvZ2dlci5pbmZvKFwiUmVxdWVzdDpcIiwgb3B0aW9ucywgXCJcXG5Cb2R5OlwiLCBlbmRwb2ludC5ib2R5KTtcbiAgICB2YXIgcmVxdWVzdDtcblxuICAgIGlmIChvcHRpb25zLnBvcnQgPT09IDQ0Mykge1xuICAgICAgcmVxdWVzdCA9IHRoaXMuaHR0cHMucmVxdWVzdChvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxdWVzdCA9IHRoaXMuaHR0cC5yZXF1ZXN0KG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJlcXVlc3QuZW5kKGVuZHBvaW50LmJvZHkpO1xuXG4gICAgLy8gS2VlcCBhbiBhcnJheSBvZiBTdHJpbmcgb3IgQnVmZmVycyxcbiAgICAvLyBkZXBlbmRpbmcgb24gY29udGVudCB0eXBlIChiaW5hcnkgb3IgSlNPTikgb2YgcmVzcG9uc2VcbiAgICB2YXIgcmVzcG9uc2VEYXRhID0gW107XG5cbiAgICByZXF1ZXN0Lm9uKFwicmVzcG9uc2VcIiwgcmVzcG9uc2UgPT4ge1xuICAgICAgdmFyIGlzQmluYXJ5ID1cbiAgICAgICAgcmVzcG9uc2UuaGVhZGVyc1tcImNvbnRlbnQtdHlwZVwiXSA9PT0gXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIjtcbiAgICAgIGlmICghaXNCaW5hcnkpIHtcbiAgICAgICAgcmVzcG9uc2Uuc2V0RW5jb2RpbmcoXCJ1dGY4XCIpO1xuICAgICAgfVxuXG4gICAgICByZXNwb25zZS5vbihcImRhdGFcIiwgY2h1bmsgPT4ge1xuICAgICAgICByZXNwb25zZURhdGEucHVzaChjaHVuayk7XG4gICAgICB9KTtcblxuICAgICAgcmVzcG9uc2Uub24oXCJlbmRcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKFwicmVzcG9uc2UgZW5kZWQ6XCIsIHJlc3BvbnNlLnN0YXR1c0NvZGUpO1xuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICBpZiAoaXNCaW5hcnkpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlRGF0YSA9IEJ1ZmZlci5jb25jYXQocmVzcG9uc2VEYXRhKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9fcGFyc2VSZXNwb25zZShcbiAgICAgICAgICAgIHJlc3BvbnNlLFxuICAgICAgICAgICAgcmVzcG9uc2VEYXRhLFxuICAgICAgICAgICAgZW5kcG9pbnQubWV0aG9kLFxuICAgICAgICAgICAgY2FsbGJhY2ssXG4gICAgICAgICAgICBza2lwSnNvblBhcnNpbmcsXG4gICAgICAgICAgICBjdXN0b21SZXNwb25zZVBhcnNlclxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmVzcG9uc2Uub24oXCJjbG9zZVwiLCBlID0+IHtcbiAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihcbiAgICAgICAgICAgIFwicHJvYmxlbSB3aXRoIEFQSSByZXF1ZXN0IGRldGFpbGVkIHN0YWNrdHJhY2UgYmVsb3cgXCJcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGUpO1xuICAgICAgICAgIGNhbGxiYWNrKGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXF1ZXN0Lm9uKFwiZXJyb3JcIiwgZSA9PiB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcihcInByb2JsZW0gd2l0aCBBUEkgcmVxdWVzdCBkZXRhaWxlZCBzdGFja3RyYWNlIGJlbG93IFwiKTtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGUpO1xuICAgICAgY2FsbGJhY2soZSk7XG4gICAgfSk7XG4gIH1cblxuICBfX3BhcnNlUmVzcG9uc2UoXG4gICAgaHR0cFJlc3BvbnNlLFxuICAgIGRhdGEsXG4gICAgbWV0aG9kLFxuICAgIGNhbGxiYWNrLFxuICAgIHNraXBKc29uUGFyc2luZyxcbiAgICBjdXN0b21SZXNwb25zZVBhcnNlclxuICApIHtcbiAgICBjb25zdCBpc0FycmF5T3JCdWZmZXIgPSBkYXRhIGluc3RhbmNlb2YgQXJyYXkgfHwgZGF0YSBpbnN0YW5jZW9mIEJ1ZmZlcjtcbiAgICBpZiAoIWlzQXJyYXlPckJ1ZmZlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGF0YSBzaG91bGQgYmUgb2YgdHlwZSBBcnJheSBvciBCdWZmZXJcIik7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdHVzID0gaHR0cFJlc3BvbnNlLnN0YXR1c0NvZGU7XG4gICAgY29uc3QgaGVhZGVycyA9IGh0dHBSZXNwb25zZS5oZWFkZXJzO1xuXG4gICAgbGV0IHJlc3BvbnNlID0gbnVsbDtcbiAgICB2YXIgZXJyb3IgPSBudWxsO1xuXG4gICAgdHJ5IHtcbiAgICAgIGlmIChzdGF0dXMgPj0gNTAwKSB7XG4gICAgICAgIGVycm9yID0ge1xuICAgICAgICAgIG1lc3NhZ2U6IFwiU2VydmVyIEVycm9yXCIsXG4gICAgICAgICAgc3RhdHVzQ29kZTogc3RhdHVzXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBodHRwUmVzcG9uc2UuaGVhZGVyc1tcImNvbnRlbnQtdHlwZVwiXSA9PT0gXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIlxuICAgICAgKSB7XG4gICAgICAgIHJlc3BvbnNlID0gZGF0YTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSA0MjkpIHtcbiAgICAgICAgLy8gNDI5IGRvZXMgbm90IHJldHVybiBhIHBhcnNhYmxlIGJvZHlcbiAgICAgICAgaWYgKCFoZWFkZXJzW1wicmV0cnktYWZ0ZXJcIl0pIHtcbiAgICAgICAgICAvLyByZXRyeSBiYXNlZCBvbiBhbGxvd2VkIHBlciBzZWNvbmRcbiAgICAgICAgICBjb25zdCByZXRyeUFmdGVyTWlsbGlzID0gbWV0aG9kID09PSBcIlBPU1RcIiA/IDEwMDAgLyAyIDogMTAwMCAvIDU7XG4gICAgICAgICAgaGVhZGVyc1tcInJldHJ5LWFmdGVyXCJdID0gcmV0cnlBZnRlck1pbGxpcztcbiAgICAgICAgfVxuICAgICAgICBlcnJvciA9IHtcbiAgICAgICAgICBib2R5OiBkYXRhLmpvaW4oXCJcIilcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAyMDQpIHtcbiAgICAgICAgcmVzcG9uc2UgPSBudWxsO1xuICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPj0gNDAwIHx8IHN0YXR1cyA8IDIwMCkge1xuICAgICAgICBlcnJvciA9IHtcbiAgICAgICAgICBib2R5OiBKU09OLnBhcnNlKGRhdGEuam9pbihcIlwiKSksXG4gICAgICAgICAgaGVhZGVyc1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChtZXRob2QgIT09IFwiREVMRVRFXCIpIHtcbiAgICAgICAgaWYgKCEhc2tpcEpzb25QYXJzaW5nKSB7XG4gICAgICAgICAgcmVzcG9uc2UgPSBkYXRhLmpvaW4oXCJcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzcG9uc2UgPSBKU09OLnBhcnNlKGRhdGEuam9pbihcIlwiKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3BvbnNlID0gZGF0YTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChwYXJzZUVycm9yKSB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcihwYXJzZUVycm9yKTtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFxuICAgICAgICBcImNvdWxkIG5vdCBjb252ZXJ0IEFQSSByZXNwb25zZSB0byBKU09OLCBhYm92ZSBlcnJvciBpcyBpZ25vcmVkIGFuZCByYXcgQVBJIHJlc3BvbnNlIGlzIHJldHVybmVkIHRvIGNsaWVudFwiXG4gICAgICApO1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXCJSYXcgRXJyb3IgbWVzc2FnZSBmcm9tIEFQSSBcIik7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcihgXCIke2RhdGF9XCJgKTtcblxuICAgICAgZXJyb3IgPSB7XG4gICAgICAgIHN0YXR1czogc3RhdHVzLFxuICAgICAgICBtZXNzYWdlOiBcIlRoZSBBUEkgcmVzcG9uc2UgY291bGQgbm90IGJlIHBhcnNlZC5cIixcbiAgICAgICAgYm9keTogZGF0YS5qb2luKFwiXCIpLFxuICAgICAgICBwYXJzZUVycm9yOiBwYXJzZUVycm9yXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChlcnJvcikge1xuICAgICAgZXJyb3Iuc3RhdHVzQ29kZSA9IHN0YXR1cztcbiAgICAgIGVycm9yLmhlYWRlcnMgPSBoZWFkZXJzO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgaWYgKHR5cGVvZiBjdXN0b21SZXNwb25zZVBhcnNlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIC8vIGRvbid0IHRyeSB0byBwYXJzZSB0aGUgcmVzcG9uc2Ugb24gZXJyb3JzXG4gICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgIHJlc3BvbnNlID0gY3VzdG9tUmVzcG9uc2VQYXJzZXIocmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjYWxsYmFjayhlcnJvciwgcmVzcG9uc2UpO1xuICAgIH1cbiAgfVxuXG4gIF9hZGRMaW1pdGVkQWNjZXNzTWVzc2FnZVRvRXJyb3JzKGNhbGxiYWNrLCBsaW1pdGVkQWNjZXNzU3RhdHVzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVyciwgZGF0YSkge1xuICAgICAgaWYgKGVyciAmJiBlcnIuc3RhdHVzID09IGxpbWl0ZWRBY2Nlc3NTdGF0dXMpIHtcbiAgICAgICAgZXJyLl9JTkZPXyA9XG4gICAgICAgICAgXCJUaGlzIGVuZHBvaW50IG1heSBuZWVkIGFjdGl2YXRpbmcgb24geW91ciBhY2NvdW50LiBQbGVhc2UgZW1haWwgc3VwcG9ydEBuZXhtby5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb25cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgZGF0YSk7XG4gICAgfTtcbiAgfVxuXG4gIGdldChwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCB1c2VKd3QgPSBmYWxzZSwgdXNlQmFzaWNBdXRoID0gZmFsc2UpIHtcbiAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICBpZiAodHlwZW9mIHBhcmFtcyA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBwYXJhbXM7XG4gICAgICAgIHBhcmFtcyA9IHt9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcbiAgICBpZiAoIXVzZUp3dCAmJiAhdXNlQmFzaWNBdXRoKSB7XG4gICAgICBwYXJhbXNbXCJhcGlfa2V5XCJdID0gdGhpcy5jcmVkZW50aWFscy5hcGlLZXk7XG4gICAgICBwYXJhbXNbXCJhcGlfc2VjcmV0XCJdID0gdGhpcy5jcmVkZW50aWFscy5hcGlTZWNyZXQ7XG4gICAgfVxuXG4gICAgcGF0aCA9IHBhdGggKyBcIj9cIiArIHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeShwYXJhbXMpO1xuXG4gICAgY29uc3QgaGVhZGVycyA9IHtcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgfTtcbiAgICBpZiAodXNlSnd0KSB7XG4gICAgICBoZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXSA9IGBCZWFyZXIgJHt0aGlzLmNyZWRlbnRpYWxzLmdlbmVyYXRlSnd0KCl9YDtcbiAgICB9XG4gICAgaWYgKHVzZUJhc2ljQXV0aCkge1xuICAgICAgaGVhZGVyc1tcIkF1dGhvcml6YXRpb25cIl0gPSBgQmFzaWMgJHtCdWZmZXIuZnJvbShcbiAgICAgICAgdGhpcy5jcmVkZW50aWFscy5hcGlLZXkgKyBcIjpcIiArIHRoaXMuY3JlZGVudGlhbHMuYXBpU2VjcmV0XG4gICAgICApLnRvU3RyaW5nKFwiYmFzZTY0XCIpfWA7XG4gICAgfVxuXG4gICAgdGhpcy5yZXF1ZXN0KFxuICAgICAge1xuICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICBoZWFkZXJzXG4gICAgICB9LFxuICAgICAgXCJHRVRcIixcbiAgICAgIGNhbGxiYWNrXG4gICAgKTtcbiAgfVxuXG4gIGRlbGV0ZShwYXRoLCBjYWxsYmFjaywgdXNlSnd0LCB1c2VCYXNpY0F1dGgpIHtcbiAgICBsZXQgcGFyYW1zID0ge307XG4gICAgaWYgKCF1c2VKd3QgJiYgIXVzZUJhc2ljQXV0aCkge1xuICAgICAgcGFyYW1zW1wiYXBpX2tleVwiXSA9IHRoaXMuY3JlZGVudGlhbHMuYXBpS2V5O1xuICAgICAgcGFyYW1zW1wiYXBpX3NlY3JldFwiXSA9IHRoaXMuY3JlZGVudGlhbHMuYXBpU2VjcmV0O1xuICAgIH1cblxuICAgIGxldCBoZWFkZXJzID0ge307XG5cbiAgICBpZiAodXNlQmFzaWNBdXRoKSB7XG4gICAgICBoZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXSA9IGBCYXNpYyAke0J1ZmZlci5mcm9tKFxuICAgICAgICB0aGlzLmNyZWRlbnRpYWxzLmFwaUtleSArIFwiOlwiICsgdGhpcy5jcmVkZW50aWFscy5hcGlTZWNyZXRcbiAgICAgICkudG9TdHJpbmcoXCJiYXNlNjRcIil9YDtcbiAgICB9XG4gICAgcGF0aCA9IHBhdGggKyBcIj9cIiArIHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeShwYXJhbXMpO1xuXG4gICAgdGhpcy5yZXF1ZXN0KFxuICAgICAge1xuICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICBoZWFkZXJzXG4gICAgICB9LFxuICAgICAgXCJERUxFVEVcIixcbiAgICAgIGNhbGxiYWNrXG4gICAgKTtcbiAgfVxuXG4gIHBvc3RGaWxlKHBhdGgsIG9wdGlvbnMsIGNhbGxiYWNrLCB1c2VKd3QpIHtcbiAgICBsZXQgcXMgPSB7fTtcbiAgICBpZiAoIXVzZUp3dCkge1xuICAgICAgcXNbXCJhcGlfa2V5XCJdID0gdGhpcy5jcmVkZW50aWFscy5hcGlLZXk7XG4gICAgICBxc1tcImFwaV9zZWNyZXRcIl0gPSB0aGlzLmNyZWRlbnRpYWxzLmFwaVNlY3JldDtcbiAgICB9XG5cbiAgICBpZiAoT2JqZWN0LmtleXMocXMpLmxlbmd0aCkge1xuICAgICAgbGV0IGpvaW5DaGFyID0gXCI/XCI7XG4gICAgICBpZiAocGF0aC5pbmRleE9mKGpvaW5DaGFyKSAhPT0gLTEpIHtcbiAgICAgICAgam9pbkNoYXIgPSBcIiZcIjtcbiAgICAgIH1cbiAgICAgIHBhdGggPSBwYXRoICsgam9pbkNoYXIgKyBxdWVyeXN0cmluZy5zdHJpbmdpZnkocXMpO1xuICAgIH1cblxuICAgIGNvbnN0IGZpbGUgPSBvcHRpb25zLmZpbGU7XG4gICAgZGVsZXRlIG9wdGlvbnMuZmlsZTsgLy8gV2UgZG9uJ3Qgc2VuZCB0aGlzIGFzIG1ldGFkYXRhXG5cbiAgICBjb25zdCBmb3JtRGF0YSA9IHt9O1xuXG4gICAgaWYgKGZpbGUpIHtcbiAgICAgIGZvcm1EYXRhW1wiZmlsZWRhdGFcIl0gPSB7XG4gICAgICAgIHZhbHVlOiBmaWxlLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgZmlsZW5hbWU6IG9wdGlvbnMuZmlsZW5hbWUgfHwgbnVsbFxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmluZm8pIHtcbiAgICAgIGZvcm1EYXRhLmluZm8gPSBKU09OLnN0cmluZ2lmeShvcHRpb25zLmluZm8pO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnVybCkge1xuICAgICAgZm9ybURhdGEudXJsID0gb3B0aW9ucy51cmw7XG4gICAgfVxuXG4gICAgdGhpcy5yZXF1ZXN0TGliLnBvc3QoXG4gICAgICB7XG4gICAgICAgIHVybDogXCJodHRwczovL1wiICsgdGhpcy5ob3N0ICsgcGF0aCxcbiAgICAgICAgZm9ybURhdGE6IGZvcm1EYXRhLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3RoaXMuY3JlZGVudGlhbHMuZ2VuZXJhdGVKd3QoKX1gXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjYWxsYmFja1xuICAgICk7XG4gIH1cblxuICBwb3N0KHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIHVzZUp3dCkge1xuICAgIGxldCBxcyA9IHt9O1xuICAgIGlmICghdXNlSnd0KSB7XG4gICAgICBxc1tcImFwaV9rZXlcIl0gPSB0aGlzLmNyZWRlbnRpYWxzLmFwaUtleTtcbiAgICAgIHFzW1wiYXBpX3NlY3JldFwiXSA9IHRoaXMuY3JlZGVudGlhbHMuYXBpU2VjcmV0O1xuICAgIH1cblxuICAgIGxldCBqb2luQ2hhciA9IFwiP1wiO1xuICAgIGlmIChwYXRoLmluZGV4T2Yoam9pbkNoYXIpICE9PSAtMSkge1xuICAgICAgam9pbkNoYXIgPSBcIiZcIjtcbiAgICB9XG5cbiAgICBwYXRoID0gcGF0aCArIGpvaW5DaGFyICsgcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHFzKTtcblxuICAgIHRoaXMucmVxdWVzdChcbiAgICAgIHtcbiAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgYm9keTogcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHBhcmFtcylcbiAgICAgIH0sXG4gICAgICBcIlBPU1RcIixcbiAgICAgIGNhbGxiYWNrXG4gICAgKTtcbiAgfVxuXG4gIHBvc3RKc29uKHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIHVzZUp3dCwgdXNlQmFzaWNBdXRoKSB7XG4gICAgbGV0IHFzID0ge307XG4gICAgaWYgKCF1c2VKd3QgJiYgIXVzZUJhc2ljQXV0aCkge1xuICAgICAgcXNbXCJhcGlfa2V5XCJdID0gdGhpcy5jcmVkZW50aWFscy5hcGlLZXk7XG4gICAgICBxc1tcImFwaV9zZWNyZXRcIl0gPSB0aGlzLmNyZWRlbnRpYWxzLmFwaVNlY3JldDtcbiAgICB9XG5cbiAgICBsZXQgam9pbkNoYXIgPSBcIj9cIjtcbiAgICBpZiAocGF0aC5pbmRleE9mKGpvaW5DaGFyKSAhPT0gLTEpIHtcbiAgICAgIGpvaW5DaGFyID0gXCImXCI7XG4gICAgfVxuXG4gICAgcGF0aCA9IHBhdGggKyBqb2luQ2hhciArIHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeShxcyk7XG5cbiAgICBsZXQgaGVhZGVycyA9IHtcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgfTtcbiAgICBpZiAodXNlQmFzaWNBdXRoKSB7XG4gICAgICBoZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXSA9IGBCYXNpYyAke0J1ZmZlci5mcm9tKFxuICAgICAgICB0aGlzLmNyZWRlbnRpYWxzLmFwaUtleSArIFwiOlwiICsgdGhpcy5jcmVkZW50aWFscy5hcGlTZWNyZXRcbiAgICAgICkudG9TdHJpbmcoXCJiYXNlNjRcIil9YDtcbiAgICB9XG5cbiAgICB0aGlzLnJlcXVlc3QoXG4gICAgICB7XG4gICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBhcmFtcyksXG4gICAgICAgIGhlYWRlcnNcbiAgICAgIH0sXG4gICAgICBcIlBPU1RcIixcbiAgICAgIGNhbGxiYWNrXG4gICAgKTtcbiAgfVxuXG4gIHBvc3RVc2VRdWVyeVN0cmluZyhwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCB1c2VKd3QpIHtcbiAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XG4gICAgaWYgKCF1c2VKd3QpIHtcbiAgICAgIHBhcmFtc1tcImFwaV9rZXlcIl0gPSB0aGlzLmNyZWRlbnRpYWxzLmFwaUtleTtcbiAgICAgIHBhcmFtc1tcImFwaV9zZWNyZXRcIl0gPSB0aGlzLmNyZWRlbnRpYWxzLmFwaVNlY3JldDtcbiAgICB9XG5cbiAgICBwYXRoID0gcGF0aCArIFwiP1wiICsgcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHBhcmFtcyk7XG5cbiAgICB0aGlzLnJlcXVlc3QoXG4gICAgICB7XG4gICAgICAgIHBhdGg6IHBhdGhcbiAgICAgIH0sXG4gICAgICBcIlBPU1RcIixcbiAgICAgIGNhbGxiYWNrXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIdHRwQ2xpZW50O1xuIl19