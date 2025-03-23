import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

function Register() {
  const [input, setInput] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const auth = useAuth();

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      auth.register(input);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      action="http://localhost:3000/register"
      method="POST"
      onSubmit={handleSubmit}
      className={styles['form']}
    >
      <h2 className={styles['title']}>Register</h2>
      <label htmlFor="username">
        Username
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          className={styles['username'] + ' ' + styles['input']}
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          className={styles['password'] + ' ' + styles['input']}
        />
      </label>
      <button type="submit" className={styles['button']}>
        Register
      </button>
    </form>
  );
}

export default Register;
