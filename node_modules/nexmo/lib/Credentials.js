"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _JwtGenerator = require("./JwtGenerator");

var _JwtGenerator2 = _interopRequireDefault(_JwtGenerator);

var _HashGenerator = require("./HashGenerator");

var _HashGenerator2 = _interopRequireDefault(_HashGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Right now only key/secret credentials are supported.
 * However, in time JWT will also be supported.
 * The `Credentials` object provides an abstraction to this.
 *
 * @param {string} apiKey - A Nexmo API Key
 * @param {string} apiSecret - A Nexmo API Secret
 * @param {string} [applicationId] - A Nexmo Application ID
 * @param {string|Buffer} [privateKey] -  When a string value is passed it should
 *                        either represent the path to the private key, or the actual
 *                        private key in string format. If a Buffer is passed then
 *                        it should be the key read from the file system.
 * @param {string} [signatureSecret] - A Nexmo signature Secret
 * @param {string} [signatureMethod] - A Nexmo compatible request signing method
 */
var Credentials = function () {
  function Credentials(apiKey, apiSecret, privateKey, applicationId, signatureSecret, signatureMethod) {
    _classCallCheck(this, Credentials);

    this.apiKey = apiKey;
    this.apiSecret = apiSecret;

    this.privateKey = null;
    this.applicationId = applicationId;

    this.signatureSecret = signatureSecret;
    this.signatureMethod = signatureMethod;

    if (privateKey instanceof Buffer) {
      this.privateKey = privateKey;
    } else if (typeof privateKey === "string" && privateKey.startsWith("-----BEGIN PRIVATE KEY-----")) {
      this.privateKey = new Buffer(privateKey);
    } else if (privateKey !== undefined) {
      if (!_fs2.default.existsSync(privateKey)) {
        throw new Error("File \"" + privateKey + "\" not found.");
      }
      this.privateKey = _fs2.default.readFileSync(privateKey);
    }

    /** @private */
    this._jwtGenerator = new _JwtGenerator2.default();
    this._hashGenerator = new _HashGenerator2.default();
  }

  /**
   * Generate a Jwt using the Private Key in the Credentials.
   * By default the credentials.applicationId will be used when creating the token.
   * However, this can be overwritten.
   *
   * @param {string} [applicationId] an application ID to be used instead of the
   *                default Credentials.applicationId value.
   *
   * @returns {string} The generated JWT
   */


  _createClass(Credentials, [{
    key: "generateJwt",
    value: function generateJwt() {
      var applicationId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.applicationId;
      var privateKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.privateKey;

      var claims = {
        application_id: applicationId
      };
      var token = this._jwtGenerator.generate(privateKey, claims);
      return token;
    }
  }, {
    key: "generateSignature",
    value: function generateSignature(params) {
      var signatureSecret = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.signatureSecret;
      var signatureMethod = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.signatureMethod;

      return this._hashGenerator.generate(signatureMethod, signatureSecret, params);
    }

    /**
     * @private
     * Used for testing purposes only.
     */

  }, {
    key: "_setJwtGenerator",
    value: function _setJwtGenerator(generator) {
      this._jwtGenerator = generator;
    }

    /**
     * @private
     * Used for testing purposes only.
     */

  }, {
    key: "_setHashGenerator",
    value: function _setHashGenerator(generator) {
      this._hashGenerator = generator;
    }

    /**
     * Ensures a credentials instance is used.
     *
     * Key/Secret credentials are only supported at present.
     */

  }], [{
    key: "parse",
    value: function parse(obj) {
      if (obj instanceof Credentials) {
        return obj;
      } else {
        return new Credentials(obj.apiKey, obj.apiSecret, obj.privateKey, obj.applicationId, obj.signatureSecret, obj.signatureMethod);
      }
    }
  }]);

  return Credentials;
}();

exports.default = Credentials;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DcmVkZW50aWFscy5qcyJdLCJuYW1lcyI6WyJDcmVkZW50aWFscyIsImFwaUtleSIsImFwaVNlY3JldCIsInByaXZhdGVLZXkiLCJhcHBsaWNhdGlvbklkIiwic2lnbmF0dXJlU2VjcmV0Iiwic2lnbmF0dXJlTWV0aG9kIiwiQnVmZmVyIiwic3RhcnRzV2l0aCIsInVuZGVmaW5lZCIsImV4aXN0c1N5bmMiLCJFcnJvciIsInJlYWRGaWxlU3luYyIsIl9qd3RHZW5lcmF0b3IiLCJfaGFzaEdlbmVyYXRvciIsImNsYWltcyIsImFwcGxpY2F0aW9uX2lkIiwidG9rZW4iLCJnZW5lcmF0ZSIsInBhcmFtcyIsImdlbmVyYXRvciIsIm9iaiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7SUFlTUEsVztBQUNKLHVCQUNFQyxNQURGLEVBRUVDLFNBRkYsRUFHRUMsVUFIRixFQUlFQyxhQUpGLEVBS0VDLGVBTEYsRUFNRUMsZUFORixFQU9FO0FBQUE7O0FBQ0EsU0FBS0wsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQkEsU0FBakI7O0FBRUEsU0FBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUJBLGFBQXJCOztBQUVBLFNBQUtDLGVBQUwsR0FBdUJBLGVBQXZCO0FBQ0EsU0FBS0MsZUFBTCxHQUF1QkEsZUFBdkI7O0FBRUEsUUFBSUgsc0JBQXNCSSxNQUExQixFQUFrQztBQUNoQyxXQUFLSixVQUFMLEdBQWtCQSxVQUFsQjtBQUNELEtBRkQsTUFFTyxJQUNMLE9BQU9BLFVBQVAsS0FBc0IsUUFBdEIsSUFDQUEsV0FBV0ssVUFBWCxDQUFzQiw2QkFBdEIsQ0FGSyxFQUdMO0FBQ0EsV0FBS0wsVUFBTCxHQUFrQixJQUFJSSxNQUFKLENBQVdKLFVBQVgsQ0FBbEI7QUFDRCxLQUxNLE1BS0EsSUFBSUEsZUFBZU0sU0FBbkIsRUFBOEI7QUFDbkMsVUFBSSxDQUFDLGFBQUdDLFVBQUgsQ0FBY1AsVUFBZCxDQUFMLEVBQWdDO0FBQzlCLGNBQU0sSUFBSVEsS0FBSixhQUFtQlIsVUFBbkIsbUJBQU47QUFDRDtBQUNELFdBQUtBLFVBQUwsR0FBa0IsYUFBR1MsWUFBSCxDQUFnQlQsVUFBaEIsQ0FBbEI7QUFDRDs7QUFFRDtBQUNBLFNBQUtVLGFBQUwsR0FBcUIsNEJBQXJCO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQiw2QkFBdEI7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7a0NBYUU7QUFBQSxVQUZBVixhQUVBLHVFQUZnQixLQUFLQSxhQUVyQjtBQUFBLFVBREFELFVBQ0EsdUVBRGEsS0FBS0EsVUFDbEI7O0FBQ0EsVUFBSVksU0FBUztBQUNYQyx3QkFBZ0JaO0FBREwsT0FBYjtBQUdBLFVBQUlhLFFBQVEsS0FBS0osYUFBTCxDQUFtQkssUUFBbkIsQ0FBNEJmLFVBQTVCLEVBQXdDWSxNQUF4QyxDQUFaO0FBQ0EsYUFBT0UsS0FBUDtBQUNEOzs7c0NBR0NFLE0sRUFHQTtBQUFBLFVBRkFkLGVBRUEsdUVBRmtCLEtBQUtBLGVBRXZCO0FBQUEsVUFEQUMsZUFDQSx1RUFEa0IsS0FBS0EsZUFDdkI7O0FBQ0EsYUFBTyxLQUFLUSxjQUFMLENBQW9CSSxRQUFwQixDQUNMWixlQURLLEVBRUxELGVBRkssRUFHTGMsTUFISyxDQUFQO0FBS0Q7O0FBRUQ7Ozs7Ozs7cUNBSWlCQyxTLEVBQVc7QUFDMUIsV0FBS1AsYUFBTCxHQUFxQk8sU0FBckI7QUFDRDs7QUFFRDs7Ozs7OztzQ0FJa0JBLFMsRUFBVztBQUMzQixXQUFLTixjQUFMLEdBQXNCTSxTQUF0QjtBQUNEOztBQUVEOzs7Ozs7OzswQkFLYUMsRyxFQUFLO0FBQ2hCLFVBQUlBLGVBQWVyQixXQUFuQixFQUFnQztBQUM5QixlQUFPcUIsR0FBUDtBQUNELE9BRkQsTUFFTztBQUNMLGVBQU8sSUFBSXJCLFdBQUosQ0FDTHFCLElBQUlwQixNQURDLEVBRUxvQixJQUFJbkIsU0FGQyxFQUdMbUIsSUFBSWxCLFVBSEMsRUFJTGtCLElBQUlqQixhQUpDLEVBS0xpQixJQUFJaEIsZUFMQyxFQU1MZ0IsSUFBSWYsZUFOQyxDQUFQO0FBUUQ7QUFDRjs7Ozs7O2tCQUdZTixXIiwiZmlsZSI6IkNyZWRlbnRpYWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCBKd3RHZW5lcmF0b3IgZnJvbSBcIi4vSnd0R2VuZXJhdG9yXCI7XG5pbXBvcnQgSGFzaEdlbmVyYXRvciBmcm9tIFwiLi9IYXNoR2VuZXJhdG9yXCI7XG5cbi8qKlxuICogUmlnaHQgbm93IG9ubHkga2V5L3NlY3JldCBjcmVkZW50aWFscyBhcmUgc3VwcG9ydGVkLlxuICogSG93ZXZlciwgaW4gdGltZSBKV1Qgd2lsbCBhbHNvIGJlIHN1cHBvcnRlZC5cbiAqIFRoZSBgQ3JlZGVudGlhbHNgIG9iamVjdCBwcm92aWRlcyBhbiBhYnN0cmFjdGlvbiB0byB0aGlzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBhcGlLZXkgLSBBIE5leG1vIEFQSSBLZXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBhcGlTZWNyZXQgLSBBIE5leG1vIEFQSSBTZWNyZXRcbiAqIEBwYXJhbSB7c3RyaW5nfSBbYXBwbGljYXRpb25JZF0gLSBBIE5leG1vIEFwcGxpY2F0aW9uIElEXG4gKiBAcGFyYW0ge3N0cmluZ3xCdWZmZXJ9IFtwcml2YXRlS2V5XSAtICBXaGVuIGEgc3RyaW5nIHZhbHVlIGlzIHBhc3NlZCBpdCBzaG91bGRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgZWl0aGVyIHJlcHJlc2VudCB0aGUgcGF0aCB0byB0aGUgcHJpdmF0ZSBrZXksIG9yIHRoZSBhY3R1YWxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgcHJpdmF0ZSBrZXkgaW4gc3RyaW5nIGZvcm1hdC4gSWYgYSBCdWZmZXIgaXMgcGFzc2VkIHRoZW5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgaXQgc2hvdWxkIGJlIHRoZSBrZXkgcmVhZCBmcm9tIHRoZSBmaWxlIHN5c3RlbS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2lnbmF0dXJlU2VjcmV0XSAtIEEgTmV4bW8gc2lnbmF0dXJlIFNlY3JldFxuICogQHBhcmFtIHtzdHJpbmd9IFtzaWduYXR1cmVNZXRob2RdIC0gQSBOZXhtbyBjb21wYXRpYmxlIHJlcXVlc3Qgc2lnbmluZyBtZXRob2RcbiAqL1xuY2xhc3MgQ3JlZGVudGlhbHMge1xuICBjb25zdHJ1Y3RvcihcbiAgICBhcGlLZXksXG4gICAgYXBpU2VjcmV0LFxuICAgIHByaXZhdGVLZXksXG4gICAgYXBwbGljYXRpb25JZCxcbiAgICBzaWduYXR1cmVTZWNyZXQsXG4gICAgc2lnbmF0dXJlTWV0aG9kXG4gICkge1xuICAgIHRoaXMuYXBpS2V5ID0gYXBpS2V5O1xuICAgIHRoaXMuYXBpU2VjcmV0ID0gYXBpU2VjcmV0O1xuXG4gICAgdGhpcy5wcml2YXRlS2V5ID0gbnVsbDtcbiAgICB0aGlzLmFwcGxpY2F0aW9uSWQgPSBhcHBsaWNhdGlvbklkO1xuXG4gICAgdGhpcy5zaWduYXR1cmVTZWNyZXQgPSBzaWduYXR1cmVTZWNyZXQ7XG4gICAgdGhpcy5zaWduYXR1cmVNZXRob2QgPSBzaWduYXR1cmVNZXRob2Q7XG5cbiAgICBpZiAocHJpdmF0ZUtleSBpbnN0YW5jZW9mIEJ1ZmZlcikge1xuICAgICAgdGhpcy5wcml2YXRlS2V5ID0gcHJpdmF0ZUtleTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdHlwZW9mIHByaXZhdGVLZXkgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgIHByaXZhdGVLZXkuc3RhcnRzV2l0aChcIi0tLS0tQkVHSU4gUFJJVkFURSBLRVktLS0tLVwiKVxuICAgICkge1xuICAgICAgdGhpcy5wcml2YXRlS2V5ID0gbmV3IEJ1ZmZlcihwcml2YXRlS2V5KTtcbiAgICB9IGVsc2UgaWYgKHByaXZhdGVLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKHByaXZhdGVLZXkpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgRmlsZSBcIiR7cHJpdmF0ZUtleX1cIiBub3QgZm91bmQuYCk7XG4gICAgICB9XG4gICAgICB0aGlzLnByaXZhdGVLZXkgPSBmcy5yZWFkRmlsZVN5bmMocHJpdmF0ZUtleSk7XG4gICAgfVxuXG4gICAgLyoqIEBwcml2YXRlICovXG4gICAgdGhpcy5fand0R2VuZXJhdG9yID0gbmV3IEp3dEdlbmVyYXRvcigpO1xuICAgIHRoaXMuX2hhc2hHZW5lcmF0b3IgPSBuZXcgSGFzaEdlbmVyYXRvcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGEgSnd0IHVzaW5nIHRoZSBQcml2YXRlIEtleSBpbiB0aGUgQ3JlZGVudGlhbHMuXG4gICAqIEJ5IGRlZmF1bHQgdGhlIGNyZWRlbnRpYWxzLmFwcGxpY2F0aW9uSWQgd2lsbCBiZSB1c2VkIHdoZW4gY3JlYXRpbmcgdGhlIHRva2VuLlxuICAgKiBIb3dldmVyLCB0aGlzIGNhbiBiZSBvdmVyd3JpdHRlbi5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IFthcHBsaWNhdGlvbklkXSBhbiBhcHBsaWNhdGlvbiBJRCB0byBiZSB1c2VkIGluc3RlYWQgb2YgdGhlXG4gICAqICAgICAgICAgICAgICAgIGRlZmF1bHQgQ3JlZGVudGlhbHMuYXBwbGljYXRpb25JZCB2YWx1ZS5cbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gVGhlIGdlbmVyYXRlZCBKV1RcbiAgICovXG4gIGdlbmVyYXRlSnd0KFxuICAgIGFwcGxpY2F0aW9uSWQgPSB0aGlzLmFwcGxpY2F0aW9uSWQsXG4gICAgcHJpdmF0ZUtleSA9IHRoaXMucHJpdmF0ZUtleVxuICApIHtcbiAgICB2YXIgY2xhaW1zID0ge1xuICAgICAgYXBwbGljYXRpb25faWQ6IGFwcGxpY2F0aW9uSWRcbiAgICB9O1xuICAgIHZhciB0b2tlbiA9IHRoaXMuX2p3dEdlbmVyYXRvci5nZW5lcmF0ZShwcml2YXRlS2V5LCBjbGFpbXMpO1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIGdlbmVyYXRlU2lnbmF0dXJlKFxuICAgIHBhcmFtcyxcbiAgICBzaWduYXR1cmVTZWNyZXQgPSB0aGlzLnNpZ25hdHVyZVNlY3JldCxcbiAgICBzaWduYXR1cmVNZXRob2QgPSB0aGlzLnNpZ25hdHVyZU1ldGhvZFxuICApIHtcbiAgICByZXR1cm4gdGhpcy5faGFzaEdlbmVyYXRvci5nZW5lcmF0ZShcbiAgICAgIHNpZ25hdHVyZU1ldGhvZCxcbiAgICAgIHNpZ25hdHVyZVNlY3JldCxcbiAgICAgIHBhcmFtc1xuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogVXNlZCBmb3IgdGVzdGluZyBwdXJwb3NlcyBvbmx5LlxuICAgKi9cbiAgX3NldEp3dEdlbmVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICB0aGlzLl9qd3RHZW5lcmF0b3IgPSBnZW5lcmF0b3I7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogVXNlZCBmb3IgdGVzdGluZyBwdXJwb3NlcyBvbmx5LlxuICAgKi9cbiAgX3NldEhhc2hHZW5lcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgdGhpcy5faGFzaEdlbmVyYXRvciA9IGdlbmVyYXRvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbnN1cmVzIGEgY3JlZGVudGlhbHMgaW5zdGFuY2UgaXMgdXNlZC5cbiAgICpcbiAgICogS2V5L1NlY3JldCBjcmVkZW50aWFscyBhcmUgb25seSBzdXBwb3J0ZWQgYXQgcHJlc2VudC5cbiAgICovXG4gIHN0YXRpYyBwYXJzZShvYmopIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgQ3JlZGVudGlhbHMpIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgQ3JlZGVudGlhbHMoXG4gICAgICAgIG9iai5hcGlLZXksXG4gICAgICAgIG9iai5hcGlTZWNyZXQsXG4gICAgICAgIG9iai5wcml2YXRlS2V5LFxuICAgICAgICBvYmouYXBwbGljYXRpb25JZCxcbiAgICAgICAgb2JqLnNpZ25hdHVyZVNlY3JldCxcbiAgICAgICAgb2JqLnNpZ25hdHVyZU1ldGhvZFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ3JlZGVudGlhbHM7XG4iXX0=