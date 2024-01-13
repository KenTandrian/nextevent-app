import React, { useRef, useContext } from "react";

import classes from "./newsletter-registration.module.css";
import NotificationContext from "@/store/notification-context";
// import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';

const NewsletterRegistration = () => {
  const enteredEmailRef = useRef<HTMLInputElement>(null);
  const notificationCtx = useContext(NotificationContext);

  const registrationHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // fetch user input (state or refs)
    const userEmail = enteredEmailRef.current?.value;
    const reqBody = { email: userEmail };

    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter",
      status: "pending",
    });

    // optional: validate input

    // send valid data to API
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        return resp.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        if (enteredEmailRef.current) enteredEmailRef.current.value = "";
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully registered for newsletter!",
          status: "success",
        });
      })
      .catch((err) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: err.message || "Something went wrong!",
          status: "error",
        });
      });
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={enteredEmailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
