"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _Utils = require("./Utils");

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Provides access to the `events` resource.
 */
var Events = function () {
  _createClass(Events, null, [{
    key: "PATH",

    /**
     * The path to the `events` resource.
     */
    get: function get() {
      return "/beta/conversations/{conversation_uuid}/events";
    }

    /**
     * Creates a new Events instance.
     *
     * @param {Credentials} creds - Credentials used when interacting with the Nexmo API.
     * @param {Object} options - additional options for the class.
     */

  }]);

  function Events(creds, options) {
    _classCallCheck(this, Events);

    this.creds = creds;
    this.options = options;
  }

  /**
   * Creates an event in a conversation.
   *
   * @param {string} conversationId - The unique identifier for the conversation
   * @param {Object} params - Parameters used when adding an event to the conversation. See https://developer.nexmo.com/api/conversation#createEvent for more information.
   * @param {function} callback - function to be called when the request completes.
   */


  _createClass(Events, [{
    key: "create",
    value: function create(conversationId, params, callback) {
      params = JSON.stringify(params);

      var config = {
        host: "api.nexmo.com",
        path: Events.PATH.replace("{conversation_uuid}", conversationId),
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.creds.generateJwt()
        }
      };
      this.options.httpClient.request(config, callback);
    }

    /**
     * Get an existing event.
     *
     * @param {string} conversationId - The unique identifier for the conversation
     * @param {string|object} query - The unique identifier for the event to retrieve
     *               or a set of filter parameters for the query. For more information
     *               see https://developer.nexmo.com/api/conversation#getEvents
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: "get",
    value: function get(conversationId, query, callback) {
      var config = {
        host: "api.nexmo.com",
        path: _Utils2.default.createPathWithQuery(Events.PATH.replace("{conversation_uuid}", conversationId), query),
        method: "GET",
        body: undefined,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.creds.generateJwt()
        }
      };
      this.options.httpClient.request(config, callback);
    }

    /**
     * Deleta an existing event.
     *
     * @param {string} conversationId- The unique identifier for the conversation to delete the event from.
     * @param {string} eventId - The unique identifier for the event to delete.
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: "delete",
    value: function _delete(conversationId, eventId, callback) {
      var config = {
        host: "api.nexmo.com",
        path: Events.PATH.replace("{conversation_uuid}", conversationId) + "/" + eventId,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.creds.generateJwt()
        }
      };

      this.options.httpClient.request(config, callback);
    }
  }]);

  return Events;
}();

exports.default = Events;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9FdmVudHMuanMiXSwibmFtZXMiOlsiRXZlbnRzIiwiY3JlZHMiLCJvcHRpb25zIiwiY29udmVyc2F0aW9uSWQiLCJwYXJhbXMiLCJjYWxsYmFjayIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb25maWciLCJob3N0IiwicGF0aCIsIlBBVEgiLCJyZXBsYWNlIiwibWV0aG9kIiwiYm9keSIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiZ2VuZXJhdGVKd3QiLCJodHRwQ2xpZW50IiwicmVxdWVzdCIsInF1ZXJ5IiwiY3JlYXRlUGF0aFdpdGhRdWVyeSIsInVuZGVmaW5lZCIsImV2ZW50SWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7Ozs7Ozs7QUFFQTs7O0lBR01BLE07Ozs7QUFDSjs7O3dCQUdrQjtBQUNoQixhQUFPLGdEQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7OztBQU1BLGtCQUFZQyxLQUFaLEVBQW1CQyxPQUFuQixFQUE0QjtBQUFBOztBQUMxQixTQUFLRCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7MkJBT09DLGMsRUFBZ0JDLE0sRUFBUUMsUSxFQUFVO0FBQ3ZDRCxlQUFTRSxLQUFLQyxTQUFMLENBQWVILE1BQWYsQ0FBVDs7QUFFQSxVQUFJSSxTQUFTO0FBQ1hDLGNBQU0sZUFESztBQUVYQyxjQUFNVixPQUFPVyxJQUFQLENBQVlDLE9BQVosQ0FBb0IscUJBQXBCLEVBQTJDVCxjQUEzQyxDQUZLO0FBR1hVLGdCQUFRLE1BSEc7QUFJWEMsY0FBTVYsTUFKSztBQUtYVyxpQkFBUztBQUNQLDBCQUFnQixrQkFEVDtBQUVQQyxxQ0FBeUIsS0FBS2YsS0FBTCxDQUFXZ0IsV0FBWDtBQUZsQjtBQUxFLE9BQWI7QUFVQSxXQUFLZixPQUFMLENBQWFnQixVQUFiLENBQXdCQyxPQUF4QixDQUFnQ1gsTUFBaEMsRUFBd0NILFFBQXhDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7Ozt3QkFVSUYsYyxFQUFnQmlCLEssRUFBT2YsUSxFQUFVO0FBQ25DLFVBQUlHLFNBQVM7QUFDWEMsY0FBTSxlQURLO0FBRVhDLGNBQU0sZ0JBQU1XLG1CQUFOLENBQ0pyQixPQUFPVyxJQUFQLENBQVlDLE9BQVosQ0FBb0IscUJBQXBCLEVBQTJDVCxjQUEzQyxDQURJLEVBRUppQixLQUZJLENBRks7QUFNWFAsZ0JBQVEsS0FORztBQU9YQyxjQUFNUSxTQVBLO0FBUVhQLGlCQUFTO0FBQ1AsMEJBQWdCLGtCQURUO0FBRVBDLHFDQUF5QixLQUFLZixLQUFMLENBQVdnQixXQUFYO0FBRmxCO0FBUkUsT0FBYjtBQWFBLFdBQUtmLE9BQUwsQ0FBYWdCLFVBQWIsQ0FBd0JDLE9BQXhCLENBQWdDWCxNQUFoQyxFQUF3Q0gsUUFBeEM7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs0QkFPT0YsYyxFQUFnQm9CLE8sRUFBU2xCLFEsRUFBVTtBQUN4QyxVQUFJRyxTQUFTO0FBQ1hDLGNBQU0sZUFESztBQUVYQyxjQUFTVixPQUFPVyxJQUFQLENBQVlDLE9BQVosQ0FDUCxxQkFETyxFQUVQVCxjQUZPLENBQVQsU0FHS29CLE9BTE07QUFNWFYsZ0JBQVEsUUFORztBQU9YRSxpQkFBUztBQUNQLDBCQUFnQixrQkFEVDtBQUVQQyxxQ0FBeUIsS0FBS2YsS0FBTCxDQUFXZ0IsV0FBWDtBQUZsQjtBQVBFLE9BQWI7O0FBYUEsV0FBS2YsT0FBTCxDQUFhZ0IsVUFBYixDQUF3QkMsT0FBeEIsQ0FBZ0NYLE1BQWhDLEVBQXdDSCxRQUF4QztBQUNEOzs7Ozs7a0JBR1lMLE0iLCJmaWxlIjoiRXZlbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5leG1vIGZyb20gXCIuL2luZGV4XCI7XG5cbmltcG9ydCBVdGlscyBmcm9tIFwiLi9VdGlsc1wiO1xuXG4vKipcbiAqIFByb3ZpZGVzIGFjY2VzcyB0byB0aGUgYGV2ZW50c2AgcmVzb3VyY2UuXG4gKi9cbmNsYXNzIEV2ZW50cyB7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCB0byB0aGUgYGV2ZW50c2AgcmVzb3VyY2UuXG4gICAqL1xuICBzdGF0aWMgZ2V0IFBBVEgoKSB7XG4gICAgcmV0dXJuIFwiL2JldGEvY29udmVyc2F0aW9ucy97Y29udmVyc2F0aW9uX3V1aWR9L2V2ZW50c1wiO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgRXZlbnRzIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge0NyZWRlbnRpYWxzfSBjcmVkcyAtIENyZWRlbnRpYWxzIHVzZWQgd2hlbiBpbnRlcmFjdGluZyB3aXRoIHRoZSBOZXhtbyBBUEkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gYWRkaXRpb25hbCBvcHRpb25zIGZvciB0aGUgY2xhc3MuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjcmVkcywgb3B0aW9ucykge1xuICAgIHRoaXMuY3JlZHMgPSBjcmVkcztcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gZXZlbnQgaW4gYSBjb252ZXJzYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb252ZXJzYXRpb25JZCAtIFRoZSB1bmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIGNvbnZlcnNhdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gUGFyYW1ldGVycyB1c2VkIHdoZW4gYWRkaW5nIGFuIGV2ZW50IHRvIHRoZSBjb252ZXJzYXRpb24uIFNlZSBodHRwczovL2RldmVsb3Blci5uZXhtby5jb20vYXBpL2NvbnZlcnNhdGlvbiNjcmVhdGVFdmVudCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgcmVxdWVzdCBjb21wbGV0ZXMuXG4gICAqL1xuICBjcmVhdGUoY29udmVyc2F0aW9uSWQsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBwYXJhbXMgPSBKU09OLnN0cmluZ2lmeShwYXJhbXMpO1xuXG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgIGhvc3Q6IFwiYXBpLm5leG1vLmNvbVwiLFxuICAgICAgcGF0aDogRXZlbnRzLlBBVEgucmVwbGFjZShcIntjb252ZXJzYXRpb25fdXVpZH1cIiwgY29udmVyc2F0aW9uSWQpLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLmNyZWRzLmdlbmVyYXRlSnd0KCl9YFxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5vcHRpb25zLmh0dHBDbGllbnQucmVxdWVzdChjb25maWcsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYW4gZXhpc3RpbmcgZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb252ZXJzYXRpb25JZCAtIFRoZSB1bmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIGNvbnZlcnNhdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHF1ZXJ5IC0gVGhlIHVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgZXZlbnQgdG8gcmV0cmlldmVcbiAgICogICAgICAgICAgICAgICBvciBhIHNldCBvZiBmaWx0ZXIgcGFyYW1ldGVycyBmb3IgdGhlIHF1ZXJ5LiBGb3IgbW9yZSBpbmZvcm1hdGlvblxuICAgKiAgICAgICAgICAgICAgIHNlZSBodHRwczovL2RldmVsb3Blci5uZXhtby5jb20vYXBpL2NvbnZlcnNhdGlvbiNnZXRFdmVudHNcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgcmVxdWVzdCBjb21wbGV0ZXMuXG4gICAqL1xuXG4gIGdldChjb252ZXJzYXRpb25JZCwgcXVlcnksIGNhbGxiYWNrKSB7XG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgIGhvc3Q6IFwiYXBpLm5leG1vLmNvbVwiLFxuICAgICAgcGF0aDogVXRpbHMuY3JlYXRlUGF0aFdpdGhRdWVyeShcbiAgICAgICAgRXZlbnRzLlBBVEgucmVwbGFjZShcIntjb252ZXJzYXRpb25fdXVpZH1cIiwgY29udmVyc2F0aW9uSWQpLFxuICAgICAgICBxdWVyeVxuICAgICAgKSxcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGJvZHk6IHVuZGVmaW5lZCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLmNyZWRzLmdlbmVyYXRlSnd0KCl9YFxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5vcHRpb25zLmh0dHBDbGllbnQucmVxdWVzdChjb25maWcsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGEgYW4gZXhpc3RpbmcgZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb252ZXJzYXRpb25JZC0gVGhlIHVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgY29udmVyc2F0aW9uIHRvIGRlbGV0ZSB0aGUgZXZlbnQgZnJvbS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50SWQgLSBUaGUgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSBldmVudCB0byBkZWxldGUuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIHJlcXVlc3QgY29tcGxldGVzLlxuICAgKi9cbiAgZGVsZXRlKGNvbnZlcnNhdGlvbklkLCBldmVudElkLCBjYWxsYmFjaykge1xuICAgIHZhciBjb25maWcgPSB7XG4gICAgICBob3N0OiBcImFwaS5uZXhtby5jb21cIixcbiAgICAgIHBhdGg6IGAke0V2ZW50cy5QQVRILnJlcGxhY2UoXG4gICAgICAgIFwie2NvbnZlcnNhdGlvbl91dWlkfVwiLFxuICAgICAgICBjb252ZXJzYXRpb25JZFxuICAgICAgKX0vJHtldmVudElkfWAsXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dGhpcy5jcmVkcy5nZW5lcmF0ZUp3dCgpfWBcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5vcHRpb25zLmh0dHBDbGllbnQucmVxdWVzdChjb25maWcsIGNhbGxiYWNrKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFdmVudHM7XG4iXX0=