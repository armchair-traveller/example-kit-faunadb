// const handlers = {
//   POST: async (req, res) => {
//     /* Step 4.2: Validate the user's DID token */

//     /* Step 4.3: Get or create a user's entity in FaunaDB */

// Once we have the user's verified information, we can create
// a session cookie! As this is not the primary topic of our tutorial
// today, we encourage you to explore the implementation of
// `createSession` on-your-own to learn more!
// await createSession(res, { ... })

//     res.status(200).send({ done: true })
//   },
// }

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

  await createSession(res, { token, email, issuer });

  return {
    statusCode: 200,
  };
};
