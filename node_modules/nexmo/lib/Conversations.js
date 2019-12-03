"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _Utils = require("./Utils");

var _Utils2 = _interopRequireDefault(_Utils);

var _Members = require("./Members");

var _Members2 = _interopRequireDefault(_Members);

var _Events = require("./Events");

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Provides access to the `conversations` endpoint.
 */
var Conversations = function () {
  _createClass(Conversations, null, [{
    key: "PATH",
    get: function get() {
      return "/beta/conversations";
    }

    /**
     * @param {Credentials} credentials
     *    credentials to be used when interacting with the API.
     * @param {Object} options
     *    Additional Conversations options.
     */

  }]);

  function Conversations(credentials) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Conversations);

    this.creds = credentials;
    this.options = options;

    /**
     * @type Members
     */
    this.members = new _Members2.default(this.creds, this.options);

    /**
     * @type Events
     */
    this.events = new _Events2.default(this.creds, this.options);
  }

  /**
   * Create a new conversation.
   *
   * @param {Object} params - Parameters used when creating the conversation. See https://ea.developer.nexmo.com/api/conversation#create-a-conversation for more information.
   * @param {function} callback - function to be called when the request completes.
   */


  _createClass(Conversations, [{
    key: "create",
    value: function create(params, callback) {
      params = JSON.stringify(params);

      var config = {
        host: "api.nexmo.com",
        path: Conversations.PATH,
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
     * Get an existing conversation.
     *
     * @param {string|object} query - The unique identifier for the conversation to retrieve
     *               or a set of filter parameters for the query. For more information
     *               see https://ea.developer.nexmo.com/api/conversation#retrieve-a-conversation
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: "get",
    value: function get(query, callback) {
      var config = {
        host: "api.nexmo.com",
        path: _Utils2.default.createPathWithQuery(Conversations.PATH, query),
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
     * Update an existing conversation.
     *
     * @param {string} conversationId - The unique identifier for the conversation to update.
     * @param {Object} params - Parameters used when updating the conversation.
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: "update",
    value: function update(conversationId, params, callback) {
      params = JSON.stringify(params);

      var config = {
        host: "api.nexmo.com",
        path: Conversations.PATH + "/" + conversationId,
        method: "PUT",
        body: params,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.creds.generateJwt()
        }
      };

      this.options.httpClient.request(config, callback);
    }

    /**
     * Record an existing conversation.
     *
     * @param {string} conversationId - The unique identifier for the conversation to record.
     * @param {Object} params - Parameters used when recording the conversation.
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: "record",
    value: function record(conversationId, params, callback) {
      params = JSON.stringify(params);

      var config = {
        host: "api.nexmo.com",
        path: Conversations.PATH + "/" + conversationId + "/record",
        method: "PUT",
        body: params,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.creds.generateJwt()
        }
      };

      this.options.httpClient.request(config, callback);
    }

    /**
     * Deleta an existing conversation.
     *
     * @param {string} conversationId - The unique identifier for the conversation to delete.
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: "delete",
    value: function _delete(conversationId, callback) {
      var config = {
        host: "api.nexmo.com",
        path: Conversations.PATH + "/" + conversationId,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.creds.generateJwt()
        }
      };

      this.options.httpClient.request(config, callback);
    }
  }]);

  return Conversations;
}();

exports.default = Conversations;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db252ZXJzYXRpb25zLmpzIl0sIm5hbWVzIjpbIkNvbnZlcnNhdGlvbnMiLCJjcmVkZW50aWFscyIsIm9wdGlvbnMiLCJjcmVkcyIsIm1lbWJlcnMiLCJldmVudHMiLCJwYXJhbXMiLCJjYWxsYmFjayIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb25maWciLCJob3N0IiwicGF0aCIsIlBBVEgiLCJtZXRob2QiLCJib2R5IiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJnZW5lcmF0ZUp3dCIsImh0dHBDbGllbnQiLCJyZXF1ZXN0IiwicXVlcnkiLCJjcmVhdGVQYXRoV2l0aFF1ZXJ5IiwidW5kZWZpbmVkIiwiY29udmVyc2F0aW9uSWQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQUVBOzs7O0FBRUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7OztBQUVBOzs7SUFHTUEsYTs7O3dCQUNjO0FBQ2hCLGFBQU8scUJBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7O0FBTUEseUJBQVlDLFdBQVosRUFBdUM7QUFBQSxRQUFkQyxPQUFjLHVFQUFKLEVBQUk7O0FBQUE7O0FBQ3JDLFNBQUtDLEtBQUwsR0FBYUYsV0FBYjtBQUNBLFNBQUtDLE9BQUwsR0FBZUEsT0FBZjs7QUFFQTs7O0FBR0EsU0FBS0UsT0FBTCxHQUFlLHNCQUFZLEtBQUtELEtBQWpCLEVBQXdCLEtBQUtELE9BQTdCLENBQWY7O0FBRUE7OztBQUdBLFNBQUtHLE1BQUwsR0FBYyxxQkFBVyxLQUFLRixLQUFoQixFQUF1QixLQUFLRCxPQUE1QixDQUFkO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7MkJBTU9JLE0sRUFBUUMsUSxFQUFVO0FBQ3ZCRCxlQUFTRSxLQUFLQyxTQUFMLENBQWVILE1BQWYsQ0FBVDs7QUFFQSxVQUFJSSxTQUFTO0FBQ1hDLGNBQU0sZUFESztBQUVYQyxjQUFNWixjQUFjYSxJQUZUO0FBR1hDLGdCQUFRLE1BSEc7QUFJWEMsY0FBTVQsTUFKSztBQUtYVSxpQkFBUztBQUNQLDBCQUFnQixrQkFEVDtBQUVQQyxxQ0FBeUIsS0FBS2QsS0FBTCxDQUFXZSxXQUFYO0FBRmxCO0FBTEUsT0FBYjtBQVVBLFdBQUtoQixPQUFMLENBQWFpQixVQUFiLENBQXdCQyxPQUF4QixDQUFnQ1YsTUFBaEMsRUFBd0NILFFBQXhDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7O3dCQVFJYyxLLEVBQU9kLFEsRUFBVTtBQUNuQixVQUFJRyxTQUFTO0FBQ1hDLGNBQU0sZUFESztBQUVYQyxjQUFNLGdCQUFNVSxtQkFBTixDQUEwQnRCLGNBQWNhLElBQXhDLEVBQThDUSxLQUE5QyxDQUZLO0FBR1hQLGdCQUFRLEtBSEc7QUFJWEMsY0FBTVEsU0FKSztBQUtYUCxpQkFBUztBQUNQLDBCQUFnQixrQkFEVDtBQUVQQyxxQ0FBeUIsS0FBS2QsS0FBTCxDQUFXZSxXQUFYO0FBRmxCO0FBTEUsT0FBYjtBQVVBLFdBQUtoQixPQUFMLENBQWFpQixVQUFiLENBQXdCQyxPQUF4QixDQUFnQ1YsTUFBaEMsRUFBd0NILFFBQXhDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7MkJBT09pQixjLEVBQWdCbEIsTSxFQUFRQyxRLEVBQVU7QUFDdkNELGVBQVNFLEtBQUtDLFNBQUwsQ0FBZUgsTUFBZixDQUFUOztBQUVBLFVBQUlJLFNBQVM7QUFDWEMsY0FBTSxlQURLO0FBRVhDLGNBQVNaLGNBQWNhLElBQXZCLFNBQStCVyxjQUZwQjtBQUdYVixnQkFBUSxLQUhHO0FBSVhDLGNBQU1ULE1BSks7QUFLWFUsaUJBQVM7QUFDUCwwQkFBZ0Isa0JBRFQ7QUFFUEMscUNBQXlCLEtBQUtkLEtBQUwsQ0FBV2UsV0FBWDtBQUZsQjtBQUxFLE9BQWI7O0FBV0EsV0FBS2hCLE9BQUwsQ0FBYWlCLFVBQWIsQ0FBd0JDLE9BQXhCLENBQWdDVixNQUFoQyxFQUF3Q0gsUUFBeEM7QUFDRDs7QUFFRDs7Ozs7Ozs7OzsyQkFPT2lCLGMsRUFBZ0JsQixNLEVBQVFDLFEsRUFBVTtBQUN2Q0QsZUFBU0UsS0FBS0MsU0FBTCxDQUFlSCxNQUFmLENBQVQ7O0FBRUEsVUFBSUksU0FBUztBQUNYQyxjQUFNLGVBREs7QUFFWEMsY0FBU1osY0FBY2EsSUFBdkIsU0FBK0JXLGNBQS9CLFlBRlc7QUFHWFYsZ0JBQVEsS0FIRztBQUlYQyxjQUFNVCxNQUpLO0FBS1hVLGlCQUFTO0FBQ1AsMEJBQWdCLGtCQURUO0FBRVBDLHFDQUF5QixLQUFLZCxLQUFMLENBQVdlLFdBQVg7QUFGbEI7QUFMRSxPQUFiOztBQVdBLFdBQUtoQixPQUFMLENBQWFpQixVQUFiLENBQXdCQyxPQUF4QixDQUFnQ1YsTUFBaEMsRUFBd0NILFFBQXhDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs0QkFNT2lCLGMsRUFBZ0JqQixRLEVBQVU7QUFDL0IsVUFBSUcsU0FBUztBQUNYQyxjQUFNLGVBREs7QUFFWEMsY0FBU1osY0FBY2EsSUFBdkIsU0FBK0JXLGNBRnBCO0FBR1hWLGdCQUFRLFFBSEc7QUFJWEUsaUJBQVM7QUFDUCwwQkFBZ0Isa0JBRFQ7QUFFUEMscUNBQXlCLEtBQUtkLEtBQUwsQ0FBV2UsV0FBWDtBQUZsQjtBQUpFLE9BQWI7O0FBVUEsV0FBS2hCLE9BQUwsQ0FBYWlCLFVBQWIsQ0FBd0JDLE9BQXhCLENBQWdDVixNQUFoQyxFQUF3Q0gsUUFBeEM7QUFDRDs7Ozs7O2tCQUdZUCxhIiwiZmlsZSI6IkNvbnZlcnNhdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IG5leG1vIGZyb20gXCIuL2luZGV4XCI7XG5cbmltcG9ydCBVdGlscyBmcm9tIFwiLi9VdGlsc1wiO1xuXG5pbXBvcnQgTWVtYmVycyBmcm9tIFwiLi9NZW1iZXJzXCI7XG5pbXBvcnQgRXZlbnRzIGZyb20gXCIuL0V2ZW50c1wiO1xuXG4vKipcbiAqIFByb3ZpZGVzIGFjY2VzcyB0byB0aGUgYGNvbnZlcnNhdGlvbnNgIGVuZHBvaW50LlxuICovXG5jbGFzcyBDb252ZXJzYXRpb25zIHtcbiAgc3RhdGljIGdldCBQQVRIKCkge1xuICAgIHJldHVybiBcIi9iZXRhL2NvbnZlcnNhdGlvbnNcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0NyZWRlbnRpYWxzfSBjcmVkZW50aWFsc1xuICAgKiAgICBjcmVkZW50aWFscyB0byBiZSB1c2VkIHdoZW4gaW50ZXJhY3Rpbmcgd2l0aCB0aGUgQVBJLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiAgICBBZGRpdGlvbmFsIENvbnZlcnNhdGlvbnMgb3B0aW9ucy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGNyZWRlbnRpYWxzLCBvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmNyZWRzID0gY3JlZGVudGlhbHM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIE1lbWJlcnNcbiAgICAgKi9cbiAgICB0aGlzLm1lbWJlcnMgPSBuZXcgTWVtYmVycyh0aGlzLmNyZWRzLCB0aGlzLm9wdGlvbnMpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgRXZlbnRzXG4gICAgICovXG4gICAgdGhpcy5ldmVudHMgPSBuZXcgRXZlbnRzKHRoaXMuY3JlZHMsIHRoaXMub3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGNvbnZlcnNhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIFBhcmFtZXRlcnMgdXNlZCB3aGVuIGNyZWF0aW5nIHRoZSBjb252ZXJzYXRpb24uIFNlZSBodHRwczovL2VhLmRldmVsb3Blci5uZXhtby5jb20vYXBpL2NvbnZlcnNhdGlvbiNjcmVhdGUtYS1jb252ZXJzYXRpb24gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIHJlcXVlc3QgY29tcGxldGVzLlxuICAgKi9cbiAgY3JlYXRlKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBwYXJhbXMgPSBKU09OLnN0cmluZ2lmeShwYXJhbXMpO1xuXG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgIGhvc3Q6IFwiYXBpLm5leG1vLmNvbVwiLFxuICAgICAgcGF0aDogQ29udmVyc2F0aW9ucy5QQVRILFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLmNyZWRzLmdlbmVyYXRlSnd0KCl9YFxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5vcHRpb25zLmh0dHBDbGllbnQucmVxdWVzdChjb25maWcsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYW4gZXhpc3RpbmcgY29udmVyc2F0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHF1ZXJ5IC0gVGhlIHVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgY29udmVyc2F0aW9uIHRvIHJldHJpZXZlXG4gICAqICAgICAgICAgICAgICAgb3IgYSBzZXQgb2YgZmlsdGVyIHBhcmFtZXRlcnMgZm9yIHRoZSBxdWVyeS4gRm9yIG1vcmUgaW5mb3JtYXRpb25cbiAgICogICAgICAgICAgICAgICBzZWUgaHR0cHM6Ly9lYS5kZXZlbG9wZXIubmV4bW8uY29tL2FwaS9jb252ZXJzYXRpb24jcmV0cmlldmUtYS1jb252ZXJzYXRpb25cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgcmVxdWVzdCBjb21wbGV0ZXMuXG4gICAqL1xuICBnZXQocXVlcnksIGNhbGxiYWNrKSB7XG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgIGhvc3Q6IFwiYXBpLm5leG1vLmNvbVwiLFxuICAgICAgcGF0aDogVXRpbHMuY3JlYXRlUGF0aFdpdGhRdWVyeShDb252ZXJzYXRpb25zLlBBVEgsIHF1ZXJ5KSxcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGJvZHk6IHVuZGVmaW5lZCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLmNyZWRzLmdlbmVyYXRlSnd0KCl9YFxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5vcHRpb25zLmh0dHBDbGllbnQucmVxdWVzdChjb25maWcsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgY29udmVyc2F0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udmVyc2F0aW9uSWQgLSBUaGUgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSBjb252ZXJzYXRpb24gdG8gdXBkYXRlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gUGFyYW1ldGVycyB1c2VkIHdoZW4gdXBkYXRpbmcgdGhlIGNvbnZlcnNhdGlvbi5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgcmVxdWVzdCBjb21wbGV0ZXMuXG4gICAqL1xuICB1cGRhdGUoY29udmVyc2F0aW9uSWQsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBwYXJhbXMgPSBKU09OLnN0cmluZ2lmeShwYXJhbXMpO1xuXG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgIGhvc3Q6IFwiYXBpLm5leG1vLmNvbVwiLFxuICAgICAgcGF0aDogYCR7Q29udmVyc2F0aW9ucy5QQVRIfS8ke2NvbnZlcnNhdGlvbklkfWAsXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dGhpcy5jcmVkcy5nZW5lcmF0ZUp3dCgpfWBcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5vcHRpb25zLmh0dHBDbGllbnQucmVxdWVzdChjb25maWcsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWNvcmQgYW4gZXhpc3RpbmcgY29udmVyc2F0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udmVyc2F0aW9uSWQgLSBUaGUgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSBjb252ZXJzYXRpb24gdG8gcmVjb3JkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gUGFyYW1ldGVycyB1c2VkIHdoZW4gcmVjb3JkaW5nIHRoZSBjb252ZXJzYXRpb24uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIHJlcXVlc3QgY29tcGxldGVzLlxuICAgKi9cbiAgcmVjb3JkKGNvbnZlcnNhdGlvbklkLCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgcGFyYW1zID0gSlNPTi5zdHJpbmdpZnkocGFyYW1zKTtcblxuICAgIHZhciBjb25maWcgPSB7XG4gICAgICBob3N0OiBcImFwaS5uZXhtby5jb21cIixcbiAgICAgIHBhdGg6IGAke0NvbnZlcnNhdGlvbnMuUEFUSH0vJHtjb252ZXJzYXRpb25JZH0vcmVjb3JkYCxcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLmNyZWRzLmdlbmVyYXRlSnd0KCl9YFxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLm9wdGlvbnMuaHR0cENsaWVudC5yZXF1ZXN0KGNvbmZpZywgY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0YSBhbiBleGlzdGluZyBjb252ZXJzYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb252ZXJzYXRpb25JZCAtIFRoZSB1bmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIGNvbnZlcnNhdGlvbiB0byBkZWxldGUuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIHJlcXVlc3QgY29tcGxldGVzLlxuICAgKi9cbiAgZGVsZXRlKGNvbnZlcnNhdGlvbklkLCBjYWxsYmFjaykge1xuICAgIHZhciBjb25maWcgPSB7XG4gICAgICBob3N0OiBcImFwaS5uZXhtby5jb21cIixcbiAgICAgIHBhdGg6IGAke0NvbnZlcnNhdGlvbnMuUEFUSH0vJHtjb252ZXJzYXRpb25JZH1gLFxuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3RoaXMuY3JlZHMuZ2VuZXJhdGVKd3QoKX1gXG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMub3B0aW9ucy5odHRwQ2xpZW50LnJlcXVlc3QoY29uZmlnLCBjYWxsYmFjayk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udmVyc2F0aW9ucztcbiJdfQ==