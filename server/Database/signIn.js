// Database Name = iChat
//collection name = Users
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const uri = "mongodb://localhost:27017/"; // MongoDB connection URI
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = "iChat";

// Connect to the MongoDB server
async function signIn(data) {
  console.log("handleData : ", data);
  let result = await client.connect();
  let db = result.db(database);
  let collection = db.collection("users");
  // Perform database operations here
  try {
    const providedUserName = data.userName;
    const providedPassword = data.password;
    // find the user data using userName 
    const userName = await collection.findOne({ userName: providedUserName });
    // if user exist 
    if (userName) {
      
      const storedHashedPassword = userName.password;
      const storeduserName = userName.password;
     

      
      const isPasswordMatch = await bcrypt.compare(
        providedPassword,
        storedHashedPassword
      );
      
      // if password is correct written a sucees message
      if (isPasswordMatch) {
        return { message: "user name and password is correct" ,userName : storeduserName , password : storedHashedPassword };
      } else {
        // if password is correct not  written a unsucees message
        return { message: "user name and password is not correct"  };
      }
    } else {
      // if user name node found return unsucess message
      return { message: "user name and password is not correct" };
    }
  } catch (error) {
    return { message: error };
  }
}

module.exports = signIn;
