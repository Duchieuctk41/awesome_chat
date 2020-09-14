import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from "./../../helpers/socketHelper";
/**
 * @param io from socket.io library  
 */
let approveRequestContactReceived = (io) => {
    let clients = {};
    io.on("connection", (socket) => { 
        clients = pushSocketIdToArray(clients, socket.request.user._id, socket.id);
        
        socket.on("approve-request-contact-received", (data) => {
            let currentUser = {
                id: socket.request.user._id,
                username: socket.request.user.username,
                avatar: socket.request.user.avatar,
                address: (socket.request.user.address !== null) ? socket.request.user.address : "người giời"

            };
            if (clients[data.contactId]) {
                emitNotifyToArray(clients, data.contactId, io, "response-approve-request-contact-sent", currentUser);
            }
        });

        socket.on("disconnect", () => {
            clients = removeSocketIdFromArray(clients, socket.request.user._id, socket);
        });
    });
};

module.exports = approveRequestContactReceived;
