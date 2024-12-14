require("dotenv").config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
//Not be used
const PASSWORD = process.env.PASSWORD
module.exports = {
    PORT,
    MONGODB_URI,
    PASSWORD
}