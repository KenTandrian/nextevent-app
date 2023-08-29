import React, { Fragment, useContext } from "react";

import MainHeader from "./main-header.component";
import Notification from "../ui/notification.component";
import NotificationContext from "../../store/notification-context";

const Layout = (props: { children?: React.ReactNode }) => {
    const notificationCtx = useContext(NotificationContext);
    const activeNotification = notificationCtx.notification;

    return (
        <Fragment>
            <MainHeader />
            <main> {props.children} </main>
            {activeNotification && (
                <Notification 
                    title={activeNotification.title} 
                    message={activeNotification.message} 
                    status={activeNotification.status} 
                />
            )}
        </Fragment>
    );
};

export default Layout;