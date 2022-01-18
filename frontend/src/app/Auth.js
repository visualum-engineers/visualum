import React from "react";
import * as Realm from "realm-web";
import { useRealmApp } from "../RealmApp";
import validator from "validator";


const handleLogin = async () => {
    setIsLoggingIn(true);
    setError((e) => ({ ...e, password: null }));
    try {
      await app.logIn(Realm.Credentials.emailPassword(email, password));
    } catch (err) {
      handleAuthenticationError(err, setError);
    }
  };

  const handleRegistrationAndLogin = async () => {
    const isValidEmailAddress = validator.isEmail(email);
    setError((e) => ({ ...e, password: null }));
    if (isValidEmailAddress) {
      try {
        // Register the user and, if successful, log them in
        await app.emailPasswordAuth.registerUser(email, password);
        return await handleLogin();
      } catch (err) {
        handleAuthenticationError(err, setError);
      }
    } else {
      setError((err) => ({ ...err, email: "Email is invalid." }));
    }
  };