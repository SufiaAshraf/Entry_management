"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Provides access to the `dtmf` resource.
 */
var DtmfResource = function () {
  _createClass(DtmfResource, null, [{
    key: "PATH",

    /**
     * The path to the `dtmf` resource.
     */
    get: function get() {
      return "/v1/calls/{call_uuid}/dtmf";
    }

    /**
     * Creates a new DtmfResource.
     *
     * @param {Credentials} creds - Credentials used when interacting with the Nexmo API.
     * @param {Object} options - additional options for the class.
     */

  }]);

  function DtmfResource(creds, options) {
    _classCallCheck(this, DtmfResource);

    this.creds = creds;
    this.options = options;
  }

  /**
   * Sends DTMF to a call.
   *
   * @param {Object} params - Parameters used when sending the dtmf to the call. See https://developer.nexmo.com/api/voice#dtmf for more information.
   * @param {function} callback - function to be called when the request completes.
   */


  _createClass(DtmfResource, [{
    key: "send",
    value: function send(callId, params, callback) {
      params = JSON.stringify(params);

      var config = {
        host: "api.nexmo.com",
        path: DtmfResource.PATH.replace("{call_uuid}", callId),
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

  return DtmfResource;
}();

exports.default = DtmfResource;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EdG1mUmVzb3VyY2UuanMiXSwibmFtZXMiOlsiRHRtZlJlc291cmNlIiwiY3JlZHMiLCJvcHRpb25zIiwiY2FsbElkIiwicGFyYW1zIiwiY2FsbGJhY2siLCJKU09OIiwic3RyaW5naWZ5IiwiY29uZmlnIiwiaG9zdCIsInBhdGgiLCJQQVRIIiwicmVwbGFjZSIsIm1ldGhvZCIsImJvZHkiLCJoZWFkZXJzIiwiQnVmZmVyIiwiYnl0ZUxlbmd0aCIsIkF1dGhvcml6YXRpb24iLCJnZW5lcmF0ZUp3dCIsImh0dHBDbGllbnQiLCJyZXF1ZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7OztJQUdNQSxZOzs7O0FBQ0o7Ozt3QkFHa0I7QUFDaEIsYUFBTyw0QkFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7QUFNQSx3QkFBWUMsS0FBWixFQUFtQkMsT0FBbkIsRUFBNEI7QUFBQTs7QUFDMUIsU0FBS0QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7eUJBTUtDLE0sRUFBUUMsTSxFQUFRQyxRLEVBQVU7QUFDN0JELGVBQVNFLEtBQUtDLFNBQUwsQ0FBZUgsTUFBZixDQUFUOztBQUVBLFVBQUlJLFNBQVM7QUFDWEMsY0FBTSxlQURLO0FBRVhDLGNBQU1WLGFBQWFXLElBQWIsQ0FBa0JDLE9BQWxCLENBQTBCLGFBQTFCLEVBQXlDVCxNQUF6QyxDQUZLO0FBR1hVLGdCQUFRLEtBSEc7QUFJWEMsY0FBTVYsTUFKSztBQUtYVyxpQkFBUztBQUNQLDBCQUFnQixrQkFEVDtBQUVQLDRCQUFrQkMsT0FBT0MsVUFBUCxDQUFrQmIsTUFBbEIsQ0FGWDtBQUdQYyxxQ0FBeUIsS0FBS2pCLEtBQUwsQ0FBV2tCLFdBQVg7QUFIbEI7QUFMRSxPQUFiO0FBV0EsV0FBS2pCLE9BQUwsQ0FBYWtCLFVBQWIsQ0FBd0JDLE9BQXhCLENBQWdDYixNQUFoQyxFQUF3Q0gsUUFBeEM7QUFDRDs7Ozs7O2tCQUdZTCxZIiwiZmlsZSI6IkR0bWZSZXNvdXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUHJvdmlkZXMgYWNjZXNzIHRvIHRoZSBgZHRtZmAgcmVzb3VyY2UuXG4gKi9cbmNsYXNzIER0bWZSZXNvdXJjZSB7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCB0byB0aGUgYGR0bWZgIHJlc291cmNlLlxuICAgKi9cbiAgc3RhdGljIGdldCBQQVRIKCkge1xuICAgIHJldHVybiBcIi92MS9jYWxscy97Y2FsbF91dWlkfS9kdG1mXCI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBEdG1mUmVzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7Q3JlZGVudGlhbHN9IGNyZWRzIC0gQ3JlZGVudGlhbHMgdXNlZCB3aGVuIGludGVyYWN0aW5nIHdpdGggdGhlIE5leG1vIEFQSS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBhZGRpdGlvbmFsIG9wdGlvbnMgZm9yIHRoZSBjbGFzcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGNyZWRzLCBvcHRpb25zKSB7XG4gICAgdGhpcy5jcmVkcyA9IGNyZWRzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgRFRNRiB0byBhIGNhbGwuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBQYXJhbWV0ZXJzIHVzZWQgd2hlbiBzZW5kaW5nIHRoZSBkdG1mIHRvIHRoZSBjYWxsLiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubmV4bW8uY29tL2FwaS92b2ljZSNkdG1mIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSByZXF1ZXN0IGNvbXBsZXRlcy5cbiAgICovXG4gIHNlbmQoY2FsbElkLCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgcGFyYW1zID0gSlNPTi5zdHJpbmdpZnkocGFyYW1zKTtcblxuICAgIHZhciBjb25maWcgPSB7XG4gICAgICBob3N0OiBcImFwaS5uZXhtby5jb21cIixcbiAgICAgIHBhdGg6IER0bWZSZXNvdXJjZS5QQVRILnJlcGxhY2UoXCJ7Y2FsbF91dWlkfVwiLCBjYWxsSWQpLFxuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgXCJDb250ZW50LUxlbmd0aFwiOiBCdWZmZXIuYnl0ZUxlbmd0aChwYXJhbXMpLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dGhpcy5jcmVkcy5nZW5lcmF0ZUp3dCgpfWBcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMub3B0aW9ucy5odHRwQ2xpZW50LnJlcXVlc3QoY29uZmlnLCBjYWxsYmFjayk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRHRtZlJlc291cmNlO1xuIl19