import {useState, useContext} from 'react';
import axios from 'axios';
import UserContext from "./UserContext";
import { Navigate } from 'react-router-dom';
import './loginandregister.css';

function Register() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);

  const user = useContext(UserContext);

  function registerUser(e) {
    e.preventDefault();

    const data = {email,password};
    axios.post('http://localhost:4000/register', data, {withCredentials:true})
      .then(response => {
        user.setEmail(response.data.email);
        setEmail('');
        setPassword('');
        setRedirect(true);
      });
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    // <form action="" onSubmit={e => registerUser(e)}>
    //   <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/><br />
    //   <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/><br />
    //   <button type="submit">register</button>
    // </form>
    <div class="login-box">
      <h2>Register</h2>
      <form action="" onSubmit={e => registerUser(e)}>
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
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;