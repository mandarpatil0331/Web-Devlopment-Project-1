require("dotenv").config();

exports.PORT = process.env.PORT || 8000;
// exports.EMAIL_HOST = process.env.EMAIL_HOST; //|| 'smtp.mailtrap.io';
// exports.EMAIL_PORT = process.env.EMAIL_PORT; //|| 25;
// exports.NODE_ENV = process.env.NODE_ENV;
exports.ATLAS_URI="mongodb://localhost:27017/classroom2";
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
exports.JWT_COOKIE_EXPIRES_IN = process.env.JWT_COOKIE_EXPIRES_IN;
// exports.DBURL = process.env.DBURL;