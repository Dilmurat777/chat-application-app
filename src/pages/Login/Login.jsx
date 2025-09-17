import './Login.css';
import assets from './../../assets/assets';
import { useState } from 'react';
import { signup, login } from '../../config/firebase';
import { toast } from 'react-toastify';

const Login = () => {
  const [currenState, setCurrentState] = useState('Sign Up');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (currenState === 'Sign Up') {
        await signup(userName, email, password);
      } else {
        login(email, password)
      }
    } catch (error) {
      setError(error.message);
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className='loader'>
      
  </div>
  ) : (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currenState}</h2>
        {currenState === 'Sign Up' ? (
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            placeholder="User"
            className="form-input"
            required
          />
        ) : null}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email address"
          className="form-input"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          className="form-input"
          required
        />
        <button type="submit">{currenState === 'Sign Up' ? 'Create account' : 'Login'}</button>
        <div className="login-terms">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className="login-forgot">
          {currenState === 'Sign Up' ? (
            <p className="login-toggle">
              Already have an account?{' '}
              <span onClick={() => setCurrentState('Login')}>Login here</span>
            </p>
          ) : (
            <p className="login-toggle">
              Create an account <span onClick={() => setCurrentState('Sign Up')}>Click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
