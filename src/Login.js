import { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from "./UserContext";
import { Navigate } from 'react-router-dom';
import './loginandregister.css';


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const user = useContext(UserContext);

  function loginUser(e) {
    e.preventDefault();

    const data = { email, password };
    axios.post('http://localhost:4000/login', data, { withCredentials: true })
      .then(response => {
        user.setEmail(response.data.email);
        setEmail('');
        setPassword('');
        setLoginError(false);
        setRedirect(true);
      })
      .catch(() => {
        setLoginError(true);
      });
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    // <form action="" onSubmit={e => loginUser(e)}>
    //   {loginError && (
    //     <div>LOGIN ERROR! WRONG EMAIL OR PASSWORD!</div>
    //   )}
    //   <div className="user-box"><input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/><br /></div>
    //   <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/><br />
    //   <button type="submit">log in</button>
    // </form>
    <div class="login-box">
      <h2>Login</h2>
      <form action="" onSubmit={e => loginUser(e)}>
      {loginError && (
       <div className='error'>LOGIN ERROR! WRONG EMAIL OR PASSWORD!</div>
          )}
        <div class="user-box">
          <input type="email" name="" required="" value={email} onChange={e => setEmail(e.target.value)}/>
            <label>Email</label>
        </div>
        <div class="user-box">
          <input type="password" name="" required="" value={password} onChange={e => setPassword(e.target.value)}/>
            <label>Password</label>
        </div>
        <button className="button-36" type='submit'>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;