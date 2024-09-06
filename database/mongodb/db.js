const mongoose = require('mongoose');
const uri = "mongodb+srv://guruhnusantara1291:2wybevOn9XkjWl6T@cluster01.cam4l.mongodb.net/?retryWrites=true&w=majority&appName=cluster01";

const clientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
};

async function connectDB() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({
      ping: 1
    });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
}

async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB", error);
    process.exit(1);
  }
}


module.exports = {
  connectDB,
  disconnectDB
};