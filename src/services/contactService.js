import contactModel from "./../models/contactModel";
import UserModel from "./../models/userModel";
import _ from "lodash";

let findUsersContact = (currentUserId, keyword) => {
    return new Promise(async (resolve, reject) => {
        let deprecatedUserIds = [];
        let contactByUser = await contactModel.findAllByUser(currentUserId);
        contactByUser.forEach((contact) => {
            deprecatedUserIds.push(contact.userId);
            deprecatedUserIds.push(contact.contactId);
        });

        deprecatedUserIds = _.uniqBy(deprecatedUserIds);
        let users = await UserModel.findAllForAddContact(deprecatedUserIds, keyword);
        resolve(users);
    })
}

module.exports = {
    findUsersContact: findUsersContact
};
