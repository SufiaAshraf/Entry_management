"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _querystring = require("querystring");

var _querystring2 = _interopRequireDefault(_querystring);

var _StreamResource = require("./StreamResource");

var _StreamResource2 = _interopRequireDefault(_StreamResource);

var _TalkResource = require("./TalkResource");

var _TalkResource2 = _interopRequireDefault(_TalkResource);

var _DtmfResource = require("./DtmfResource");

var _DtmfResource2 = _interopRequireDefault(_DtmfResource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Provides access to the `calls` resource.
 */
var CallsResource = function () {
  _createClass(CallsResource, null, [{
    key: "PATH",

    /**
     * The path to the `calls` resource.
     */
    get: function get() {
      return "/v1/calls";
    }

    /**
     * Creates a new CallsResource.
     *
     * @param {Credentials} creds - Credentials used when interacting with the Nexmo API.
     * @param {Object} options - additional options for the class.
     */

  }]);

  function CallsResource(creds, options) {
    _classCallCheck(this, CallsResource);

    this.creds = creds;
    this.options = options;

    /**
     * @type StreamController
     */
    this.stream = new _StreamResource2.default(this.creds, this.options);

    /**
     * @type TalkResource
     */
    this.talk = new _TalkResource2.default(this.creds, this.options);

    /**
     * @type DtmfResource
     */
    this.dtmf = new _DtmfResource2.default(this.creds, this.options);
  }

  /**
   * Create a new call.
   *
   * @param {Object} params - Parameters used when creating the call. See https://developer.nexmo.com/api/voice#create-an-outbound-call for more information.
   * @param {function} callback - function to be called when the request completes.
   */


  _createClass(CallsResource, [{
    key: "create",
    value: function create(params, callback) {
      params = JSON.stringify(params);

      var config = {
        host: "api.nexmo.com",
        path: CallsResource.PATH,
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(params),
          Authorization: "Bearer " + this.creds.generateJwt()
        }
      };
      this.options.httpClient.request(config, callback);
    }

    /**
     * Get an existing call.
     *
     * @param {string|object} query - The unique identifier for the call to retrieve
     *               or a set of filter parameters for the query. For more information
     *               see https://docs.nexmo.com/voice/voice-api/api-reference#call_retrieve
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: "get",
    value: function get(query, callback) {
      if (!query) {
        throw new Error('"query" is a required parameter');
      }

      var pathExt = "";
      if (typeof query === "string") {
        // single call Id
        pathExt = "/" + query;
      } else if ((typeof query === "undefined" ? "undefined" : _typeof(query)) === "object" && Object.keys(query).length > 0) {
        // filter
        pathExt = "?" + _querystring2.default.stringify(query);
      }

      var config = {
        host: "api.nexmo.com",
        path: "" + CallsResource.PATH + pathExt,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.creds.generateJwt()
        }
      };
      this.options.httpClient.request(config, callback);
    }

    /**
     * Update an existing call.
     *
     * @param {string} [callId] - The unique identifier for the call to update.
     * @param {Object} params - Parameters used when updating the call. See https://developer.nexmo.com/api/voice#modify-an-existing-call for more information.
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: "update",
    value: function update(callId, params, callback) {
      params = JSON.stringify(params);

      var config = {
        host: "api.nexmo.com",
        path: CallsResource.PATH + "/" + callId,
        method: "PUT",
        body: params,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(params),
          Authorization: "Bearer " + this.creds.generateJwt()
        }
      };
      this.options.httpClient.request(config, callback);
    }
  }]);

  return CallsResource;
}();

exports.default = CallsResource;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DYWxsc1Jlc291cmNlLmpzIl0sIm5hbWVzIjpbIkNhbGxzUmVzb3VyY2UiLCJjcmVkcyIsIm9wdGlvbnMiLCJzdHJlYW0iLCJ0YWxrIiwiZHRtZiIsInBhcmFtcyIsImNhbGxiYWNrIiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbmZpZyIsImhvc3QiLCJwYXRoIiwiUEFUSCIsIm1ldGhvZCIsImJvZHkiLCJoZWFkZXJzIiwiQnVmZmVyIiwiYnl0ZUxlbmd0aCIsIkF1dGhvcml6YXRpb24iLCJnZW5lcmF0ZUp3dCIsImh0dHBDbGllbnQiLCJyZXF1ZXN0IiwicXVlcnkiLCJFcnJvciIsInBhdGhFeHQiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiY2FsbElkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7OztJQUdNQSxhOzs7O0FBQ0o7Ozt3QkFHa0I7QUFDaEIsYUFBTyxXQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7OztBQU1BLHlCQUFZQyxLQUFaLEVBQW1CQyxPQUFuQixFQUE0QjtBQUFBOztBQUMxQixTQUFLRCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7O0FBRUE7OztBQUdBLFNBQUtDLE1BQUwsR0FBYyw2QkFBbUIsS0FBS0YsS0FBeEIsRUFBK0IsS0FBS0MsT0FBcEMsQ0FBZDs7QUFFQTs7O0FBR0EsU0FBS0UsSUFBTCxHQUFZLDJCQUFpQixLQUFLSCxLQUF0QixFQUE2QixLQUFLQyxPQUFsQyxDQUFaOztBQUVBOzs7QUFHQSxTQUFLRyxJQUFMLEdBQVksMkJBQWlCLEtBQUtKLEtBQXRCLEVBQTZCLEtBQUtDLE9BQWxDLENBQVo7QUFDRDs7QUFFRDs7Ozs7Ozs7OzsyQkFNT0ksTSxFQUFRQyxRLEVBQVU7QUFDdkJELGVBQVNFLEtBQUtDLFNBQUwsQ0FBZUgsTUFBZixDQUFUOztBQUVBLFVBQUlJLFNBQVM7QUFDWEMsY0FBTSxlQURLO0FBRVhDLGNBQU1aLGNBQWNhLElBRlQ7QUFHWEMsZ0JBQVEsTUFIRztBQUlYQyxjQUFNVCxNQUpLO0FBS1hVLGlCQUFTO0FBQ1AsMEJBQWdCLGtCQURUO0FBRVAsNEJBQWtCQyxPQUFPQyxVQUFQLENBQWtCWixNQUFsQixDQUZYO0FBR1BhLHFDQUF5QixLQUFLbEIsS0FBTCxDQUFXbUIsV0FBWDtBQUhsQjtBQUxFLE9BQWI7QUFXQSxXQUFLbEIsT0FBTCxDQUFhbUIsVUFBYixDQUF3QkMsT0FBeEIsQ0FBZ0NaLE1BQWhDLEVBQXdDSCxRQUF4QztBQUNEOztBQUVEOzs7Ozs7Ozs7Ozt3QkFRSWdCLEssRUFBT2hCLFEsRUFBVTtBQUNuQixVQUFJLENBQUNnQixLQUFMLEVBQVk7QUFDVixjQUFNLElBQUlDLEtBQUosQ0FBVSxpQ0FBVixDQUFOO0FBQ0Q7O0FBRUQsVUFBSUMsVUFBVSxFQUFkO0FBQ0EsVUFBSSxPQUFPRixLQUFQLEtBQWlCLFFBQXJCLEVBQStCO0FBQzdCO0FBQ0FFLHdCQUFjRixLQUFkO0FBQ0QsT0FIRCxNQUdPLElBQUksUUFBT0EsS0FBUCx5Q0FBT0EsS0FBUCxPQUFpQixRQUFqQixJQUE2QkcsT0FBT0MsSUFBUCxDQUFZSixLQUFaLEVBQW1CSyxNQUFuQixHQUE0QixDQUE3RCxFQUFnRTtBQUNyRTtBQUNBSCx3QkFBYyxzQkFBWWhCLFNBQVosQ0FBc0JjLEtBQXRCLENBQWQ7QUFDRDs7QUFFRCxVQUFJYixTQUFTO0FBQ1hDLGNBQU0sZUFESztBQUVYQyxtQkFBU1osY0FBY2EsSUFBdkIsR0FBOEJZLE9BRm5CO0FBR1hYLGdCQUFRLEtBSEc7QUFJWEUsaUJBQVM7QUFDUCwwQkFBZ0Isa0JBRFQ7QUFFUEcscUNBQXlCLEtBQUtsQixLQUFMLENBQVdtQixXQUFYO0FBRmxCO0FBSkUsT0FBYjtBQVNBLFdBQUtsQixPQUFMLENBQWFtQixVQUFiLENBQXdCQyxPQUF4QixDQUFnQ1osTUFBaEMsRUFBd0NILFFBQXhDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7MkJBT09zQixNLEVBQVF2QixNLEVBQVFDLFEsRUFBVTtBQUMvQkQsZUFBU0UsS0FBS0MsU0FBTCxDQUFlSCxNQUFmLENBQVQ7O0FBRUEsVUFBSUksU0FBUztBQUNYQyxjQUFNLGVBREs7QUFFWEMsY0FBU1osY0FBY2EsSUFBdkIsU0FBK0JnQixNQUZwQjtBQUdYZixnQkFBUSxLQUhHO0FBSVhDLGNBQU1ULE1BSks7QUFLWFUsaUJBQVM7QUFDUCwwQkFBZ0Isa0JBRFQ7QUFFUCw0QkFBa0JDLE9BQU9DLFVBQVAsQ0FBa0JaLE1BQWxCLENBRlg7QUFHUGEscUNBQXlCLEtBQUtsQixLQUFMLENBQVdtQixXQUFYO0FBSGxCO0FBTEUsT0FBYjtBQVdBLFdBQUtsQixPQUFMLENBQWFtQixVQUFiLENBQXdCQyxPQUF4QixDQUFnQ1osTUFBaEMsRUFBd0NILFFBQXhDO0FBQ0Q7Ozs7OztrQkFHWVAsYSIsImZpbGUiOiJDYWxsc1Jlc291cmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHF1ZXJ5c3RyaW5nIGZyb20gXCJxdWVyeXN0cmluZ1wiO1xuXG5pbXBvcnQgU3RyZWFtUmVzb3VyY2UgZnJvbSBcIi4vU3RyZWFtUmVzb3VyY2VcIjtcbmltcG9ydCBUYWxrUmVzb3VyY2UgZnJvbSBcIi4vVGFsa1Jlc291cmNlXCI7XG5pbXBvcnQgRHRtZlJlc291cmNlIGZyb20gXCIuL0R0bWZSZXNvdXJjZVwiO1xuXG4vKipcbiAqIFByb3ZpZGVzIGFjY2VzcyB0byB0aGUgYGNhbGxzYCByZXNvdXJjZS5cbiAqL1xuY2xhc3MgQ2FsbHNSZXNvdXJjZSB7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCB0byB0aGUgYGNhbGxzYCByZXNvdXJjZS5cbiAgICovXG4gIHN0YXRpYyBnZXQgUEFUSCgpIHtcbiAgICByZXR1cm4gXCIvdjEvY2FsbHNcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IENhbGxzUmVzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7Q3JlZGVudGlhbHN9IGNyZWRzIC0gQ3JlZGVudGlhbHMgdXNlZCB3aGVuIGludGVyYWN0aW5nIHdpdGggdGhlIE5leG1vIEFQSS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBhZGRpdGlvbmFsIG9wdGlvbnMgZm9yIHRoZSBjbGFzcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGNyZWRzLCBvcHRpb25zKSB7XG4gICAgdGhpcy5jcmVkcyA9IGNyZWRzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSBTdHJlYW1Db250cm9sbGVyXG4gICAgICovXG4gICAgdGhpcy5zdHJlYW0gPSBuZXcgU3RyZWFtUmVzb3VyY2UodGhpcy5jcmVkcywgdGhpcy5vcHRpb25zKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIFRhbGtSZXNvdXJjZVxuICAgICAqL1xuICAgIHRoaXMudGFsayA9IG5ldyBUYWxrUmVzb3VyY2UodGhpcy5jcmVkcywgdGhpcy5vcHRpb25zKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIER0bWZSZXNvdXJjZVxuICAgICAqL1xuICAgIHRoaXMuZHRtZiA9IG5ldyBEdG1mUmVzb3VyY2UodGhpcy5jcmVkcywgdGhpcy5vcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgY2FsbC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIFBhcmFtZXRlcnMgdXNlZCB3aGVuIGNyZWF0aW5nIHRoZSBjYWxsLiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubmV4bW8uY29tL2FwaS92b2ljZSNjcmVhdGUtYW4tb3V0Ym91bmQtY2FsbCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgcmVxdWVzdCBjb21wbGV0ZXMuXG4gICAqL1xuICBjcmVhdGUocGFyYW1zLCBjYWxsYmFjaykge1xuICAgIHBhcmFtcyA9IEpTT04uc3RyaW5naWZ5KHBhcmFtcyk7XG5cbiAgICB2YXIgY29uZmlnID0ge1xuICAgICAgaG9zdDogXCJhcGkubmV4bW8uY29tXCIsXG4gICAgICBwYXRoOiBDYWxsc1Jlc291cmNlLlBBVEgsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgXCJDb250ZW50LUxlbmd0aFwiOiBCdWZmZXIuYnl0ZUxlbmd0aChwYXJhbXMpLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dGhpcy5jcmVkcy5nZW5lcmF0ZUp3dCgpfWBcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMub3B0aW9ucy5odHRwQ2xpZW50LnJlcXVlc3QoY29uZmlnLCBjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFuIGV4aXN0aW5nIGNhbGwuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gcXVlcnkgLSBUaGUgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSBjYWxsIHRvIHJldHJpZXZlXG4gICAqICAgICAgICAgICAgICAgb3IgYSBzZXQgb2YgZmlsdGVyIHBhcmFtZXRlcnMgZm9yIHRoZSBxdWVyeS4gRm9yIG1vcmUgaW5mb3JtYXRpb25cbiAgICogICAgICAgICAgICAgICBzZWUgaHR0cHM6Ly9kb2NzLm5leG1vLmNvbS92b2ljZS92b2ljZS1hcGkvYXBpLXJlZmVyZW5jZSNjYWxsX3JldHJpZXZlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIHJlcXVlc3QgY29tcGxldGVzLlxuICAgKi9cbiAgZ2V0KHF1ZXJ5LCBjYWxsYmFjaykge1xuICAgIGlmICghcXVlcnkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignXCJxdWVyeVwiIGlzIGEgcmVxdWlyZWQgcGFyYW1ldGVyJyk7XG4gICAgfVxuXG4gICAgdmFyIHBhdGhFeHQgPSBcIlwiO1xuICAgIGlmICh0eXBlb2YgcXVlcnkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIC8vIHNpbmdsZSBjYWxsIElkXG4gICAgICBwYXRoRXh0ID0gYC8ke3F1ZXJ5fWA7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcXVlcnkgPT09IFwib2JqZWN0XCIgJiYgT2JqZWN0LmtleXMocXVlcnkpLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGZpbHRlclxuICAgICAgcGF0aEV4dCA9IGA/JHtxdWVyeXN0cmluZy5zdHJpbmdpZnkocXVlcnkpfWA7XG4gICAgfVxuXG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgIGhvc3Q6IFwiYXBpLm5leG1vLmNvbVwiLFxuICAgICAgcGF0aDogYCR7Q2FsbHNSZXNvdXJjZS5QQVRIfSR7cGF0aEV4dH1gLFxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3RoaXMuY3JlZHMuZ2VuZXJhdGVKd3QoKX1gXG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLm9wdGlvbnMuaHR0cENsaWVudC5yZXF1ZXN0KGNvbmZpZywgY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhbiBleGlzdGluZyBjYWxsLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2NhbGxJZF0gLSBUaGUgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSBjYWxsIHRvIHVwZGF0ZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIFBhcmFtZXRlcnMgdXNlZCB3aGVuIHVwZGF0aW5nIHRoZSBjYWxsLiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubmV4bW8uY29tL2FwaS92b2ljZSNtb2RpZnktYW4tZXhpc3RpbmctY2FsbCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgcmVxdWVzdCBjb21wbGV0ZXMuXG4gICAqL1xuICB1cGRhdGUoY2FsbElkLCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgcGFyYW1zID0gSlNPTi5zdHJpbmdpZnkocGFyYW1zKTtcblxuICAgIHZhciBjb25maWcgPSB7XG4gICAgICBob3N0OiBcImFwaS5uZXhtby5jb21cIixcbiAgICAgIHBhdGg6IGAke0NhbGxzUmVzb3VyY2UuUEFUSH0vJHtjYWxsSWR9YCxcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIFwiQ29udGVudC1MZW5ndGhcIjogQnVmZmVyLmJ5dGVMZW5ndGgocGFyYW1zKSxcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3RoaXMuY3JlZHMuZ2VuZXJhdGVKd3QoKX1gXG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLm9wdGlvbnMuaHR0cENsaWVudC5yZXF1ZXN0KGNvbmZpZywgY2FsbGJhY2spO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbGxzUmVzb3VyY2U7XG4iXX0=