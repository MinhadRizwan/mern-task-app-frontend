import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Register from './Register';
import UserContext from './UserContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login';
import Home from './Home';
import './index.css'


export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get(`${URL}/user`, { withCredentials: true })
      .then(response => {
        setEmail(response.data.email);
      });
  }, []);

  function logout() {
    axios.post(`${URL}/logout`, {}, { withCredentials: true })
      .then(() => setEmail(''));
  }

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      <BrowserRouter>

        <nav>
          <Link className='link-nav'to={'/'}>Home</Link>
          {!email && (
            <>
              <Link className='link-nav'to={'/login'}>Login</Link>
              <Link className='link-nav'to={'/register'}>Register</Link>
            </>
          )}
          {!!email && (
            <span><a className='link-nav' href='' onClick={e => { e.preventDefault(); logout(); }}>Logout</a></span>
          )}
        </nav>
        <div>
          <Routes>
            <Route exact path={'/'} Component={Home} />
            <Route exact path={'/register'} Component={Register} />
            <Route exact path={'/login'} Component={Login} />
          </Routes>
        </div>
        {/* <nav>
          <div>
            {!!email && (
              <div>
                Logged in as {email}
                <button onClick={() => logout()}>Log Out</button>
              </div>)}
            {!email && (<div>Not logged in</div>)}
          </div>
          <div>
            <Link to={'/'}>Home</Link> |
            <Link to={'/login'}>Login</Link> |
            <Link to={'/register'}>Register</Link>
          </div>
          <Routes>
            <Route exact path={'/register'} Component={Register} />
            <Route exact path={'/login'} Component={Login} />
          </Routes>
          <hr />
        </nav> */}
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
