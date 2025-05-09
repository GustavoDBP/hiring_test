import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import services from '../dependency-injection';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      setError('');
      setMessage(response.data.message);
    } catch (error) {
      setMessage('');
      if (error.response && error.response.status === 409) {
        setError('Username already exists. Please choose a different one.');
      }
      else {
        setError(error.response?.data.message || 'Error registering');
      }
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.gameTitle}>
        WonderCards
      </h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <h2>
              Welcome to WonderCards!
            </h2>
            <p>Register to continue</p>
          </div>
          <div className={styles.formContent}>
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={styles.input}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.message}>{message}</p>}
          <div className={styles.formFooter}>
            <button
              type="submit"
              className={styles.button}
              onClick={() => services.audioService.playClickSound()}
              onMouseEnter={() => services.audioService.playHoverSound()}
            >
              Register
            </button>
            <p className={styles.loginPrompt}>
              Already have an account? <span onClick={() => { handleLoginRedirect(); services.audioService.playClickSound() }} onMouseEnter={() => services.audioService.playHoverSound()} className={styles.loginLink}>Login</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;