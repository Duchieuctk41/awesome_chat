import mongoose from "mongoose";


let Schema = mongoose.Schema;

let ContactSchema = new Schema({
  userId: String,
  contactId: String,
  status: { type: Boolean, default: false },
  createAt: { type: Number, default: Date.now },
  updateAt: { type: Number, default: null },
  deleteAt: { type: Number, default: null },
});

ContactSchema.statics = {
  createNew(item){
    return this.create(item);
  },

  /**
   * Find all items that related with user.
   * @param {string} userId 
   */
  findAllByUser(userId) {
    return this.find({
      $or: [
        {"userId": userId},
        {"contactId": userId},
      ]
    }).exec();
  },

  /**
   * Check exists 2 users
   * @param {string} userId 
   * @param {string} contactId 
   */
  checkExists(userId, contactId) {
    return this.findOne({
      $or: [
        {$and: [
          {"userId": userId},
          {"contactId": contactId}
        ]},
        {$and: [
          {"userId": contactId},
          {"contactId": userId}
        ]}
      ]
    }).exec();
  },

  /**
   * Remove request contact sent
   * @param {string} userId 
   * @param {string} contactId 
   */
  removeRequestContactSent(userId, contactId) {
    return this.remove({
      $and: [
        {"userId": userId},
        {"contactId": contactId}
      ]
    }).exec();
  },

  /**
   * Remove request contact received
   * @param {string} userId 
   * @param {string} contactId 
   */
  removeRequestContactReceived(userId, contactId) {
    return this.remove({
      $and: [
        {"contactId": userId},
        {"userId": contactId}
      ]
    }).exec();
  },

  /**
   * Get contacts by userId and limit
   * @param {string} userId 
   * @param {number} limit 
   */
  getContacts(userId, limit) {
    return this.find({
      $and: [
        {$or:[
          {"userId": userId},
          {"contactId": userId}
        ]},
        {"status": true}
      ]
    }).sort({"createdAt": -1}).limit(limit).exec();
  },

  /**
   * Get contacts sent by userId and limit
   * @param {string} userId 
   * @param {number} limit 
   */
  getContactsSent(userId, limit) {
    return this.find({
      $and: [
        {"userId": userId},
        {"status": false}
      ]
    }).sort({"createdAt": -1}).limit(limit).exec();
  },

  /**
   * Get contacts receiveby userId and limit
   * @param {string} userId 
   * @param {number} limit 
   */
  getContactsReceived(userId, limit) {
    return this.find({
      $and: [
        {"contactId": userId},
        {"status": false}
      ]
    }).sort({"createdAt": -1}).limit(limit).exec();
  },

  /**
   * Count all contacts by userId and limit
   * @param {string} userId
   */
  countAllContacts(userId) {
    return this.count({
      $and: [
        {$or:[
          {"userId": userId},
          {"contactId": userId}
        ]},
        {"status": true}
      ]
    }).exec();
  },

  /**
   * Count all contacts sent by userId and limit
   * @param {string} userId
   */
  countAllContactsSent(userId) {
    return this.count({
      $and: [
        {"userId": userId},
        {"status": false}
      ]
    }).exec();
  },

  /**
   * Count all contacts receiveby userId and limit
   * @param {string} userId
   */
  countAllContactsReceived(userId) {
    return this.count({
      $and: [
        {"contactId": userId},
        {"status": false}
      ]
    }).exec();
  },

  /**
   * Read more contacts by userId, skip, limit
   * @param {string} userId 
   * @param {number} skip 
   * @param {number} limit 
   */
  readMoreContacts(userId, skip, limit) {
    return this.find({
      $and: [
        {$or:[
          {"userId": userId},
          {"contactId": userId}
        ]},
        {"status": true}
      ]
    }).sort({"createdAt": -1}).skip(skip).limit(limit).exec();
  },

  /**
   * Read more contacts receive by userId, skip, limit
   * @param {string} userId 
   * @param {number} skip 
   * @param {number} limit 
   */
  readMoreContactsSent(userId, skip, limit) {
    return this.find({
      $and: [
        {"userId": userId},
        {"status": false}
      ]
    }).sort({"createdAt": -1}).skip(skip).limit(limit).exec();
  },

  /**
   * Read more contacts sent by userId, skip, limit
   * @param {string} userId 
   * @param {number} skip 
   * @param {number} limit 
   */
  readMoreContactsReceived(userId, skip, limit) {
    return this.find({
      $and: [
        {"contactId": userId},
        {"status": false}
      ]
    }).sort({"createdAt": -1}).skip(skip).limit(limit).exec();
  },
};


module.exports = mongoose.model("contact", ContactSchema);
