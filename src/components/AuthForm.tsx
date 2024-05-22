"use client";

import React, { useState } from "react";
import styles from "../styles/AuthForm.module.css";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";

export default function AuthForm({ isSignInMode, handleCnxMode }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  //   console.log("errors: ", errors);

  const handleInputChange = () => {
    setIsSubmitted(false); // Set isSubmitted to false when any input changes
  };

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission logic here

    // Reset the form after submission
    reset();
    setIsSubmitted(true);
  };

  return (
    <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
      {!isSignInMode && (
        <div className={styles.formField}>
          <input
            {...register("mail", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })}
            placeholder="Email"
            className={styles.inputField}
            onChange={handleInputChange}
          />
          {errors.mail && (
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
        />
        {errors.password && (
          <p className={styles.inputFieldError}>Le mot de passe est requis</p>
        )}
      </div>

      <div className={styles.formButton}>
        <Button variant="primary" className={styles.pressButton} type="submit">
          {!isSignInMode ? "Créer un compte" : "Se connecter"}
        </Button>
        {isSubmitted && Object.keys(errors).length === 0 && (
          <p className={styles.successMessage}>
            Formulaire transmis avec succès
          </p>
        )}
        <Button variant="link" onClick={handleCnxMode}>
          {!isSignInMode
            ? "Déjà inscrit ? Connectez-vous ici"
            : "Pas encore de compte ? Inscrivez-vous ici"}
        </Button>
      </div>
    </form>
  );
}
