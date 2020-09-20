import ContactModel from "./../models/contactModel";
import UserModel from "./../models/userModel";
import ChatGroupModel from "./../models/chatGroupModel";
import MessageModel from "./../models/messageModel";
import _ from "lodash";

const LIMIT_NUMBER_TAKEN = 15;
const LIMIT_MESSAGES_TAKEN = 30;

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
                    getUserContact.updatedAt = contact.updatedAt;
                    return getUserContact;
                } else {
                    let getUserContact = await UserModel.getNomalUserDataById(contact.contactId);
                    getUserContact.updatedAt = contact.updatedAt;
                    return getUserContact;
                }                
            });
            let userConversations = await Promise.all(userConversationsPromise);
            let groupConversations = await ChatGroupModel.getChatGroups(currentUserId, LIMIT_NUMBER_TAKEN);
            let allConversations = userConversations.concat(groupConversations);
            allConversations = _.sortBy(allConversations, (item) => {
                return -item.updatedAt;
            });

            // Get messages to apply in screen chat
            let allConversationWithMessagesPromise = allConversations.map(async (conversation)=> {
                let getMessages = await MessageModel.model.getMessages(currentUserId, conversation._id, LIMIT_MESSAGES_TAKEN);
                conversation = conversation.toObject();
                conversation.messages = getMessages;
                return conversation;
            });

            // Sort by updatedAt desending
            let allConversationWithMessages = await Promise.all(allConversationWithMessagesPromise);
            allConversationWithMessages = _.sortBy(allConversationWithMessages, (item) => {
                return -item.updatedAt;
            });

            resolve({
                userConversations: userConversations,
                groupConversations: groupConversations,
                allConversations: allConversations,
                allConversationWithMessages: allConversationWithMessages
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllConversationItems: getAllConversationItems
};