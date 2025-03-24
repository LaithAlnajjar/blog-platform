import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
    >
      <h2>Register</h2>
      <label htmlFor="username">
        Username
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
        />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
