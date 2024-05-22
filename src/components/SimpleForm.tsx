"use client";

import { Placeholder } from "react-bootstrap";
import React, { useState } from "react";
import styles from "../styles/SimpleForm.module.css";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";

export default function SimpleForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isChecked = watch("ownCopy");

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
    <form className={styles.simpleForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formField}>
        <input
          {...register("lastName", { required: true })}
          placeholder="Nom"
          className={styles.inputField}
          onChange={handleInputChange}
        />
        {errors.lastName && (
          <p className={styles.inputFieldError}>Le nom de famille est requis</p>
        )}
      </div>

      <div className={styles.formField}>
        <input
          {...register("firstName", { required: true })}
          placeholder="Prénom"
          className={styles.inputField}
          onChange={handleInputChange}
        />
        {errors.firstName && (
          <p className={styles.inputFieldError}>Le prénom est requis</p>
        )}
      </div>

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

      <div className={styles.formField}>
        <input
          {...register("tel", { pattern: /^\d{10}$/ })}
          placeholder="Téléphone"
          className={styles.inputField}
          onChange={handleInputChange}
        />
        {errors.tel && (
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
            onChange={handleInputChange}
          />
          M'adresser une copie
        </label>

        <div className={styles.formButtonRight}>
          <Button
            variant="primary"
            className={styles.pressButton}
            type="submit"
          >
            Envoyer
          </Button>
          {isSubmitted && Object.keys(errors).length === 0 && (
            <p className={styles.successMessage}>
              Formulaire transmis avec succès
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
