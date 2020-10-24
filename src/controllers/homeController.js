import {notification, contact, message} from "./../services/index";
import {bufferToBase64, lastItemOfArray, convertTimestampToHumanTime} from "./../helpers/clientHelper";
import { reject } from "bluebird";
import request from "request";


let getICETurnServe = () => {
  return new Promise(async (resolve, reject) => {
    // Node Get ICE STUN and TURN list
  let o = {
    format: "urls"
  };

  let bodyString = JSON.stringify(o);
  
  let options = {
    url: "https://global.xirsys.net/_turn/awesome-chat",
    // host: "global.xirsys.net",
    // path: "/_turn/awesome-chat",
    method: "PUT",
    headers: {
        "Authorization": "Basic " + Buffer.from("duchieu:c93079be-15d0-11eb-8a2c-0242ac150002").toString("base64"),
        "Content-Type": "application/json",
        "Content-Length": bodyString.length
    }
  };

    // Call a request to get ICE list of turn server
    request(options, (error, response, body) => {
      if(error) {
        console.log("Error when get ICE list." + error);
        return reject(error);
      }
      let bodyJson = JSON.parse(body);
      resolve(bodyJson.v.iceServers)
    });
  });
};

let getHome = async (req, res) => {
  // Only (10 items one time)
  let notifications = await notification.getNotifications(req.user._id);
  // Get amount notifications unread
  let countNotifUnread = await notification.countNotifUnread(req.user._id);

  // Get contacts (10 items one time)
  let contacts = await contact.getContacts(req.user._id);
  // Get contacts sent (10 items one time)
  let contactsSent = await contact.getContactsSent(req.user._id);
  // Get contacts receive(10 items one time)
  let contactsReceived = await contact.getContactsReceived(req.user._id);

  // Count contacts
  let countAllContacts = await contact.countAllContacts(req.user._id);
  let countAllContactsSent = await contact.countAllContactsSent(req.user._id);
  let countAllContactsReceived = await contact.countAllContactsReceived(req.user._id);

  let getAllConversationItems = await message.getAllConversationItems(req.user._id);
  // All messages with conversations, max 30 item
  let allConversationWithMessages = getAllConversationItems.allConversationWithMessages;

  // Get ICE list from xirsys turn server
  let ICEServerList = await getICETurnServe();

    return res.render("main/home/home", {
        errors: req.flash("errors"),
        success: req.flash("success"),
        user: req.user,
        notifications: notifications,
        countNotifUnread: countNotifUnread,
        contacts: contacts,
        contactsSent: contactsSent,
        contactsReceived: contactsReceived, 
        countAllContacts: countAllContacts, 
        countAllContactsSent: countAllContactsSent, 
        countAllContactsReceived: countAllContactsReceived,
        getAllConversationItems: getAllConversationItems,
        allConversationWithMessages: allConversationWithMessages,
        bufferToBase64: bufferToBase64,
        lastItemOfArray: lastItemOfArray,
        convertTimestampToHumanTime: convertTimestampToHumanTime,
        ICEServerList: JSON.stringify(ICEServerList)
      });
   };

   module.exports = {
    getHome: getHome
   };
