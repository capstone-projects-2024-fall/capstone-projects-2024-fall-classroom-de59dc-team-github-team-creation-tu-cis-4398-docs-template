import React from 'react';
import styles from './InputField.module.css';

const LoginInputField = ({ label, type, id, value, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input
        type={type}
        id={id}
        className={styles.input}
        value={value}
        onChange={onChange}
        aria-label={label}
      />
    </div>
  );
};

export default InputField;