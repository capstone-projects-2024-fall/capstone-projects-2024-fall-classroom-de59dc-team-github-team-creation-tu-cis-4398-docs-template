import React from 'react';
import styles from './SignUpForm.module.css';

const InputField = ({ label, type, id, placeholder, value, onChange }) => {
  return (
    <div className={styles.inputField}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input
        type={type}
        id={id}
        className={styles.input}
        placeholder={placeholder}
        aria-label={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;