"use client";

import { Placeholder } from "react-bootstrap";
import React, { useState } from "react";
import styles from "../styles/SimpleForm.module.css";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";

interface SimpleFormData {
  lastname: string;
  firstname: string;
  email: string;
  phone?: string;
  message: string;
  ownCopy: boolean;
}

type SimpleFormProps = {
  backendAddress: string | undefined;
};

export default function SimpleForm({ backendAddress }: SimpleFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<SimpleFormData>();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const isChecked = watch("ownCopy");

  // console.log("errors: ", errors);
  // console.log("errorMsg: ", errorMsg);

  const handleInputChange = (): void => {
    setIsSubmitted(false); // Set isSubmitted to false when any input changes
  };

  const onSubmit = (data: SimpleFormData): void => {
    console.log(data);
    const { lastname, firstname, email, phone, message, ownCopy } = data;

    // console.log("backendAddress: ", backendAddress);

    fetch(`${backendAddress}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lastname,
        firstname,
        email,
        phone,
        message,
        ownCopy,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsSubmitted(true);
        if (data.result) {
          // Reset the form after submission
          reset();
          setErrorMsg("");
        } else {
          setErrorMsg("Erreur durant l'envoi du mail");
        }
      });
  };

  return (
    <form className={styles.simpleForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formField}>
        <input
          {...register("lastname", { required: true })}
          placeholder="Nom"
          className={styles.inputField}
          onChange={handleInputChange}
        />
        {errors.lastname && (
          <p className={styles.inputFieldError}>Le nom de famille est requis</p>
        )}
      </div>

      <div className={styles.formField}>
        <input
          {...register("firstname", { required: true })}
          placeholder="Prénom"
          className={styles.inputField}
          onChange={handleInputChange}
        />
        {errors.firstname && (
          <p className={styles.inputFieldError}>Le prénom est requis</p>
        )}
      </div>

      <div className={styles.formField}>
        <input
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
          placeholder="Email"
          className={styles.inputField}
          onChange={handleInputChange}
        />
        {errors.email && (
          <p className={styles.inputFieldError}>
            Merci de saisir un email valide
          </p>
        )}
      </div>

      <div className={styles.formField}>
        <input
          {...register("phone", { pattern: /^\d{10}$/ })}
          placeholder="Téléphone"
          className={styles.inputField}
          onChange={handleInputChange}
        />
        {errors.phone && (
          <p className={styles.inputFieldError}>
            Merci de saisir un numéro de téléphone valide
          </p>
        )}
      </div>

      <div className={styles.formField}>
        <textarea
          {...register("message", { required: true, pattern: /^\s*\S.*$/ })}
          placeholder="Laissez-nous un message"
          rows={8}
          className={styles.inputField}
          onChange={handleInputChange}
        />
        {errors.message && (
          <p className={styles.inputFieldError}>Merci de saisir un message</p>
        )}
      </div>

      <div className={styles.formButton}>
        <label>
          <input
            type="checkbox"
            className={styles.inputCheckBox}
            {...register("ownCopy")}
            // onChange={handleInputChange}
            onClick={handleInputChange}
          />
          M&apos;adresser une copie
        </label>

        <div className={styles.formButtonRight}>
          <Button
            variant="primary"
            className={styles.pressButton}
            type="submit"
          >
            Envoyer
          </Button>
          {isSubmitted && Object.keys(errors).length === 0 && !errorMsg && (
            <p className={styles.successMessage}>
              Formulaire transmis avec succès
            </p>
          )}
          {isSubmitted && Object.keys(errors).length === 0 && errorMsg && (
            <p className={styles.inputFieldError}>{errorMsg}</p>
          )}
        </div>
      </div>
    </form>
  );
}
