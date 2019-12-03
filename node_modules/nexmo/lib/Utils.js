"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var querystring = require("querystring");

exports.createPathWithQuery = function (path, query) {
  if (!query) {
    throw new Error('"query" is a required parameter');
  }

  var pathExt = "";
  if (typeof query === "string") {
    // single call Id
    pathExt = "/" + query;
  } else if ((typeof query === "undefined" ? "undefined" : _typeof(query)) === "object" && Object.keys(query).length > 0) {
    // filter
    pathExt = "?" + querystring.stringify(query);
  }

  return "" + path + pathExt;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9VdGlscy5qcyJdLCJuYW1lcyI6WyJxdWVyeXN0cmluZyIsInJlcXVpcmUiLCJleHBvcnRzIiwiY3JlYXRlUGF0aFdpdGhRdWVyeSIsInBhdGgiLCJxdWVyeSIsIkVycm9yIiwicGF0aEV4dCIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFJQSxjQUFjQyxRQUFRLGFBQVIsQ0FBbEI7O0FBRUFDLFFBQVFDLG1CQUFSLEdBQThCLFVBQVNDLElBQVQsRUFBZUMsS0FBZixFQUFzQjtBQUNsRCxNQUFJLENBQUNBLEtBQUwsRUFBWTtBQUNWLFVBQU0sSUFBSUMsS0FBSixDQUFVLGlDQUFWLENBQU47QUFDRDs7QUFFRCxNQUFJQyxVQUFVLEVBQWQ7QUFDQSxNQUFJLE9BQU9GLEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDN0I7QUFDQUUsb0JBQWNGLEtBQWQ7QUFDRCxHQUhELE1BR08sSUFBSSxRQUFPQSxLQUFQLHlDQUFPQSxLQUFQLE9BQWlCLFFBQWpCLElBQTZCRyxPQUFPQyxJQUFQLENBQVlKLEtBQVosRUFBbUJLLE1BQW5CLEdBQTRCLENBQTdELEVBQWdFO0FBQ3JFO0FBQ0FILG9CQUFjUCxZQUFZVyxTQUFaLENBQXNCTixLQUF0QixDQUFkO0FBQ0Q7O0FBRUQsY0FBVUQsSUFBVixHQUFpQkcsT0FBakI7QUFDRCxDQWZEIiwiZmlsZSI6IlV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHF1ZXJ5c3RyaW5nID0gcmVxdWlyZShcInF1ZXJ5c3RyaW5nXCIpO1xuXG5leHBvcnRzLmNyZWF0ZVBhdGhXaXRoUXVlcnkgPSBmdW5jdGlvbihwYXRoLCBxdWVyeSkge1xuICBpZiAoIXF1ZXJ5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdcInF1ZXJ5XCIgaXMgYSByZXF1aXJlZCBwYXJhbWV0ZXInKTtcbiAgfVxuXG4gIHZhciBwYXRoRXh0ID0gXCJcIjtcbiAgaWYgKHR5cGVvZiBxdWVyeSA9PT0gXCJzdHJpbmdcIikge1xuICAgIC8vIHNpbmdsZSBjYWxsIElkXG4gICAgcGF0aEV4dCA9IGAvJHtxdWVyeX1gO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBxdWVyeSA9PT0gXCJvYmplY3RcIiAmJiBPYmplY3Qua2V5cyhxdWVyeSkubGVuZ3RoID4gMCkge1xuICAgIC8vIGZpbHRlclxuICAgIHBhdGhFeHQgPSBgPyR7cXVlcnlzdHJpbmcuc3RyaW5naWZ5KHF1ZXJ5KX1gO1xuICB9XG5cbiAgcmV0dXJuIGAke3BhdGh9JHtwYXRoRXh0fWA7XG59O1xuIl19