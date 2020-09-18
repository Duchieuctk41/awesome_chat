import ContactModel from "./../models/contactModel";
import UserModel from "./../models/userModel";
import ChatGroupModel from "./../models/chatGroupModel";
import _ from "lodash";

const LIMIT_NUMBER_TAKEN = 15;

/**
 * Get all conversations
 * @param {string} currentUserId 
 */
let getAllConversationItems = (currentUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let contacts = await ContactModel.getContacts(currentUserId, LIMIT_NUMBER_TAKEN);
            let userConversationsPromise = contacts.map(async (contact) => {
                if (contact.contactId == currentUserId) {
                    let getUserContact = await UserModel.getNomalUserDataById(contact.userId);
                    getUserContact.createdAt = contact.createdAt;
                    return getUserContact;
                } else {
                    let getUserContact = await UserModel.getNomalUserDataById(contact.contactId);
                    getUserContact.createdAt = contact.createdAt;
                    return getUserContact;
                }                
            });
            let userConversations = await Promise.all(userConversationsPromise);
            let groupConversations = await ChatGroupModel.getChatGroups(currentUserId, LIMIT_NUMBER_TAKEN);
            let allConversations = userConversations.concat(groupConversations);
            allConversations = _.sortBy(allConversations, (item) => {
                return -item.createdAt;
            });
            resolve({
                userConversations: userConversations,
                groupConversations: groupConversations,
                allConversations: allConversations
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllConversationItems: getAllConversationItems
};