/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Register.css";

const REGISTER_URL = "http://localhost:8080/api/v1/auth/sign-in"

const USER_REGEX = /^[a-zA-Zа-яА-Я][a-zа-яA-ZА-Я0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*[0-9])(?=.*[!@#$%?&]).{8,24}/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}/;

function Register() {

  const userRef = useRef()
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)
  const [focus, setFocus] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: ""
  })

  const handleChange = (value, key) => {
    setForm({ ...form, [key]: value })
  }

  const [validate, setValidate] = useState({
    fname: false,
    lname: false,
    email: false,
    pwd: false,
    match: false
  })

  const handleValidate = () => {
    setValidate(true)
  }
  // First name
  useEffect(() => {
    const result = USER_REGEX.test(form.firstName)
    handleValidate(result)
  }, [form.firstName]);
  // // Last Name
  // useEffect(() => {
  //   const result = USER_REGEX.test(form.lastName)
  //   setValidate(result)
  // }, [form.lastName]);
  // //Email
  // useEffect(() => {
  //   const result = EMAIL_REGEX.test(form.email)
  //   setValidate(result)
  // }, [form.email]);
  // // Password
  // useEffect(() => {
  //   const result = PWD_REGEX.test(form.password)
  //   setValidate(result)
  //   const match = form.password === form.confirm
  //   setValidate(match)
  // }, [form.password, form.confirm]);

  useEffect(() => {
    setErrMsg('');
  }, [form.firstName])
  const [userData, setUserData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    userRef.current.focus()

    const response = await fetch(REGISTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      body: JSON.stringify({
        ...form
      })
    })
    const data = await response.json()
    if (response.status === 201) {
      console.log(data);
      setUserData(data);
      setSuccess(true);
    } else {
      console.log(data.message);
    }
  }

  return (
    <>
      {success ? (<div>
        <h1 className="registerText">Вы зарегистрировались успешно</h1>
        <Link to="/login" className="login">Войти</Link>
      </div>
      ) : (
        <section className="register-main">
          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <div className="contaIner">
            <h2 className="text">Регистрация</h2>
            <form onSubmit={handleSubmit} id="page">
              <div className="input-container">
                <FontAwesomeIcon icon={faCheck} className={validate.fname ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validate.fname || !form.firstName ? "hide" : "invalid"} />
                <input
                  className="input-username"
                  id="username"
                  type="text"
                  ref={userRef}
                  placeholder="Имя"
                  autoComplete="off"
                  value={form.firstName}
                  aria-invalid={validate.fname ? "true" : "false"}
                  onChange={(e) => handleChange(e.target.value, "firstName")}
                  onFocus={() => setFocus(true)}
                  onBlur={() => setFocus(false)}
                  required
                />
                <input
                  className="input-lastname"
                  id="lastname"
                  type="text"
                  ref={userRef}
                  placeholder="Фамилия"
                  autoComplete="off"
                  value={form.lastName}
                  onChange={(e) => handleChange(e.target.value, "lastName")}
                />
                <input
                  className="input-email"
                  id="email"
                  type="email"
                  ref={userRef}
                  placeholder="Электронная почта"
                  autoComplete="off"
                  value={form.email}
                  onChange={(e) => handleChange(e.target.value, "email")}
                />
                <input
                  className="input-password"
                  id="password"
                  type="password"
                  ref={userRef}
                  placeholder="Пароль"
                  autoComplete="off"
                  value={form.password}
                  onChange={(e) => handleChange(e.target.value, "password")}
                />
                <input
                  className="input-reset-pwd"
                  id="confirm_pwd"
                  type="password"
                  ref={userRef}
                  placeholder="Потвердить пароль"
                  autoComplete="off"
                  value={form.confirm}
                  onChange={(e) => handleChange(e.target.value, "confirm")}
                />
              </div>
              <div className="button-container">
                <button className="login-button">Зарегистрироваться</button>
              </div>
              <Link to="/login">
                <h4 className="button-of-register">УЖЕ ЗАРЕГИСТРИРОВАН?</h4>
              </Link>
            </form>
          </div>
        </section>
      )}
    </>
  );
}

export default Register;
