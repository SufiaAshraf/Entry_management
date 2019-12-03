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
 * Provides access to the `members` resource.
 */
var Members = function () {
  _createClass(Members, null, [{
    key: "PATH",

    /**
     * The path to the `members` resource.
     */
    get: function get() {
      return "/beta/conversations/{conversation_uuid}/members";
    }

    /**
     * Creates a new Members.
     *
     * @param {Credentials} creds - Credentials used when interacting with the Nexmo API.
     * @param {Object} options - additional options for the class.
     */

  }]);

  function Members(creds, options) {
    _classCallCheck(this, Members);

    this.creds = creds;
    this.options = options;
  }

  /**
   * Creates a member in a conversation.
   *
   * @param {string} conversationId - The unique identifier for the conversation
   * @param {Object} params - Parameters used when adding a member to the conversation. See https://ea.developer.nexmo.com/api/conversation#add-a-user-to-a-conversation for more information.
   * @param {function} callback - function to be called when the request completes.
   */


  _createClass(Members, [{
    key: "create",
    value: function create(conversationId, params, callback) {
      params = JSON.stringify(params);

      var config = {
        host: "api.nexmo.com",
        path: Members.PATH.replace("{conversation_uuid}", conversationId),
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.creds.generateJwt()
        }
      };
      this.options.httpClient.request(config, callback);
    }

    // backwards compatibility to 2.4.0-beta1. Remove for 3.0.0

  }, {
    key: "add",
    value: function add(conversationId, params, callback) {
      this.create(conversationId, params, callback);
    }

    /**
     * Get an existing member.
     *
     * @param {string} conversationId - The unique identifier for the conversation
     * @param {string|object} query - The unique identifier for the member to retrieve
     *               or a set of filter parameters for the query. For more information
     *               see https://ea.developer.nexmo.com/api/conversation#retrieve-members-of-a-conversation
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: "get",
    value: function get(conversationId, query, callback) {
      var config = {
        host: "api.nexmo.com",
        path: _Utils2.default.createPathWithQuery(Members.PATH.replace("{conversation_uuid}", conversationId), query),
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
     * Update an existing member.
     *
     * @param {string} conversationId - The unique identifier for the conversation to update the member in.
     * @param {string} memberId - The unique identifier for the member to update.
     * @param {Object} params - Parameters used when updating the member.
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: "update",
    value: function update(conversationId, memberId, params, callback) {
      params = JSON.stringify(params);

      var config = {
        host: "api.nexmo.com",
        path: Members.PATH.replace("{conversation_uuid}", conversationId) + "/" + memberId,
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
     * Deleta an existing member.
     *
     * @param {string} conversationId- The unique identifier for the conversation to delete the member from.
     * @param {string} memberId - The unique identifier for the member to delete.
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: "delete",
    value: function _delete(conversationId, memberId, callback) {
      var config = {
        host: "api.nexmo.com",
        path: Members.PATH.replace("{conversation_uuid}", conversationId) + "/" + memberId,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.creds.generateJwt()
        }
      };

      this.options.httpClient.request(config, callback);
    }
  }]);

  return Members;
}();

exports.default = Members;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZW1iZXJzLmpzIl0sIm5hbWVzIjpbIk1lbWJlcnMiLCJjcmVkcyIsIm9wdGlvbnMiLCJjb252ZXJzYXRpb25JZCIsInBhcmFtcyIsImNhbGxiYWNrIiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbmZpZyIsImhvc3QiLCJwYXRoIiwiUEFUSCIsInJlcGxhY2UiLCJtZXRob2QiLCJib2R5IiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJnZW5lcmF0ZUp3dCIsImh0dHBDbGllbnQiLCJyZXF1ZXN0IiwiY3JlYXRlIiwicXVlcnkiLCJjcmVhdGVQYXRoV2l0aFF1ZXJ5IiwidW5kZWZpbmVkIiwibWVtYmVySWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7Ozs7Ozs7QUFFQTs7O0lBR01BLE87Ozs7QUFDSjs7O3dCQUdrQjtBQUNoQixhQUFPLGlEQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7OztBQU1BLG1CQUFZQyxLQUFaLEVBQW1CQyxPQUFuQixFQUE0QjtBQUFBOztBQUMxQixTQUFLRCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7MkJBT09DLGMsRUFBZ0JDLE0sRUFBUUMsUSxFQUFVO0FBQ3ZDRCxlQUFTRSxLQUFLQyxTQUFMLENBQWVILE1BQWYsQ0FBVDs7QUFFQSxVQUFJSSxTQUFTO0FBQ1hDLGNBQU0sZUFESztBQUVYQyxjQUFNVixRQUFRVyxJQUFSLENBQWFDLE9BQWIsQ0FBcUIscUJBQXJCLEVBQTRDVCxjQUE1QyxDQUZLO0FBR1hVLGdCQUFRLE1BSEc7QUFJWEMsY0FBTVYsTUFKSztBQUtYVyxpQkFBUztBQUNQLDBCQUFnQixrQkFEVDtBQUVQQyxxQ0FBeUIsS0FBS2YsS0FBTCxDQUFXZ0IsV0FBWDtBQUZsQjtBQUxFLE9BQWI7QUFVQSxXQUFLZixPQUFMLENBQWFnQixVQUFiLENBQXdCQyxPQUF4QixDQUFnQ1gsTUFBaEMsRUFBd0NILFFBQXhDO0FBQ0Q7O0FBRUQ7Ozs7d0JBQ0lGLGMsRUFBZ0JDLE0sRUFBUUMsUSxFQUFVO0FBQ3BDLFdBQUtlLE1BQUwsQ0FBWWpCLGNBQVosRUFBNEJDLE1BQTVCLEVBQW9DQyxRQUFwQztBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7d0JBU0lGLGMsRUFBZ0JrQixLLEVBQU9oQixRLEVBQVU7QUFDbkMsVUFBSUcsU0FBUztBQUNYQyxjQUFNLGVBREs7QUFFWEMsY0FBTSxnQkFBTVksbUJBQU4sQ0FDSnRCLFFBQVFXLElBQVIsQ0FBYUMsT0FBYixDQUFxQixxQkFBckIsRUFBNENULGNBQTVDLENBREksRUFFSmtCLEtBRkksQ0FGSztBQU1YUixnQkFBUSxLQU5HO0FBT1hDLGNBQU1TLFNBUEs7QUFRWFIsaUJBQVM7QUFDUCwwQkFBZ0Isa0JBRFQ7QUFFUEMscUNBQXlCLEtBQUtmLEtBQUwsQ0FBV2dCLFdBQVg7QUFGbEI7QUFSRSxPQUFiO0FBYUEsV0FBS2YsT0FBTCxDQUFhZ0IsVUFBYixDQUF3QkMsT0FBeEIsQ0FBZ0NYLE1BQWhDLEVBQXdDSCxRQUF4QztBQUNEOztBQUVEOzs7Ozs7Ozs7OzsyQkFRT0YsYyxFQUFnQnFCLFEsRUFBVXBCLE0sRUFBUUMsUSxFQUFVO0FBQ2pERCxlQUFTRSxLQUFLQyxTQUFMLENBQWVILE1BQWYsQ0FBVDs7QUFFQSxVQUFJSSxTQUFTO0FBQ1hDLGNBQU0sZUFESztBQUVYQyxjQUFTVixRQUFRVyxJQUFSLENBQWFDLE9BQWIsQ0FDUCxxQkFETyxFQUVQVCxjQUZPLENBQVQsU0FHS3FCLFFBTE07QUFNWFgsZ0JBQVEsS0FORztBQU9YQyxjQUFNVixNQVBLO0FBUVhXLGlCQUFTO0FBQ1AsMEJBQWdCLGtCQURUO0FBRVBDLHFDQUF5QixLQUFLZixLQUFMLENBQVdnQixXQUFYO0FBRmxCO0FBUkUsT0FBYjs7QUFjQSxXQUFLZixPQUFMLENBQWFnQixVQUFiLENBQXdCQyxPQUF4QixDQUFnQ1gsTUFBaEMsRUFBd0NILFFBQXhDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7NEJBT09GLGMsRUFBZ0JxQixRLEVBQVVuQixRLEVBQVU7QUFDekMsVUFBSUcsU0FBUztBQUNYQyxjQUFNLGVBREs7QUFFWEMsY0FBU1YsUUFBUVcsSUFBUixDQUFhQyxPQUFiLENBQ1AscUJBRE8sRUFFUFQsY0FGTyxDQUFULFNBR0txQixRQUxNO0FBTVhYLGdCQUFRLFFBTkc7QUFPWEUsaUJBQVM7QUFDUCwwQkFBZ0Isa0JBRFQ7QUFFUEMscUNBQXlCLEtBQUtmLEtBQUwsQ0FBV2dCLFdBQVg7QUFGbEI7QUFQRSxPQUFiOztBQWFBLFdBQUtmLE9BQUwsQ0FBYWdCLFVBQWIsQ0FBd0JDLE9BQXhCLENBQWdDWCxNQUFoQyxFQUF3Q0gsUUFBeEM7QUFDRDs7Ozs7O2tCQUdZTCxPIiwiZmlsZSI6Ik1lbWJlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbmV4bW8gZnJvbSBcIi4vaW5kZXhcIjtcblxuaW1wb3J0IFV0aWxzIGZyb20gXCIuL1V0aWxzXCI7XG5cbi8qKlxuICogUHJvdmlkZXMgYWNjZXNzIHRvIHRoZSBgbWVtYmVyc2AgcmVzb3VyY2UuXG4gKi9cbmNsYXNzIE1lbWJlcnMge1xuICAvKipcbiAgICogVGhlIHBhdGggdG8gdGhlIGBtZW1iZXJzYCByZXNvdXJjZS5cbiAgICovXG4gIHN0YXRpYyBnZXQgUEFUSCgpIHtcbiAgICByZXR1cm4gXCIvYmV0YS9jb252ZXJzYXRpb25zL3tjb252ZXJzYXRpb25fdXVpZH0vbWVtYmVyc1wiO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgTWVtYmVycy5cbiAgICpcbiAgICogQHBhcmFtIHtDcmVkZW50aWFsc30gY3JlZHMgLSBDcmVkZW50aWFscyB1c2VkIHdoZW4gaW50ZXJhY3Rpbmcgd2l0aCB0aGUgTmV4bW8gQVBJLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGFkZGl0aW9uYWwgb3B0aW9ucyBmb3IgdGhlIGNsYXNzLlxuICAgKi9cbiAgY29uc3RydWN0b3IoY3JlZHMsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmNyZWRzID0gY3JlZHM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbWVtYmVyIGluIGEgY29udmVyc2F0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udmVyc2F0aW9uSWQgLSBUaGUgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSBjb252ZXJzYXRpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIFBhcmFtZXRlcnMgdXNlZCB3aGVuIGFkZGluZyBhIG1lbWJlciB0byB0aGUgY29udmVyc2F0aW9uLiBTZWUgaHR0cHM6Ly9lYS5kZXZlbG9wZXIubmV4bW8uY29tL2FwaS9jb252ZXJzYXRpb24jYWRkLWEtdXNlci10by1hLWNvbnZlcnNhdGlvbiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgcmVxdWVzdCBjb21wbGV0ZXMuXG4gICAqL1xuICBjcmVhdGUoY29udmVyc2F0aW9uSWQsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBwYXJhbXMgPSBKU09OLnN0cmluZ2lmeShwYXJhbXMpO1xuXG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgIGhvc3Q6IFwiYXBpLm5leG1vLmNvbVwiLFxuICAgICAgcGF0aDogTWVtYmVycy5QQVRILnJlcGxhY2UoXCJ7Y29udmVyc2F0aW9uX3V1aWR9XCIsIGNvbnZlcnNhdGlvbklkKSxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dGhpcy5jcmVkcy5nZW5lcmF0ZUp3dCgpfWBcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMub3B0aW9ucy5odHRwQ2xpZW50LnJlcXVlc3QoY29uZmlnLCBjYWxsYmFjayk7XG4gIH1cblxuICAvLyBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSB0byAyLjQuMC1iZXRhMS4gUmVtb3ZlIGZvciAzLjAuMFxuICBhZGQoY29udmVyc2F0aW9uSWQsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICB0aGlzLmNyZWF0ZShjb252ZXJzYXRpb25JZCwgcGFyYW1zLCBjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFuIGV4aXN0aW5nIG1lbWJlci5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnZlcnNhdGlvbklkIC0gVGhlIHVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgY29udmVyc2F0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gcXVlcnkgLSBUaGUgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSBtZW1iZXIgdG8gcmV0cmlldmVcbiAgICogICAgICAgICAgICAgICBvciBhIHNldCBvZiBmaWx0ZXIgcGFyYW1ldGVycyBmb3IgdGhlIHF1ZXJ5LiBGb3IgbW9yZSBpbmZvcm1hdGlvblxuICAgKiAgICAgICAgICAgICAgIHNlZSBodHRwczovL2VhLmRldmVsb3Blci5uZXhtby5jb20vYXBpL2NvbnZlcnNhdGlvbiNyZXRyaWV2ZS1tZW1iZXJzLW9mLWEtY29udmVyc2F0aW9uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIHJlcXVlc3QgY29tcGxldGVzLlxuICAgKi9cbiAgZ2V0KGNvbnZlcnNhdGlvbklkLCBxdWVyeSwgY2FsbGJhY2spIHtcbiAgICB2YXIgY29uZmlnID0ge1xuICAgICAgaG9zdDogXCJhcGkubmV4bW8uY29tXCIsXG4gICAgICBwYXRoOiBVdGlscy5jcmVhdGVQYXRoV2l0aFF1ZXJ5KFxuICAgICAgICBNZW1iZXJzLlBBVEgucmVwbGFjZShcIntjb252ZXJzYXRpb25fdXVpZH1cIiwgY29udmVyc2F0aW9uSWQpLFxuICAgICAgICBxdWVyeVxuICAgICAgKSxcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGJvZHk6IHVuZGVmaW5lZCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLmNyZWRzLmdlbmVyYXRlSnd0KCl9YFxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5vcHRpb25zLmh0dHBDbGllbnQucmVxdWVzdChjb25maWcsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgbWVtYmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udmVyc2F0aW9uSWQgLSBUaGUgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSBjb252ZXJzYXRpb24gdG8gdXBkYXRlIHRoZSBtZW1iZXIgaW4uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZW1iZXJJZCAtIFRoZSB1bmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIG1lbWJlciB0byB1cGRhdGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBQYXJhbWV0ZXJzIHVzZWQgd2hlbiB1cGRhdGluZyB0aGUgbWVtYmVyLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSByZXF1ZXN0IGNvbXBsZXRlcy5cbiAgICovXG4gIHVwZGF0ZShjb252ZXJzYXRpb25JZCwgbWVtYmVySWQsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBwYXJhbXMgPSBKU09OLnN0cmluZ2lmeShwYXJhbXMpO1xuXG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgIGhvc3Q6IFwiYXBpLm5leG1vLmNvbVwiLFxuICAgICAgcGF0aDogYCR7TWVtYmVycy5QQVRILnJlcGxhY2UoXG4gICAgICAgIFwie2NvbnZlcnNhdGlvbl91dWlkfVwiLFxuICAgICAgICBjb252ZXJzYXRpb25JZFxuICAgICAgKX0vJHttZW1iZXJJZH1gLFxuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3RoaXMuY3JlZHMuZ2VuZXJhdGVKd3QoKX1gXG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMub3B0aW9ucy5odHRwQ2xpZW50LnJlcXVlc3QoY29uZmlnLCBjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRhIGFuIGV4aXN0aW5nIG1lbWJlci5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnZlcnNhdGlvbklkLSBUaGUgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSBjb252ZXJzYXRpb24gdG8gZGVsZXRlIHRoZSBtZW1iZXIgZnJvbS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG1lbWJlcklkIC0gVGhlIHVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgbWVtYmVyIHRvIGRlbGV0ZS5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgcmVxdWVzdCBjb21wbGV0ZXMuXG4gICAqL1xuICBkZWxldGUoY29udmVyc2F0aW9uSWQsIG1lbWJlcklkLCBjYWxsYmFjaykge1xuICAgIHZhciBjb25maWcgPSB7XG4gICAgICBob3N0OiBcImFwaS5uZXhtby5jb21cIixcbiAgICAgIHBhdGg6IGAke01lbWJlcnMuUEFUSC5yZXBsYWNlKFxuICAgICAgICBcIntjb252ZXJzYXRpb25fdXVpZH1cIixcbiAgICAgICAgY29udmVyc2F0aW9uSWRcbiAgICAgICl9LyR7bWVtYmVySWR9YCxcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLmNyZWRzLmdlbmVyYXRlSnd0KCl9YFxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLm9wdGlvbnMuaHR0cENsaWVudC5yZXF1ZXN0KGNvbmZpZywgY2FsbGJhY2spO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lbWJlcnM7XG4iXX0=