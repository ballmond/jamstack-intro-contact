import React, { useReducer } from "react";
import styles from "./form.module.css";

const INITIAL_STATE = {
  name: "",
  email: "",
  subject: "",
  body: "",
  status: "INITIAL",
};

const reducer = function (state, action) {
  switch (action.type) {
    case "updateFieldValue":
      return { ...state, [action.field]: action.value };

    case "updateStatus":
      return { ...state, status: action.status };

    case "reset":
      return INITIAL_STATE;

    default:
      return INITIAL_STATE;
  }
};

const Form = function () {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const setStatus = (status) => dispatch({ type: "updateStatus", status });

  const updateFieldValue = (field) => (event) => {
    dispatch({
      type: "updateFieldValue",
      field,
      value: event.target.value,
    });
  };

  const handleSubmit = function (event) {
    event.preventDefault();

    setStatus("SUCCESS");

    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(state),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setStatus("SUCCESS");
      })
      .catch((error) => {
        console.log(error);
        setStatus("ERROR");
      });
  };

  if (state.status === "SUCCESS") {
    return (
      <p className={styles.success}>
        Message sent.
        <button
          type="reset"
          onClick={(e) => dispatch({ type: "reset" })}
          className={`${styles.button} ${styles.centered}`}
        >
          Reset
        </button>
      </p>
    );
  }

  return (
    <>
      {state.status === "ERROR" && (
        <p className={styles.error}>Something went wrong. Try again.</p>
      )}
      <form
        className={`${styles.form} ${
          state.status === "PENDING" && styles.pending
        }`}
        onSubmit={handleSubmit}
      >
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            type="text"
            name="name"
            value={state.name}
            onChange={updateFieldValue("name")}
          ></input>
        </label>
        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            name="email"
            value={state.email}
            onChange={updateFieldValue("email")}
          ></input>
        </label>
        <label className={styles.label}>
          Subject
          <input
            className={styles.input}
            type="text"
            name="subjtect"
            value={state.subject}
            onChange={updateFieldValue("subject")}
          ></input>
        </label>
        <label className={styles.label}>
          Body
          <textarea
            className={styles.input}
            name="body"
            value={state.body}
            onChange={updateFieldValue("body")}
          ></textarea>
        </label>
        <button className={styles.button}>Send</button>
      </form>
    </>
  );
};

export default Form;
