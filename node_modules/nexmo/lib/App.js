"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _Utils = require("./Utils");

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  _createClass(App, null, [{
    key: "PATH",

    /**
     * Provides access to the `applications` version 2 endpoint.
     */
    get: function get() {
      return "/v2/applications";
    }
    /**
     * @param {Credentials} credentials
     *    credentials to be used when interacting with the API.
     * @param {Object} options
     *    Addition App options.
     */

  }]);

  function App(credentials) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, App);

    this.creds = credentials;
    this.options = options;

    // Used to facilitate testing of the call to the underlying object
    this._nexmo = this.options.nexmoOverride || _index2.default;
  }

  _createClass(App, [{
    key: "_convertMethodSignature",
    value: function _convertMethodSignature(name, type, answerUrl, eventUrl, options) {
      var capability = {};
      switch (type) {
        case "voice":
          capability = {
            voice: {
              webhooks: {
                answer_url: {
                  address: answerUrl,
                  http_method: "GET"
                },
                event_url: {
                  address: eventUrl,
                  http_method: "POST"
                }
              }
            }
          };
          break;
        case "messages":
          capability = {
            messages: {
              webhooks: {
                inbound_url: {
                  address: options.inbound_url,
                  http_method: "POST"
                },
                status_url: {
                  address: options.status_url,
                  http_method: "POST"
                }
              }
            }
          };
          break;
        case "rtc":
          capability = {
            rtc: {
              webhooks: {
                event_url: {
                  address: eventUrl,
                  http_method: "POST"
                }
              }
            }
          };
          break;
      }

      return {
        name: name,
        capabilities: capability
      };
    }
  }, {
    key: "_convertApplicationResponse",
    value: function _convertApplicationResponse(application) {
      for (var capability in application.capabilities) {
        application[capability] = {
          webhooks: []
        };
        for (var webhook in application.capabilities[capability].webhooks) {
          application[capability].webhooks.push({
            endpoint_type: webhook,
            endpoint: application.capabilities[capability].webhooks[webhook].address,
            http_method: application.capabilities[capability].webhooks[webhook].http_method
          });
        }
      }

      delete application.capabilities;
      return application;
    }
  }, {
    key: "_convertApplicationListResponse",
    value: function _convertApplicationListResponse(applicationResponseHandler) {
      return function (response) {
        response.count = response.total_items;
        response.page_index = response.page;
        for (var i in response._embedded.applications) {
          response._embedded.applications[i] = applicationResponseHandler(response._embedded.applications[i]);
        }

        return response;
      };
    }

    /**
     * TODO: document
     */

  }, {
    key: "create",
    value: function create(name, type, answerUrl, eventUrl, options, callback) {
      var params = {};
      var responseParser = null;

      if (arguments.length > 2) {
        params = JSON.stringify(this._convertMethodSignature(name, type, answerUrl, eventUrl, options));
        responseParser = this._convertApplicationResponse;
      } else {
        params = JSON.stringify(name);
        callback = type;
      }

      var authorization = this.creds.apiKey + ":" + this.creds.apiSecret;

      var config = {
        host: "api.nexmo.com",
        path: App.PATH,
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + Buffer.from(authorization).toString("base64")
        }
      };

      this.options.httpClient.request(config, callback, callback, false, responseParser);
    }

    /**
     * TODO: document
     */

  }, {
    key: "get",
    value: function get(params, callback) {
      var v2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var authorization = this.creds.apiKey + ":" + this.creds.apiSecret;
      var responseParser = null;

      if ((typeof params === "undefined" ? "undefined" : _typeof(params)) !== "object") {
        responseParser = this._convertApplicationResponse;
      } else {
        responseParser = this._convertApplicationListResponse(this._convertApplicationResponse);
      }

      if (v2) {
        responseParser = null;
      }

      var config = {
        host: "api.nexmo.com",
        path: _Utils2.default.createPathWithQuery(App.PATH, params),
        method: "GET",
        body: undefined,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + Buffer.from(authorization).toString("base64")
        }
      };

      this.options.httpClient.request(config, callback, callback, false, responseParser);
    }

    /**
     * TODO: document
     */

  }, {
    key: "update",
    value: function update(appId, name, type, answerUrl, eventUrl, options, callback) {
      var params = {};
      var responseParser = null;
      if (arguments.length > 3) {
        params = JSON.stringify(this._convertMethodSignature(name, type, answerUrl, eventUrl, options));
        responseParser = this._convertApplicationResponse;
      } else {
        params = JSON.stringify(name);
        callback = type;
      }

      var authorization = this.creds.apiKey + ":" + this.creds.apiSecret;

      var config = {
        host: "api.nexmo.com",
        path: App.PATH + "/" + appId,
        method: "PUT",
        body: params,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + Buffer.from(authorization).toString("base64")
        }
      };

      this.options.httpClient.request(config, callback, callback, false, responseParser);
    }

    /**
     * TODO: document
     */

  }, {
    key: "delete",
    value: function _delete(appId, callback) {
      var authorization = this.creds.apiKey + ":" + this.creds.apiSecret;

      var config = {
        host: "api.nexmo.com",
        path: App.PATH + "/" + appId,
        method: "DELETE",
        body: "{}",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + Buffer.from(authorization).toString("base64")
        }
      };

      this.options.httpClient.request(config, callback);
    }
  }]);

  return App;
}();

