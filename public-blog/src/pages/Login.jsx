import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from '../../styles/Login.module.css';

function Login() {
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await auth.login(input);
      if (res) {
        navigate('/');
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      action="http://localhost:3000/login"
      method="POST"
      onSubmit={handleSubmit}
      className={styles['form']}
    >
      <h2 className={styles['title']}>Login</h2>
      <label htmlFor="username" className={styles['label']}>
        Username
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          className={styles['input']}
        />
      </label>
      <label htmlFor="password" className={styles['label']}>
        Password
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          className={styles['input']}
        />
      </label>
      <button type="submit" className={styles['btn']}>
        Login
      </button>
    </form>
  );
}

export default Login;
