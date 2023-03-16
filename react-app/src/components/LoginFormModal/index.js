import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const loginDemo = async () => {
    dispatch(login("demo@user.com", "password")).then(closeModal)
  }

  return (
    <div className="login-modal-container">
      <h1 className="login-modal-heading">Log In</h1>
      <form className="login-modal-form" onSubmit={handleSubmit}>
        <ul className="login-modal-errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="login-modal-label">
          Email
          <input
            className="login-modal-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="login-modal-label">
          Password
          <input
            className="login-modal-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="login-modal-button" type="submit">Log In</button>
      </form>
        <button onClick={loginDemo} className="login-modal-button-demo">Log In as Demo</button>
    </div>
  );
}

export default LoginFormModal;
