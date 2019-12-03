"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var crypto = require("crypto");

var HashGenerator = function () {
  function HashGenerator() {
    _classCallCheck(this, HashGenerator);
  }

  _createClass(HashGenerator, [{
    key: "generate",

    /**
     * Generate a Signature Hash.
     *
     * @param {String} method - the method to be used when creating the hash
     * @param {String} secret - the secret to be used when creating the hash
     * @param {Object} params - params to generate hash from
     *
     * @returns {String} the generated token
     */
    value: function generate(method, secret, params) {
      params = params || {};
      var signedQuery = "";

      params = JSON.parse(JSON.stringify(params));

      if (params.sig) {
        delete params.sig;
      }

      Object.keys(params).sort().forEach(function (key) {
        // replace & and = with _
        signedQuery += "&" + key + "=" + params[key].replace(/\&|\=/g, "_");
      });

      var hash = "";

      switch (method) {
        case "md5hash":
          signedQuery += secret;
          hash = crypto.createHash("md5").update(signedQuery).digest("hex");
          break;
        case "md5":
        case "sha1":
        case "sha256":
        case "sha512":
          hash = crypto.createHmac(method, secret).update(signedQuery).digest("hex");
          break;

        default:
          throw "Unknown signature algorithm: " + method + ". Expected: md5hash, md5, sha1, sha256, or sha512";
      }

      return hash;
    }
  }]);

  return HashGenerator;
}();

