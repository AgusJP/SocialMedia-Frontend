import React, { useCallback, useRef } from "react";
import { Form } from "@unform/web";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { getValidationErrors } from "../../utils/getValidationErrors";
import { api } from "../../services/api.js";
import "./styles.css";

export const SignUp = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const handleOnSubmit = useCallback(
    async (data) => {
      try {
        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nombre obligatorio"),
          email: Yup.string()
            .required("Email obligatorio")
            .email("Email inválido"),
          username: Yup.string().required("Username obligatorio"),
          password: Yup.string()
            .required("Contraseña obligatoria")
            .min(8, "La contraseña no puede ser menor de 8 caracteres"),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/users', data);;

        toast.success("Se ha registrado correctamente!");

        navigate("/");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current.setErrors(errors);
          return;
        }
        toast.error(err.response.data.message);
      }
    },
    [navigate]
  );

  return (
    <div className="container">
      <Form ref={formRef} onSubmit={handleOnSubmit} className="formContainer">
        <span>
          Registrate para ver y compartir tus publicaciones al mundo!!!
        </span>

        <label htmlFor="name">Usuario</label>
        <Input id="name" name="name" placeholder="Ingrese su name..." />

        <label htmlFor="email">Email</label>
        <Input id="email" name="email" placeholder="Ingrese su username..." />

        <label htmlFor="username">Username</label>
        <Input
          id="username"
          name="username"
          placeholder="Ingrese su username..."
        />

        <label htmlFor="password">Contraseña</label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Ingrese su username..."
        />

        <button type="submit">Enviar</button>
      </Form>

      <div>
        <p>
          ¿Ya tienes una cuenta? <Link to="/signIn">Register Now!</Link>
        </p>
      </div>
    </div>
  );
};
