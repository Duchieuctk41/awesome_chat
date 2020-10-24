import mongoose from "mongoose";


let Schema = mongoose.Schema;

let ContactSchema = new Schema({
  userId: String,
  contactId: String,
  status: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null },
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
   * Remove contact
   * @param {string} userId 
   * @param {string} contactId 
   */
  removeContact(userId, contactId) {
    return this.remove({
      $or: [
        {$and: [
          {"userId": userId},
          {"contactId": contactId},
          {"status": true}
        ]},
        {$and: [
          {"userId": contactId},
          {"contactId": userId},
          {"status": true}
        ]}
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
        {"contactId": contactId},
        {"status": false}
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
        {"userId": contactId},
        {"status": false}
      ]
    }).exec();
  },

  /**
   * Approve contact
   * @param {string: of currentUser} userId 
   * @param {string} contactId 
   */
  approveRequestContactReceived(userId, contactId) {
    return this.update({
      $and: [
        {"contactId": userId},
        {"userId": contactId},
        {"status": false}
      ]
    }, {
      "status": true,
      "updatedAt": Date.now()
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
    }).sort({"updatedAt": -1}).limit(limit).exec();
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
    }).sort({"updatedAt": -1}).skip(skip).limit(limit).exec();
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

  /**
   * Update contact (chat personal) when has new message
   * @param {string} userId Current user id
   * @param {string} contactId Contact id
   */
  updateWhenHasNewMessage(userId, contactId) {
    return this.update({
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
    }, {
      "updatedAt": Date.now()
    }).exec();
  },
  
  /**
   * Get contact friends by userId
   * @param {string} userId 
   */
  getFriends(userId) {
    return this.find({
      $and: [
        {$or:[
          {"userId": userId},
          {"contactId": userId}
        ]},
        {"status": true}
      ]
    }).sort({"updatedAt": -1}).exec();
  },
};


module.exports = mongoose.model("contact", ContactSchema);
