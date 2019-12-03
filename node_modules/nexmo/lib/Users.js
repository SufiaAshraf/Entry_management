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
 * Provides access to the `users` endpoint.
 */
var Users = function () {
  _createClass(Users, null, [{
    key: "PATH",
    get: function get() {
      return "/beta/users";
    }

    /**
     * @param {Credentials} credentials
     *    credentials to be used when interacting with the API.
     * @param {Object} options
     *    Additional Users options.
     */

  }]);

  function Users(credentials) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Users);

    this.creds = credentials;
    this.options = options;
  }

  /**
   * Create a new user.
   *
   * @param {Object} params - Parameters used when creating the user. See https://ea.developer.nexmo.com/api/conversation#create-a-user for more information.
   * @param {function} callback - function to be called when the request completes.
   */


  _createClass(Users, [{
    key: "create",
    value: function create(params, callback) {
      params = JSON.stringify(params);

      var config = {
        host: "api.nexmo.com",
        path: Users.PATH,
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
     * Get an existing user.
     *
     * @param {string|object} query - The unique identifier for the user to retrieve
     *               or a set of filter parameters for the query. For more information
     *               see https://ea.developer.nexmo.com/api/conversation#retrieve-all-users
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: "get",
    value: function get(query, callback) {
      var config = {
        host: "api.nexmo.com",
        path: _Utils2.default.createPathWithQuery(Users.PATH, query),
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
     * Get an conversations for an existing user.
     *
     * @param {string} userId - The unique identifier for the user to retrieve conversations for
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: "getConversations",
    value: function getConversations(userId, callback) {
      var config = {
        host: "api.nexmo.com",
        path: Users.PATH + "/" + userId + "/conversations",
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
     * Update an existing user.
     *
     * @param {string} userId - The unique identifier for the user to update.
     * @param {Object} params - Parameters used when updating the conversation.
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: "update",
    value: function update(userId, params, callback) {
      params = JSON.stringify(params);

      var config = {
        host: "api.nexmo.com",
        path: Users.PATH + "/" + userId,
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
     * Deleta an existing user.
     *
     * @param {string} userId - The unique identifier for the user to delete.
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: "delete",
    value: function _delete(userId, callback) {
      var config = {
        host: "api.nexmo.com",
        path: Users.PATH + "/" + userId,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.creds.generateJwt()
        }
      };

      this.options.httpClient.request(config, callback);
    }
  }]);

  return Users;
}();

exports.default = Users;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Vc2Vycy5qcyJdLCJuYW1lcyI6WyJVc2VycyIsImNyZWRlbnRpYWxzIiwib3B0aW9ucyIsImNyZWRzIiwicGFyYW1zIiwiY2FsbGJhY2siLCJKU09OIiwic3RyaW5naWZ5IiwiY29uZmlnIiwiaG9zdCIsInBhdGgiLCJQQVRIIiwibWV0aG9kIiwiYm9keSIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiZ2VuZXJhdGVKd3QiLCJodHRwQ2xpZW50IiwicmVxdWVzdCIsInF1ZXJ5IiwiY3JlYXRlUGF0aFdpdGhRdWVyeSIsInVuZGVmaW5lZCIsInVzZXJJZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBRUE7Ozs7QUFFQTs7Ozs7Ozs7QUFFQTs7O0lBR01BLEs7Ozt3QkFDYztBQUNoQixhQUFPLGFBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7O0FBTUEsaUJBQVlDLFdBQVosRUFBdUM7QUFBQSxRQUFkQyxPQUFjLHVFQUFKLEVBQUk7O0FBQUE7O0FBQ3JDLFNBQUtDLEtBQUwsR0FBYUYsV0FBYjtBQUNBLFNBQUtDLE9BQUwsR0FBZUEsT0FBZjtBQUNEOztBQUVEOzs7Ozs7Ozs7OzJCQU1PRSxNLEVBQVFDLFEsRUFBVTtBQUN2QkQsZUFBU0UsS0FBS0MsU0FBTCxDQUFlSCxNQUFmLENBQVQ7O0FBRUEsVUFBSUksU0FBUztBQUNYQyxjQUFNLGVBREs7QUFFWEMsY0FBTVYsTUFBTVcsSUFGRDtBQUdYQyxnQkFBUSxNQUhHO0FBSVhDLGNBQU1ULE1BSks7QUFLWFUsaUJBQVM7QUFDUCwwQkFBZ0Isa0JBRFQ7QUFFUEMscUNBQXlCLEtBQUtaLEtBQUwsQ0FBV2EsV0FBWDtBQUZsQjtBQUxFLE9BQWI7QUFVQSxXQUFLZCxPQUFMLENBQWFlLFVBQWIsQ0FBd0JDLE9BQXhCLENBQWdDVixNQUFoQyxFQUF3Q0gsUUFBeEM7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7d0JBUUljLEssRUFBT2QsUSxFQUFVO0FBQ25CLFVBQUlHLFNBQVM7QUFDWEMsY0FBTSxlQURLO0FBRVhDLGNBQU0sZ0JBQU1VLG1CQUFOLENBQTBCcEIsTUFBTVcsSUFBaEMsRUFBc0NRLEtBQXRDLENBRks7QUFHWFAsZ0JBQVEsS0FIRztBQUlYQyxjQUFNUSxTQUpLO0FBS1hQLGlCQUFTO0FBQ1AsMEJBQWdCLGtCQURUO0FBRVBDLHFDQUF5QixLQUFLWixLQUFMLENBQVdhLFdBQVg7QUFGbEI7QUFMRSxPQUFiO0FBVUEsV0FBS2QsT0FBTCxDQUFhZSxVQUFiLENBQXdCQyxPQUF4QixDQUFnQ1YsTUFBaEMsRUFBd0NILFFBQXhDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7OztxQ0FNaUJpQixNLEVBQVFqQixRLEVBQVU7QUFDakMsVUFBSUcsU0FBUztBQUNYQyxjQUFNLGVBREs7QUFFWEMsY0FBU1YsTUFBTVcsSUFBZixTQUF1QlcsTUFBdkIsbUJBRlc7QUFHWFYsZ0JBQVEsS0FIRztBQUlYQyxjQUFNUSxTQUpLO0FBS1hQLGlCQUFTO0FBQ1AsMEJBQWdCLGtCQURUO0FBRVBDLHFDQUF5QixLQUFLWixLQUFMLENBQVdhLFdBQVg7QUFGbEI7QUFMRSxPQUFiO0FBVUEsV0FBS2QsT0FBTCxDQUFhZSxVQUFiLENBQXdCQyxPQUF4QixDQUFnQ1YsTUFBaEMsRUFBd0NILFFBQXhDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7MkJBT09pQixNLEVBQVFsQixNLEVBQVFDLFEsRUFBVTtBQUMvQkQsZUFBU0UsS0FBS0MsU0FBTCxDQUFlSCxNQUFmLENBQVQ7O0FBRUEsVUFBSUksU0FBUztBQUNYQyxjQUFNLGVBREs7QUFFWEMsY0FBU1YsTUFBTVcsSUFBZixTQUF1QlcsTUFGWjtBQUdYVixnQkFBUSxLQUhHO0FBSVhDLGNBQU1ULE1BSks7QUFLWFUsaUJBQVM7QUFDUCwwQkFBZ0Isa0JBRFQ7QUFFUEMscUNBQXlCLEtBQUtaLEtBQUwsQ0FBV2EsV0FBWDtBQUZsQjtBQUxFLE9BQWI7O0FBV0EsV0FBS2QsT0FBTCxDQUFhZSxVQUFiLENBQXdCQyxPQUF4QixDQUFnQ1YsTUFBaEMsRUFBd0NILFFBQXhDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs0QkFNT2lCLE0sRUFBUWpCLFEsRUFBVTtBQUN2QixVQUFJRyxTQUFTO0FBQ1hDLGNBQU0sZUFESztBQUVYQyxjQUFTVixNQUFNVyxJQUFmLFNBQXVCVyxNQUZaO0FBR1hWLGdCQUFRLFFBSEc7QUFJWEUsaUJBQVM7QUFDUCwwQkFBZ0Isa0JBRFQ7QUFFUEMscUNBQXlCLEtBQUtaLEtBQUwsQ0FBV2EsV0FBWDtBQUZsQjtBQUpFLE9BQWI7O0FBVUEsV0FBS2QsT0FBTCxDQUFhZSxVQUFiLENBQXdCQyxPQUF4QixDQUFnQ1YsTUFBaEMsRUFBd0NILFFBQXhDO0FBQ0Q7Ozs7OztrQkFHWUwsSyIsImZpbGUiOiJVc2Vycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgbmV4bW8gZnJvbSBcIi4vaW5kZXhcIjtcblxuaW1wb3J0IFV0aWxzIGZyb20gXCIuL1V0aWxzXCI7XG5cbi8qKlxuICogUHJvdmlkZXMgYWNjZXNzIHRvIHRoZSBgdXNlcnNgIGVuZHBvaW50LlxuICovXG5jbGFzcyBVc2VycyB7XG4gIHN0YXRpYyBnZXQgUEFUSCgpIHtcbiAgICByZXR1cm4gXCIvYmV0YS91c2Vyc1wiO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q3JlZGVudGlhbHN9IGNyZWRlbnRpYWxzXG4gICAqICAgIGNyZWRlbnRpYWxzIHRvIGJlIHVzZWQgd2hlbiBpbnRlcmFjdGluZyB3aXRoIHRoZSBBUEkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqICAgIEFkZGl0aW9uYWwgVXNlcnMgb3B0aW9ucy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGNyZWRlbnRpYWxzLCBvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmNyZWRzID0gY3JlZGVudGlhbHM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgdXNlci5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIFBhcmFtZXRlcnMgdXNlZCB3aGVuIGNyZWF0aW5nIHRoZSB1c2VyLiBTZWUgaHR0cHM6Ly9lYS5kZXZlbG9wZXIubmV4bW8uY29tL2FwaS9jb252ZXJzYXRpb24jY3JlYXRlLWEtdXNlciBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgcmVxdWVzdCBjb21wbGV0ZXMuXG4gICAqL1xuICBjcmVhdGUocGFyYW1zLCBjYWxsYmFjaykge1xuICAgIHBhcmFtcyA9IEpTT04uc3RyaW5naWZ5KHBhcmFtcyk7XG5cbiAgICB2YXIgY29uZmlnID0ge1xuICAgICAgaG9zdDogXCJhcGkubmV4bW8uY29tXCIsXG4gICAgICBwYXRoOiBVc2Vycy5QQVRILFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLmNyZWRzLmdlbmVyYXRlSnd0KCl9YFxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5vcHRpb25zLmh0dHBDbGllbnQucmVxdWVzdChjb25maWcsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYW4gZXhpc3RpbmcgdXNlci5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSBxdWVyeSAtIFRoZSB1bmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIHVzZXIgdG8gcmV0cmlldmVcbiAgICogICAgICAgICAgICAgICBvciBhIHNldCBvZiBmaWx0ZXIgcGFyYW1ldGVycyBmb3IgdGhlIHF1ZXJ5LiBGb3IgbW9yZSBpbmZvcm1hdGlvblxuICAgKiAgICAgICAgICAgICAgIHNlZSBodHRwczovL2VhLmRldmVsb3Blci5uZXhtby5jb20vYXBpL2NvbnZlcnNhdGlvbiNyZXRyaWV2ZS1hbGwtdXNlcnNcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgcmVxdWVzdCBjb21wbGV0ZXMuXG4gICAqL1xuICBnZXQocXVlcnksIGNhbGxiYWNrKSB7XG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgIGhvc3Q6IFwiYXBpLm5leG1vLmNvbVwiLFxuICAgICAgcGF0aDogVXRpbHMuY3JlYXRlUGF0aFdpdGhRdWVyeShVc2Vycy5QQVRILCBxdWVyeSksXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICBib2R5OiB1bmRlZmluZWQsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dGhpcy5jcmVkcy5nZW5lcmF0ZUp3dCgpfWBcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMub3B0aW9ucy5odHRwQ2xpZW50LnJlcXVlc3QoY29uZmlnLCBjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFuIGNvbnZlcnNhdGlvbnMgZm9yIGFuIGV4aXN0aW5nIHVzZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySWQgLSBUaGUgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSB1c2VyIHRvIHJldHJpZXZlIGNvbnZlcnNhdGlvbnMgZm9yXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIHJlcXVlc3QgY29tcGxldGVzLlxuICAgKi9cbiAgZ2V0Q29udmVyc2F0aW9ucyh1c2VySWQsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgIGhvc3Q6IFwiYXBpLm5leG1vLmNvbVwiLFxuICAgICAgcGF0aDogYCR7VXNlcnMuUEFUSH0vJHt1c2VySWR9L2NvbnZlcnNhdGlvbnNgLFxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgYm9keTogdW5kZWZpbmVkLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3RoaXMuY3JlZHMuZ2VuZXJhdGVKd3QoKX1gXG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLm9wdGlvbnMuaHR0cENsaWVudC5yZXF1ZXN0KGNvbmZpZywgY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhbiBleGlzdGluZyB1c2VyLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklkIC0gVGhlIHVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgdXNlciB0byB1cGRhdGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBQYXJhbWV0ZXJzIHVzZWQgd2hlbiB1cGRhdGluZyB0aGUgY29udmVyc2F0aW9uLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSByZXF1ZXN0IGNvbXBsZXRlcy5cbiAgICovXG4gIHVwZGF0ZSh1c2VySWQsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBwYXJhbXMgPSBKU09OLnN0cmluZ2lmeShwYXJhbXMpO1xuXG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgIGhvc3Q6IFwiYXBpLm5leG1vLmNvbVwiLFxuICAgICAgcGF0aDogYCR7VXNlcnMuUEFUSH0vJHt1c2VySWR9YCxcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLmNyZWRzLmdlbmVyYXRlSnd0KCl9YFxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLm9wdGlvbnMuaHR0cENsaWVudC5yZXF1ZXN0KGNvbmZpZywgY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0YSBhbiBleGlzdGluZyB1c2VyLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklkIC0gVGhlIHVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgdXNlciB0byBkZWxldGUuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIHJlcXVlc3QgY29tcGxldGVzLlxuICAgKi9cbiAgZGVsZXRlKHVzZXJJZCwgY2FsbGJhY2spIHtcbiAgICB2YXIgY29uZmlnID0ge1xuICAgICAgaG9zdDogXCJhcGkubmV4bW8uY29tXCIsXG4gICAgICBwYXRoOiBgJHtVc2Vycy5QQVRIfS8ke3VzZXJJZH1gLFxuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3RoaXMuY3JlZHMuZ2VuZXJhdGVKd3QoKX1gXG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMub3B0aW9ucy5odHRwQ2xpZW50LnJlcXVlc3QoY29uZmlnLCBjYWxsYmFjayk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVXNlcnM7XG4iXX0=