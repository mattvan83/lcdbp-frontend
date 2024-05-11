"use client";

import { Placeholder } from "react-bootstrap";
import styles from "../styles/SimpleForm.module.css";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";

export default function SimpleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      className={styles.simpleForm}
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <div className={styles.formField}>
        <input
          {...register("lastName", { required: true })}
          placeholder="Nom"
        />
        {errors.lastName && <p>Last name is required.</p>}
      </div>

      <div className={styles.formField}>
        <input
          {...register("firstName", { required: true })}
          placeholder="Prénom"
        />
      </div>

      <div className={styles.formField}>
        <input
          {...register("mail", { required: true, pattern: /\d+/ })}
          placeholder="Email"
        />
        {errors.mail && <p>Merci de saisir un email valide</p>}
      </div>

      <div className={styles.formField}>
        <input
          {...register("tel", { required: true, pattern: /\d+/ })}
          placeholder="Téléphone"
        />
        {errors.tel && <p>Merci de saisir un numéro de téléphone valide</p>}
      </div>

      <div className={styles.formField}>
        <textarea
          {...register("message", { required: true })}
          placeholder="Laissez-nous un message"
          rows={4}
        />
        {errors.message && <p>Merci de saisir un message</p>}
      </div>

      <div className={styles.formField}>
        <Button variant="primary" className={styles.pressButton} type="submit">
          Envoyer
        </Button>
      </div>
    </form>
  );
}