module.exports = HashGenerator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9IYXNoR2VuZXJhdG9yLmpzIl0sIm5hbWVzIjpbImNyeXB0byIsInJlcXVpcmUiLCJIYXNoR2VuZXJhdG9yIiwibWV0aG9kIiwic2VjcmV0IiwicGFyYW1zIiwic2lnbmVkUXVlcnkiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJzaWciLCJPYmplY3QiLCJrZXlzIiwic29ydCIsImZvckVhY2giLCJrZXkiLCJyZXBsYWNlIiwiaGFzaCIsImNyZWF0ZUhhc2giLCJ1cGRhdGUiLCJkaWdlc3QiLCJjcmVhdGVIbWFjIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTUEsU0FBU0MsUUFBUSxRQUFSLENBQWY7O0lBRU1DLGE7Ozs7Ozs7O0FBQ0o7Ozs7Ozs7Ozs2QkFTU0MsTSxFQUFRQyxNLEVBQVFDLE0sRUFBUTtBQUMvQkEsZUFBU0EsVUFBVSxFQUFuQjtBQUNBLFVBQUlDLGNBQWMsRUFBbEI7O0FBRUFELGVBQVNFLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsU0FBTCxDQUFlSixNQUFmLENBQVgsQ0FBVDs7QUFFQSxVQUFJQSxPQUFPSyxHQUFYLEVBQWdCO0FBQ2QsZUFBT0wsT0FBT0ssR0FBZDtBQUNEOztBQUVEQyxhQUFPQyxJQUFQLENBQVlQLE1BQVosRUFDR1EsSUFESCxHQUVHQyxPQUZILENBRVcsZUFBTztBQUNkO0FBQ0FSLHVCQUFlLE1BQU1TLEdBQU4sR0FBWSxHQUFaLEdBQWtCVixPQUFPVSxHQUFQLEVBQVlDLE9BQVosQ0FBb0IsUUFBcEIsRUFBOEIsR0FBOUIsQ0FBakM7QUFDRCxPQUxIOztBQU9BLFVBQUlDLE9BQU8sRUFBWDs7QUFFQSxjQUFRZCxNQUFSO0FBQ0UsYUFBSyxTQUFMO0FBQ0VHLHlCQUFlRixNQUFmO0FBQ0FhLGlCQUFPakIsT0FDSmtCLFVBREksQ0FDTyxLQURQLEVBRUpDLE1BRkksQ0FFR2IsV0FGSCxFQUdKYyxNQUhJLENBR0csS0FISCxDQUFQO0FBSUE7QUFDRixhQUFLLEtBQUw7QUFDQSxhQUFLLE1BQUw7QUFDQSxhQUFLLFFBQUw7QUFDQSxhQUFLLFFBQUw7QUFDRUgsaUJBQU9qQixPQUNKcUIsVUFESSxDQUNPbEIsTUFEUCxFQUNlQyxNQURmLEVBRUplLE1BRkksQ0FFR2IsV0FGSCxFQUdKYyxNQUhJLENBR0csS0FISCxDQUFQO0FBSUE7O0FBRUY7QUFDRSxrREFBc0NqQixNQUF0QztBQW5CSjs7QUFzQkEsYUFBT2MsSUFBUDtBQUNEOzs7Ozs7QUFHSEssT0FBT0MsT0FBUCxHQUFpQnJCLGFBQWpCIiwiZmlsZSI6Ikhhc2hHZW5lcmF0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjcnlwdG8gPSByZXF1aXJlKFwiY3J5cHRvXCIpO1xuXG5jbGFzcyBIYXNoR2VuZXJhdG9yIHtcbiAgLyoqXG4gICAqIEdlbmVyYXRlIGEgU2lnbmF0dXJlIEhhc2guXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2QgLSB0aGUgbWV0aG9kIHRvIGJlIHVzZWQgd2hlbiBjcmVhdGluZyB0aGUgaGFzaFxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VjcmV0IC0gdGhlIHNlY3JldCB0byBiZSB1c2VkIHdoZW4gY3JlYXRpbmcgdGhlIGhhc2hcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIHBhcmFtcyB0byBnZW5lcmF0ZSBoYXNoIGZyb21cbiAgICpcbiAgICogQHJldHVybnMge1N0cmluZ30gdGhlIGdlbmVyYXRlZCB0b2tlblxuICAgKi9cbiAgZ2VuZXJhdGUobWV0aG9kLCBzZWNyZXQsIHBhcmFtcykge1xuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcbiAgICB2YXIgc2lnbmVkUXVlcnkgPSBcIlwiO1xuXG4gICAgcGFyYW1zID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShwYXJhbXMpKTtcblxuICAgIGlmIChwYXJhbXMuc2lnKSB7XG4gICAgICBkZWxldGUgcGFyYW1zLnNpZztcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyhwYXJhbXMpXG4gICAgICAuc29ydCgpXG4gICAgICAuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAvLyByZXBsYWNlICYgYW5kID0gd2l0aCBfXG4gICAgICAgIHNpZ25lZFF1ZXJ5ICs9IFwiJlwiICsga2V5ICsgXCI9XCIgKyBwYXJhbXNba2V5XS5yZXBsYWNlKC9cXCZ8XFw9L2csIFwiX1wiKTtcbiAgICAgIH0pO1xuXG4gICAgdmFyIGhhc2ggPSBcIlwiO1xuXG4gICAgc3dpdGNoIChtZXRob2QpIHtcbiAgICAgIGNhc2UgXCJtZDVoYXNoXCI6XG4gICAgICAgIHNpZ25lZFF1ZXJ5ICs9IHNlY3JldDtcbiAgICAgICAgaGFzaCA9IGNyeXB0b1xuICAgICAgICAgIC5jcmVhdGVIYXNoKFwibWQ1XCIpXG4gICAgICAgICAgLnVwZGF0ZShzaWduZWRRdWVyeSlcbiAgICAgICAgICAuZGlnZXN0KFwiaGV4XCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJtZDVcIjpcbiAgICAgIGNhc2UgXCJzaGExXCI6XG4gICAgICBjYXNlIFwic2hhMjU2XCI6XG4gICAgICBjYXNlIFwic2hhNTEyXCI6XG4gICAgICAgIGhhc2ggPSBjcnlwdG9cbiAgICAgICAgICAuY3JlYXRlSG1hYyhtZXRob2QsIHNlY3JldClcbiAgICAgICAgICAudXBkYXRlKHNpZ25lZFF1ZXJ5KVxuICAgICAgICAgIC5kaWdlc3QoXCJoZXhcIik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBgVW5rbm93biBzaWduYXR1cmUgYWxnb3JpdGhtOiAke21ldGhvZH0uIEV4cGVjdGVkOiBtZDVoYXNoLCBtZDUsIHNoYTEsIHNoYTI1Niwgb3Igc2hhNTEyYDtcbiAgICB9XG5cbiAgICByZXR1cm4gaGFzaDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhhc2hHZW5lcmF0b3I7XG4iXX0=