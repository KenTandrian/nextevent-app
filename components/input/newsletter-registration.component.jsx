import React, { useRef } from 'react';
import classes from './newsletter-registration.module.css';

const NewsletterRegistration = () => {
  const enteredEmailRef = useRef();

  const registrationHandler = async (event) => {
    event.preventDefault();

    // fetch user input (state or refs)
    const userEmail = enteredEmailRef.current.value;
    const reqBody = { email: userEmail };

    // optional: validate input
    
    // send valid data to API
    const resp = await fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await resp.json();
    console.log(data);

    if (resp.status != 201) {
      alert(data.message);
    } else {
      enteredEmailRef.current.value = '';
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={enteredEmailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;