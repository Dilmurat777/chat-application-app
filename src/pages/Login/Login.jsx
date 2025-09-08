import './Login.css';
import assets from './../../assets/assets';
import { useState } from 'react';

const Login = () => {
  const [currenState, setCurrentState] = useState('Sign Up');
  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form className="login-form">
        <h2>{currenState}</h2>
        {currenState === 'Sign Up' ? (
          <input type="text" placeholder="User" className="form-input" required />
        ) : null}

        <input type="email" placeholder="Email address" className="form-input" required />
        <input type="password" placeholder="Password" className="form-input" required />
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
