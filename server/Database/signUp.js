// Database Name = iChat
//collection name = Users
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const uri = "mongodb://localhost:27017/"; // MongoDB connection URI
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = "iChat";

// Connect to the MongoDB server
async function signUp(data) {
  let logResponse = {
    email: true,
    userName: true,
  };
  console.log("handleData : ", data);
  let result = await client.connect();
  let db = result.db(database);
  let collection = db.collection("users");
  // Perform database operations here
  try {
    const userWithEmail = await collection.findOne({ email: data.email });
    const userName = await collection.findOne({ userName: data.userName });
    // chek that the unique vaues exist or not
    if (userWithEmail) {
      console.log("Email exists in the collection.");
      logResponse.email = false;
      return logResponse;
    } else if (userName) {
      console.log("username exist");
      logResponse.userName = false;
      return logResponse;
    } else {
      let orignalPassword = data.password;
      let userData = {
        name: data.Name,
        userName: data.userName,
        email: data.email,
        password: "",
      };
      // Generate a salt
      const salt = await bcrypt.genSalt(saltRounds);

      // Hash the password using the generated salt
      const hashedPassword = await bcrypt.hash(orignalPassword, salt);
      userData.password = hashedPassword;

      let response = await collection.insertOne(userData);
      console.log(response);
      console.log("Email does not exist in the collection.");

      return logResponse;
    }
  } catch (error) {
    console.error("Error querying MongoDB:", error);
  }
}
// function to encrypt password
async function encryptPassword(password) {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    console.error("Error encrypting password:", error);
    throw error;
  }
}
module.exports = signUp;
