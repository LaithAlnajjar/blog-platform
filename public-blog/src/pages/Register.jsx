import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Register.module.css';

function Register() {
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
      const success = await auth.register(input);
      if (success) {
        navigate('/login');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      setError(error.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles['form']}>
      <h2 className={styles['title']}>Register</h2>
      {error && <div className={styles['error']}>{error}</div>}
      <label htmlFor="username" className={styles['label']}>
        Username
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          className={styles['input']}
          disabled={isLoading}
          required
          minLength={3}
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
          disabled={isLoading}
          required
          minLength={8}
        />
      </label>
      <button type="submit" className={styles['btn']} disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}

export default Register;
