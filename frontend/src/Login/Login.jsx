import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';
import services from '../dependency-injection';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.userID);
      onLogin();
      navigate('/play');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('User not found. Please register first.');
      } else if (error.response && error.response.status === 401) {
        setError('Invalid credentials. Please try again.');
      } else if (error.response && error.response.status === 500) {
        setError('Server error. Please try again later.');
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
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
            <p>Login to continue</p>
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
          <div className={styles.formFooter}>
            <button
              type="submit"
              className={`${styles.button} ${styles.loginButton}`}
              onClick={() => services.audioService.playClickSound()}
              onMouseEnter={() => services.audioService.playHoverSound()}
            >
              Login
            </button>
            <p className={styles.registerPrompt}>
              Don't have an account? <span onClick={() => { handleRegisterRedirect(); services.audioService.playClickSound() }} onMouseEnter={() => services.audioService.playHoverSound()} className={styles.registerLink}>Register</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;