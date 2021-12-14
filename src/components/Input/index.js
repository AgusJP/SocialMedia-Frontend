import React, { useRef, useEffect } from "react";
import { useField } from "@unform/core";
import './styles.css'

const Input = ({ name, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <>
      <input className="form" ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <p className="error">{error}</p>}
    </>
  );
};

export default React.memo(Input);
