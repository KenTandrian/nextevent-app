import { createContext, useState, useEffect } from "react";

// INITIAL CONTEXT
const NotificationContext = createContext({
  notification: null as INotification, // { title, message, status }
  showNotification: (notificationData: INotification) => {},
  hideNotification: () => {}
});

export const NotificationContextProvider = (props: { children: JSX.Element }) => {
  const [ activeNotification, setActiveNotification ] = useState<INotification>();

  useEffect(() => {
    if (activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'error')) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      }
    }
  }, [activeNotification]);

  const showNotificationHandler = (notificationData: INotification) => {
    setActiveNotification(notificationData);
  }

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler
  }

  return (
    <NotificationContext.Provider value={context}>
      { props.children }
    </NotificationContext.Provider>
  )
}

export default NotificationContext;