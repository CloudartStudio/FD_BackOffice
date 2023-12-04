import { createContext } from "react";
import { useState } from "react";

const NotificationContext = createContext({
    notification: null,
    showNotification: function (notificationData) {},
    hideNotification: function () {},
});

export function NotificationContextProvider(props) {
    const [notification, setNotification] = useState(null);

    function showNotificationHandler(notificationData) {
        setNotification(notificationData);

        const t = setTimeout(() => {
            setNotification(null);
        }, 3000);

        return () => {
            clearTimeout(t);
        };

        return;
    }

    function hideNotificationHandler() {
        setNotification(null);
    }

    const context = {
        notification: notification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler,
    };

    return <NotificationContext.Provider value={context}>{props.children}</NotificationContext.Provider>;
}

export default NotificationContext;
