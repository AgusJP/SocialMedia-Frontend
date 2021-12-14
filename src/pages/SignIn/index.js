import React, { useCallback, useRef } from "react";
import { Form } from "@unform/web";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { getValidationErrors } from "../../utils/getValidationErrors";
import { useAuth } from "../../hooks/useAuth.js"
import "./styles.css";

export const SignIn = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleOnSubmit = useCallback(
    async (data) => {
      try {
        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          username: Yup.string().required("Username obligatorio"),
          password: Yup.string()
            .required("Contraseña obligatoria")
            .min(8, "La contraseña no puede ser menor de 8 caracteres"),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({username: data.username, password: data.password});

        toast.success("Iniciada sesión correctamente");

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
    [navigate, signIn]
  );

  return (
    <div className="container">
      <Form ref={formRef} onSubmit={handleOnSubmit} className="formContainer">
        <span>
          Inicia sesión y ponte al día con las publicaciones de tus amigos!!!
        </span>

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

        <button type="submit">Login</button>
      </Form>

      <div>
        <p>
          ¿No tienes cuenta? <Link to="/signUp">SignUp</Link>
        </p>
      </div>
    </div>
  );
};
