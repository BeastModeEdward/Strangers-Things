import React, { useState, useEffect } from 'react';
import { Route, Link, useHistory } from 'react-router-dom';
import { Posts, AccountForm } from './components';
import AddNewPost from './components/AddNewPost';
import Profile from './components/Profile';

const App = () => {
  const history = useHistory();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('token: ' + token);
    console.log('user: ' + user);
  }, [token, user]);

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        {localStorage.getItem('token') && (
          <>
            |<Link to="/profile">Profile</Link>
          </>
        )}
        |
        {localStorage.getItem('token') ? (
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('username');
              history.push(`/profile/login`);
              window.location.reload(false);
            }}
          >
            Logout
          </span>
        ) : (
          <Link exact to="/profile/login" >
            Log In
          </Link>
        )}
        |<Link to="/posts">Posts</Link>
      </nav>
      <Route exact path="/">
        <h1 className='Welcome'>Welcome to Strangers Things!</h1>
      </Route>
      <Route exact path="/posts">
        <Posts />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/posts/add">
        <AddNewPost />
      </Route>
      <Route exact path="/posts/edit/:_id">
        <AddNewPost />
      </Route>
      <Route path="/profile/:actionType">
        <AccountForm setToken={setToken} setUser={setUser} />
      </Route>
    </>
  );
};

export default App;
