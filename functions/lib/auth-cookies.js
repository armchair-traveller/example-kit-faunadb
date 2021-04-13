const { serialize, parse } = require("cookie");
const { encrypt, decrypt } = require("./iron");

const TOKEN_NAME = "session";
const MAX_AGE = 60 * 60 * 8; // 8 hours

function parseCookies(req) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies;

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie;
  return parse(cookie || "");
}

exports.createSession = async (res, data) => {
  const encryptedToken = await encrypt(data);

  const cookie = serialize(TOKEN_NAME, encryptedToken, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });

  res.setHeader("Set-Cookie", cookie);
};

exports.getSession = async (req) => {
  const cookies = parseCookies(req);
  return decrypt(cookies?.[TOKEN_NAME]);
};

exports.removeSession = (res) => {
  const cookie = serialize(TOKEN_NAME, "", {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
};
