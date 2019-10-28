const jose = require("node-jose");
const jwks = require("./jwks.json");

const APP_CLIENT_ID = process.env.COGNITO_APP_CLIENT_ID;
const ISS = process.env.COGNITO_ISS;

const getUser = async idToken => {
  const sections = idToken.split(".");
  if (sections.length !== 3) {
    return new Error("Length of split JWT should be 3");
  }

  let kid;
  try {
    const header = JSON.parse(jose.util.base64url.decode(sections[0]));
    kid = header.kid;
  } catch (err) {
    return err;
  }

  let keyIndex = -1;
  for (let i = 0; i < jwks.keys.length; i++) {
    if (kid === jwks.keys[i].kid) {
      keyIndex = i;
      break;
    }
  }
  if (keyIndex === -1) {
    return new Error("Unable to find matching kid");
  }
  let claims;
  try {
    const result = await jose.JWK.asKey(jwks.keys[keyIndex]);
    const verifier = jose.JWS.createVerify(result);

    const verifyResult = await verifier.verify(idToken);
    claims = JSON.parse(verifyResult.payload);
  } catch (err) {
    return err;
  }

  const currentTime = Math.floor(new Date() / 1000);

  if (claims.email_verified !== true) {
    return new Error("User is not verified, please confirm your email");
  }

  if (currentTime > claims.exp) {
    return new Error("Token has expired");
  }
  if (APP_CLIENT_ID !== claims.aud) {
    return new Error("The audience is not correct");
  }
  if (ISS !== claims.iss) {
    return new Error("The issuer is not correct");
  }

  return claims.email;
};

module.exports = getUser;