exports.default = App;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BcHAuanMiXSwibmFtZXMiOlsiQXBwIiwiY3JlZGVudGlhbHMiLCJvcHRpb25zIiwiY3JlZHMiLCJfbmV4bW8iLCJuZXhtb092ZXJyaWRlIiwibmFtZSIsInR5cGUiLCJhbnN3ZXJVcmwiLCJldmVudFVybCIsImNhcGFiaWxpdHkiLCJ2b2ljZSIsIndlYmhvb2tzIiwiYW5zd2VyX3VybCIsImFkZHJlc3MiLCJodHRwX21ldGhvZCIsImV2ZW50X3VybCIsIm1lc3NhZ2VzIiwiaW5ib3VuZF91cmwiLCJzdGF0dXNfdXJsIiwicnRjIiwiY2FwYWJpbGl0aWVzIiwiYXBwbGljYXRpb24iLCJ3ZWJob29rIiwicHVzaCIsImVuZHBvaW50X3R5cGUiLCJlbmRwb2ludCIsImFwcGxpY2F0aW9uUmVzcG9uc2VIYW5kbGVyIiwicmVzcG9uc2UiLCJjb3VudCIsInRvdGFsX2l0ZW1zIiwicGFnZV9pbmRleCIsInBhZ2UiLCJpIiwiX2VtYmVkZGVkIiwiYXBwbGljYXRpb25zIiwiY2FsbGJhY2siLCJwYXJhbXMiLCJyZXNwb25zZVBhcnNlciIsImFyZ3VtZW50cyIsImxlbmd0aCIsIkpTT04iLCJzdHJpbmdpZnkiLCJfY29udmVydE1ldGhvZFNpZ25hdHVyZSIsIl9jb252ZXJ0QXBwbGljYXRpb25SZXNwb25zZSIsImF1dGhvcml6YXRpb24iLCJhcGlLZXkiLCJhcGlTZWNyZXQiLCJjb25maWciLCJob3N0IiwicGF0aCIsIlBBVEgiLCJtZXRob2QiLCJib2R5IiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJCdWZmZXIiLCJmcm9tIiwidG9TdHJpbmciLCJodHRwQ2xpZW50IiwicmVxdWVzdCIsInYyIiwiX2NvbnZlcnRBcHBsaWNhdGlvbkxpc3RSZXNwb25zZSIsImNyZWF0ZVBhdGhXaXRoUXVlcnkiLCJ1bmRlZmluZWQiLCJhcHBJZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7OztJQUVNQSxHOzs7O0FBQ0o7Ozt3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QVNsRCxJQUFJbUQsSUFBYixTQUFxQmMsS0FGVjtBQUdYYixnQkFBUSxLQUhHO0FBSVhDLGNBQU1oQixNQUpLO0FBS1hpQixpQkFBUztBQUNQLDBCQUFnQixrQkFEVDtBQUVQQyxvQ0FBd0JDLE9BQU9DLElBQVAsQ0FBWVosYUFBWixFQUEyQmEsUUFBM0IsQ0FBb0MsUUFBcEM7QUFGakI7QUFMRSxPQUFiOztBQVdBLFdBQUt4RCxPQUFMLENBQWF5RCxVQUFiLENBQXdCQyxPQUF4QixDQUNFWixNQURGLEVBRUVaLFFBRkYsRUFHRUEsUUFIRixFQUlFLEtBSkYsRUFLRUUsY0FMRjtBQU9EOztBQUVEOzs7Ozs7NEJBR08yQixLLEVBQU83QixRLEVBQVU7QUFDdEIsVUFBTVMsZ0JBQW1CLEtBQUsxQyxLQUFMLENBQVcyQyxNQUE5QixTQUF3QyxLQUFLM0MsS0FBTCxDQUFXNEMsU0FBekQ7O0FBRUEsVUFBSUMsU0FBUztBQUNYQyxjQUFNLGVBREs7QUFFWEMsY0FBU2xELElBQUltRCxJQUFiLFNBQXFCYyxLQUZWO0FBR1hiLGdCQUFRLFFBSEc7QUFJWEMsY0FBTSxJQUpLO0FBS1hDLGlCQUFTO0FBQ1AsMEJBQWdCLGtCQURUO0FBRVBDLG9DQUF3QkMsT0FBT0MsSUFBUCxDQUFZWixhQUFaLEVBQTJCYSxRQUEzQixDQUFvQyxRQUFwQztBQUZqQjtBQUxFLE9BQWI7O0FBV0EsV0FBS3hELE9BQUwsQ0FBYXlELFVBQWIsQ0FBd0JDLE9BQXhCLENBQWdDWixNQUFoQyxFQUF3Q1osUUFBeEM7QUFDRDs7Ozs7O2tCQUdZcEMsRyIsImZpbGUiOiJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IG5leG1vIGZyb20gXCIuL2luZGV4XCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vVXRpbHNcIjtcblxuY2xhc3MgQXBwIHtcbiAgLyoqXG4gICAqIFByb3ZpZGVzIGFjY2VzcyB0byB0aGUgYGFwcGxpY2F0aW9uc2AgdmVyc2lvbiAyIGVuZHBvaW50LlxuICAgKi9cbiAgc3RhdGljIGdldCBQQVRIKCkge1xuICAgIHJldHVybiBcIi92Mi9hcHBsaWNhdGlvbnNcIjtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtDcmVkZW50aWFsc30gY3JlZGVudGlhbHNcbiAgICogICAgY3JlZGVudGlhbHMgdG8gYmUgdXNlZCB3aGVuIGludGVyYWN0aW5nIHdpdGggdGhlIEFQSS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogICAgQWRkaXRpb24gQXBwIG9wdGlvbnMuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjcmVkZW50aWFscywgb3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5jcmVkcyA9IGNyZWRlbnRpYWxzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICAvLyBVc2VkIHRvIGZhY2lsaXRhdGUgdGVzdGluZyBvZiB0aGUgY2FsbCB0byB0aGUgdW5kZXJseWluZyBvYmplY3RcbiAgICB0aGlzLl9uZXhtbyA9IHRoaXMub3B0aW9ucy5uZXhtb092ZXJyaWRlIHx8IG5leG1vO1xuICB9XG5cbiAgX2NvbnZlcnRNZXRob2RTaWduYXR1cmUobmFtZSwgdHlwZSwgYW5zd2VyVXJsLCBldmVudFVybCwgb3B0aW9ucykge1xuICAgIGxldCBjYXBhYmlsaXR5ID0ge307XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwidm9pY2VcIjpcbiAgICAgICAgY2FwYWJpbGl0eSA9IHtcbiAgICAgICAgICB2b2ljZToge1xuICAgICAgICAgICAgd2ViaG9va3M6IHtcbiAgICAgICAgICAgICAgYW5zd2VyX3VybDoge1xuICAgICAgICAgICAgICAgIGFkZHJlc3M6IGFuc3dlclVybCxcbiAgICAgICAgICAgICAgICBodHRwX21ldGhvZDogXCJHRVRcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBldmVudF91cmw6IHtcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBldmVudFVybCxcbiAgICAgICAgICAgICAgICBodHRwX21ldGhvZDogXCJQT1NUXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibWVzc2FnZXNcIjpcbiAgICAgICAgY2FwYWJpbGl0eSA9IHtcbiAgICAgICAgICBtZXNzYWdlczoge1xuICAgICAgICAgICAgd2ViaG9va3M6IHtcbiAgICAgICAgICAgICAgaW5ib3VuZF91cmw6IHtcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBvcHRpb25zLmluYm91bmRfdXJsLFxuICAgICAgICAgICAgICAgIGh0dHBfbWV0aG9kOiBcIlBPU1RcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzdGF0dXNfdXJsOiB7XG4gICAgICAgICAgICAgICAgYWRkcmVzczogb3B0aW9ucy5zdGF0dXNfdXJsLFxuICAgICAgICAgICAgICAgIGh0dHBfbWV0aG9kOiBcIlBPU1RcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJydGNcIjpcbiAgICAgICAgY2FwYWJpbGl0eSA9IHtcbiAgICAgICAgICBydGM6IHtcbiAgICAgICAgICAgIHdlYmhvb2tzOiB7XG4gICAgICAgICAgICAgIGV2ZW50X3VybDoge1xuICAgICAgICAgICAgICAgIGFkZHJlc3M6IGV2ZW50VXJsLFxuICAgICAgICAgICAgICAgIGh0dHBfbWV0aG9kOiBcIlBPU1RcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIGNhcGFiaWxpdGllczogY2FwYWJpbGl0eVxuICAgIH07XG4gIH1cblxuICBfY29udmVydEFwcGxpY2F0aW9uUmVzcG9uc2UoYXBwbGljYXRpb24pIHtcbiAgICBmb3IgKGxldCBjYXBhYmlsaXR5IGluIGFwcGxpY2F0aW9uLmNhcGFiaWxpdGllcykge1xuICAgICAgYXBwbGljYXRpb25bY2FwYWJpbGl0eV0gPSB7XG4gICAgICAgIHdlYmhvb2tzOiBbXVxuICAgICAgfTtcbiAgICAgIGZvciAobGV0IHdlYmhvb2sgaW4gYXBwbGljYXRpb24uY2FwYWJpbGl0aWVzW2NhcGFiaWxpdHldLndlYmhvb2tzKSB7XG4gICAgICAgIGFwcGxpY2F0aW9uW2NhcGFiaWxpdHldLndlYmhvb2tzLnB1c2goe1xuICAgICAgICAgIGVuZHBvaW50X3R5cGU6IHdlYmhvb2ssXG4gICAgICAgICAgZW5kcG9pbnQ6XG4gICAgICAgICAgICBhcHBsaWNhdGlvbi5jYXBhYmlsaXRpZXNbY2FwYWJpbGl0eV0ud2ViaG9va3Nbd2ViaG9va10uYWRkcmVzcyxcbiAgICAgICAgICBodHRwX21ldGhvZDpcbiAgICAgICAgICAgIGFwcGxpY2F0aW9uLmNhcGFiaWxpdGllc1tjYXBhYmlsaXR5XS53ZWJob29rc1t3ZWJob29rXS5odHRwX21ldGhvZFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZWxldGUgYXBwbGljYXRpb24uY2FwYWJpbGl0aWVzO1xuICAgIHJldHVybiBhcHBsaWNhdGlvbjtcbiAgfVxuXG4gIF9jb252ZXJ0QXBwbGljYXRpb25MaXN0UmVzcG9uc2UoYXBwbGljYXRpb25SZXNwb25zZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gcmVzcG9uc2UgPT4ge1xuICAgICAgcmVzcG9uc2UuY291bnQgPSByZXNwb25zZS50b3RhbF9pdGVtcztcbiAgICAgIHJlc3BvbnNlLnBhZ2VfaW5kZXggPSByZXNwb25zZS5wYWdlO1xuICAgICAgZm9yIChsZXQgaSBpbiByZXNwb25zZS5fZW1iZWRkZWQuYXBwbGljYXRpb25zKSB7XG4gICAgICAgIHJlc3BvbnNlLl9lbWJlZGRlZC5hcHBsaWNhdGlvbnNbaV0gPSBhcHBsaWNhdGlvblJlc3BvbnNlSGFuZGxlcihcbiAgICAgICAgICByZXNwb25zZS5fZW1iZWRkZWQuYXBwbGljYXRpb25zW2ldXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICBjcmVhdGUobmFtZSwgdHlwZSwgYW5zd2VyVXJsLCBldmVudFVybCwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICBsZXQgcGFyYW1zID0ge307XG4gICAgbGV0IHJlc3BvbnNlUGFyc2VyID0gbnVsbDtcblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMikge1xuICAgICAgcGFyYW1zID0gSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgIHRoaXMuX2NvbnZlcnRNZXRob2RTaWduYXR1cmUobmFtZSwgdHlwZSwgYW5zd2VyVXJsLCBldmVudFVybCwgb3B0aW9ucylcbiAgICAgICk7XG4gICAgICByZXNwb25zZVBhcnNlciA9IHRoaXMuX2NvbnZlcnRBcHBsaWNhdGlvblJlc3BvbnNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJhbXMgPSBKU09OLnN0cmluZ2lmeShuYW1lKTtcbiAgICAgIGNhbGxiYWNrID0gdHlwZTtcbiAgICB9XG5cbiAgICBjb25zdCBhdXRob3JpemF0aW9uID0gYCR7dGhpcy5jcmVkcy5hcGlLZXl9OiR7dGhpcy5jcmVkcy5hcGlTZWNyZXR9YDtcblxuICAgIHZhciBjb25maWcgPSB7XG4gICAgICBob3N0OiBcImFwaS5uZXhtby5jb21cIixcbiAgICAgIHBhdGg6IEFwcC5QQVRILFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCYXNpYyAke0J1ZmZlci5mcm9tKGF1dGhvcml6YXRpb24pLnRvU3RyaW5nKFwiYmFzZTY0XCIpfWBcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5vcHRpb25zLmh0dHBDbGllbnQucmVxdWVzdChcbiAgICAgIGNvbmZpZyxcbiAgICAgIGNhbGxiYWNrLFxuICAgICAgY2FsbGJhY2ssXG4gICAgICBmYWxzZSxcbiAgICAgIHJlc3BvbnNlUGFyc2VyXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOiBkb2N1bWVudFxuICAgKi9cbiAgZ2V0KHBhcmFtcywgY2FsbGJhY2ssIHYyID0gZmFsc2UpIHtcbiAgICBjb25zdCBhdXRob3JpemF0aW9uID0gYCR7dGhpcy5jcmVkcy5hcGlLZXl9OiR7dGhpcy5jcmVkcy5hcGlTZWNyZXR9YDtcbiAgICBsZXQgcmVzcG9uc2VQYXJzZXIgPSBudWxsO1xuXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJlc3BvbnNlUGFyc2VyID0gdGhpcy5fY29udmVydEFwcGxpY2F0aW9uUmVzcG9uc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3BvbnNlUGFyc2VyID0gdGhpcy5fY29udmVydEFwcGxpY2F0aW9uTGlzdFJlc3BvbnNlKFxuICAgICAgICB0aGlzLl9jb252ZXJ0QXBwbGljYXRpb25SZXNwb25zZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodjIpIHtcbiAgICAgIHJlc3BvbnNlUGFyc2VyID0gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgY29uZmlnID0ge1xuICAgICAgaG9zdDogXCJhcGkubmV4bW8uY29tXCIsXG4gICAgICBwYXRoOiBVdGlscy5jcmVhdGVQYXRoV2l0aFF1ZXJ5KEFwcC5QQVRILCBwYXJhbXMpLFxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgYm9keTogdW5kZWZpbmVkLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJhc2ljICR7QnVmZmVyLmZyb20oYXV0aG9yaXphdGlvbikudG9TdHJpbmcoXCJiYXNlNjRcIil9YFxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLm9wdGlvbnMuaHR0cENsaWVudC5yZXF1ZXN0KFxuICAgICAgY29uZmlnLFxuICAgICAgY2FsbGJhY2ssXG4gICAgICBjYWxsYmFjayxcbiAgICAgIGZhbHNlLFxuICAgICAgcmVzcG9uc2VQYXJzZXJcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICB1cGRhdGUoYXBwSWQsIG5hbWUsIHR5cGUsIGFuc3dlclVybCwgZXZlbnRVcmwsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgbGV0IHBhcmFtcyA9IHt9O1xuICAgIGxldCByZXNwb25zZVBhcnNlciA9IG51bGw7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAzKSB7XG4gICAgICBwYXJhbXMgPSBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgdGhpcy5fY29udmVydE1ldGhvZFNpZ25hdHVyZShuYW1lLCB0eXBlLCBhbnN3ZXJVcmwsIGV2ZW50VXJsLCBvcHRpb25zKVxuICAgICAgKTtcbiAgICAgIHJlc3BvbnNlUGFyc2VyID0gdGhpcy5fY29udmVydEFwcGxpY2F0aW9uUmVzcG9uc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmFtcyA9IEpTT04uc3RyaW5naWZ5KG5hbWUpO1xuICAgICAgY2FsbGJhY2sgPSB0eXBlO1xuICAgIH1cblxuICAgIGNvbnN0IGF1dGhvcml6YXRpb24gPSBgJHt0aGlzLmNyZWRzLmFwaUtleX06JHt0aGlzLmNyZWRzLmFwaVNlY3JldH1gO1xuXG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgIGhvc3Q6IFwiYXBpLm5leG1vLmNvbVwiLFxuICAgICAgcGF0aDogYCR7QXBwLlBBVEh9LyR7YXBwSWR9YCxcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCYXNpYyAke0J1ZmZlci5mcm9tKGF1dGhvcml6YXRpb24pLnRvU3RyaW5nKFwiYmFzZTY0XCIpfWBcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5vcHRpb25zLmh0dHBDbGllbnQucmVxdWVzdChcbiAgICAgIGNvbmZpZyxcbiAgICAgIGNhbGxiYWNrLFxuICAgICAgY2FsbGJhY2ssXG4gICAgICBmYWxzZSxcbiAgICAgIHJlc3BvbnNlUGFyc2VyXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOiBkb2N1bWVudFxuICAgKi9cbiAgZGVsZXRlKGFwcElkLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGF1dGhvcml6YXRpb24gPSBgJHt0aGlzLmNyZWRzLmFwaUtleX06JHt0aGlzLmNyZWRzLmFwaVNlY3JldH1gO1xuXG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgIGhvc3Q6IFwiYXBpLm5leG1vLmNvbVwiLFxuICAgICAgcGF0aDogYCR7QXBwLlBBVEh9LyR7YXBwSWR9YCxcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGJvZHk6IFwie31cIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCYXNpYyAke0J1ZmZlci5mcm9tKGF1dGhvcml6YXRpb24pLnRvU3RyaW5nKFwiYmFzZTY0XCIpfWBcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5vcHRpb25zLmh0dHBDbGllbnQucmVxdWVzdChjb25maWcsIGNhbGxiYWNrKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iXX0=