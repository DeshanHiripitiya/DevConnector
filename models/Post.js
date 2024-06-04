const mongoose = require('mongoose'); // imports the Mongoose library, which is an ODM (Object Data Modeling) library for MongoDB and Node.js.
const Schema = mongoose.Schema; //creates a shortcut to the Schema constructor from Mongoose, making it easier to define schemas.

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, //Schema.Types.ObjectId is a special type in Mongoose that is used to store MongoDB ObjectIDs. An ObjectID is a unique identifier for documents in a MongoDB collection.
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now, //default: Date.now sets the default value of the date field to the current date and time when the document is created.
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('post', PostSchema);
