require("dotenv").config();

module.exports = {
  dbUrl: process.env.DATABASE_URL,
  dbName: process.env.DATABASE_NAME,

  jwtSecret: process.env.JWT_SECRET,

  port: process.env.PORT || 5000,

  emailOptions: {
    service: process.env.EMAIL_SERVICE || "gmail",

    auth: {
      user: process.env.EMAIL_USER || "example@gmail.com",
      pass: process.env.EMAIL_PASS || "password",
    },
  },
};
