"use client";

import React, { useState } from "react";
import styles from "../styles/AuthForm.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";

const backendAddress = process.env.NEXT_PUBLIC_BACKEND_ADDRESS;
// console.log("backendAddress: ", backendAddress);

type AuthFormProps = {
  showModal: () => void;
  isSignInMode: boolean;
  handleCnxMode: () => void;
  fillCnxInfos: (
    token: string,
    username: string,
    firstname: string,
    type: string
  ) => void;
};

interface FormValues {
  email?: string;
  username: string;
  password: string;
}

export default function AuthForm({
  showModal,
  isSignInMode,
  handleCnxMode,
  fillCnxInfos,
}: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const [errorMsg, setErrorMsg] = useState("");

  // console.log("NEXT_PUBLIC_BACKEND_ADDRESS: ", backendAddress);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (isSignInMode) {
      console.log(data);
      const { username, password } = data;

      // console.log("NEXT_PUBLIC_BACKEND_ADDRESS: ", backendAddress);

      fetch(`${backendAddress}/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            fillCnxInfos(data.token, data.username, data.firstname, data.type);
            if (data.token) {
              // Set the token in a cookie before navigating
              Cookies.set("user_token", data.token, {
                path: "/",
                secure: true,
                sameSite: "strict",
                expires: 7,
              });
            }
            // console.log("user_token", Cookies.get("user_token"));
            reset();
            setErrorMsg("");
            showModal();
          } else {
            setErrorMsg(data.error);
          }
        });
    } else {
      console.log(data);
      const { email, username, password } = data;

      // console.log("NEXT_PUBLIC_BACKEND_ADDRESS: ", backendAddress);

      fetch(`${backendAddress}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            fillCnxInfos(data.token, data.username, data.firstname, data.type);
            if (data.token) {
              // Set the token in a cookie before navigating
              Cookies.set("user_token", data.token, {
                path: "/",
                secure: true,
                sameSite: "strict",
                expires: 7,
              });
            }
            reset();
            setErrorMsg("");
            showModal();
          } else {
            setErrorMsg(data.error);
          }
        });
    }
  };

  return (
    <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
      {!isSignInMode && (
        <div className={styles.formField}>
          <input
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })}
            placeholder="Email"
            className={styles.inputField}
          />
          {errors.email && (
            <p className={styles.inputFieldError}>
              Merci de saisir un email valide
            </p>
          )}
        </div>
      )}

      <div className={styles.formField}>
        <input
          {...register("username", { required: true })}
          placeholder="Nom utilisateur"
          className={styles.inputField}
        />
        {errors.username && (
          <p className={styles.inputFieldError}>
            Le nom utilisateur est requis
          </p>
        )}
      </div>

      <div className={styles.formField}>
        <input
          {...register("password", { required: true })}
          placeholder="Mot de passe"
          className={styles.inputField}
        />
        {errors.password && (
          <p className={styles.inputFieldError}>Le mot de passe est requis</p>
        )}
      </div>

      <div className={styles.formButton}>
        <Button variant="primary" className={styles.pressButton} type="submit">
          {!isSignInMode ? "Créer un compte" : "Se connecter"}
        </Button>
        {errorMsg && <p className={styles.inputFieldError}>{errorMsg}</p>}
        <Button variant="link" onClick={handleCnxMode}>
          {!isSignInMode
            ? "Déjà inscrit ? Connectez-vous ici"
            : "Pas encore de compte ? Inscrivez-vous ici"}
        </Button>
      </div>
    </form>
  );
}
