const crypto = require("crypto");

function hashNSalt(password) {
  const salt = crypto.randomBytes(16).toString("base64");
  const iterations = 10000;
  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, 128, "sha256")
    .toString("base64");
  return {
    salt: salt,
    hash: hash,
    iterations: iterations,
  };
}

function verifyPassword(savedHash, savedSalt, savedIterations, password) {
  return (
    savedHash ==
    crypto
      .pbkdf2Sync(password, savedSalt, savedIterations, 128, "sha256")
      .toString("base64")
  );
}

module.exports = {
  hashNSalt,
  verifyPassword,
};
