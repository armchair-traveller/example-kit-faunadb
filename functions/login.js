// const { UserModel } = require( './lib/models/user-model')
const { magic } = require("./lib/magic");
const { createSession } = require("./lib/auth-cookies");

exports.handler = async (event, res) => {
  const didToken = magic.utils.parseAuthorizationHeader(
    event.headers.authorization
  );

  magic.token.validate(didToken);
  const { email, issuer } = await magic.users.getMetadataByToken(didToken);

  const userModel = new UserModel();
  // We auto-detect signups if `getUserByEmail` resolves to `undefined`
  const user =
    (await userModel.getUserByEmail(email)) ??
    (await userModel.createUser(email));
  const token = await userModel.obtainFaunaDBToken(user);

  // TODO: Refactor createSession into Netlify return value. Check what it wants.
  await createSession(res, { token, email, issuer });

  return {
    statusCode: 200,
  };
};
