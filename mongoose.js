const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const mongod = new MongoMemoryServer();

/**
 * Connect to the in-memory database.
 */

module.exports.connect = async () => {
  const uri =
    process.env.NODE_ENV === "test" ? await mongod.getConnectionString() : "";

  const mongooseOpts = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };

  mongoose.Promise = Promise;

  return await mongoose.connect(uri, mongooseOpts);
};

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => {
  const { collections } = mongoose.connection;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
