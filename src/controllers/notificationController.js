import {notification} from "./../services/index";

let readMore = async (req, res) => {
    try {
        // Get skip number from query param
        let skipNumberNotification = +(req.query.skipNumber);
        // Get more item
        let newNotifications = await notification.readMore(req.user._id, skipNumberNotification);
        return res.status(200).send(newNotifications); 
    } catch (error) {
        return res.status(500).send(error);
    }
};

let markAllAsRead = async (req, res) => {
    try {
        let mark = await notification.markAllAsRead(req.user._id, req.body.targetUsers);
        return res.status(200).send(mark); 
    } catch (error) {
        return res.status(500).send(error);
    }
};

module.exports = {
    readMore: readMore,
    markAllAsRead: markAllAsRead
};
