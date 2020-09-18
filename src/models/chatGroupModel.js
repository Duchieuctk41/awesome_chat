import mongoose from "mongoose";

let Schema = mongoose.Schema;

let ChatGroupSchema = new Schema({
  name: String,
  userAmount: { type: Number, min: 3, max: 177 },
  messageAmount: { type: Number, default: 0 },
  userId: String,
  members: [
    {userId: String}
  ],
  createAt: { type: Number, default: Date.now },
  updateAt: { type: Number, default: null },
  deleteAt: { type: Number, default: null },
});

ChatGroupSchema.statics = {
  /**
   * Get chat group items by userId and limit
   * @param {string} userId current UserId
   * @param {number} limit 
   */
  getChatGroups(userId, limit) {
    return this.find({
      "members": {$elemMatch: {"userId": userId}}
    }).sort({"createdAt": -1}).limit(limit).exec();
  }
};

module.exports = mongoose.model("chat-group", ChatGroupSchema);
