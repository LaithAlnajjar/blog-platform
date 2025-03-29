import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from '../../styles/Login.module.css';

function Login() {
  const [input, setInput] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!input.username || !input.password) {
      setError('Username and password are required');
      setIsLoading(false);
      return;
    }

    try {
      const res = await auth.login(input);
      if (res) {
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError(error.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles['form']}>
      <h2 className={styles['title']}>Login</h2>
      {error && <div className={styles['error']}>{error}</div>}
      <label htmlFor="username" className={styles['label']}>
        Username
        <input
          type="text"
          id="username"
          name="username"
          min={3}
          onChange={handleChange}
          className={styles['input']}
          disabled={isLoading}
          required
        />
      </label>
      <label htmlFor="password" className={styles['label']}>
        Password
        <input
          type="password"
          id="password"
          name="password"
          min={3}
          onChange={handleChange}
          className={styles['input']}
          disabled={isLoading}
          required
        />
      </label>
      <button type="submit" className={styles['btn']} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default Login;
