const Iron = require("@hapi/iron");

exports.encrypt = async function encrypt(data) {
  return data && Iron.seal(data, process.env.ENCRYPTION_SECRET, Iron.defaults);
};

exports.decript = async function decrypt(data) {
  return (
    data && Iron.unseal(data, process.env.ENCRYPTION_SECRET, Iron.defaults)
  );
};
