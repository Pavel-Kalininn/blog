import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

import User from '../user/user';
import { useAuth } from '../../hooks/useAuth.js';
import { clearUser } from '../../redux/slices/userSlice.js';
import { blogApi } from '../../redux/blogApi.js';

import styles from './header.module.scss';

export default function Header() {
  const dispacth = useDispatch();
  const { isAuth, username, image } = useAuth();
  const logoutHandler = () => {
    dispacth(clearUser());
    dispacth(blogApi.util.invalidateTags(['Article']));
  };

  return (
    <React.Fragment>
      <div className={styles.header}>
        <Link to="/" className={styles.logo}>
          Realworld Blog
        </Link>
        <div className={styles.header__right}>
          {isAuth ? (
            <React.Fragment>
              <Link to="/new-article" className="newArticleBtn">
                Create article
              </Link>
              <Link to="/profile" className="userBtn">
                <User username={username} image={image} />
              </Link>
              <button type="button" className="logoutBtn" onClick={logoutHandler}>
                Log out
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link to="/sign-in" className="signInBtn">
                Sign In
              </Link>
              <Link to="/sign-up" className="signUpBtn">
                Sign Up
              </Link>
            </React.Fragment>
          )}
        </div>
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
    </React.Fragment>
  );
}
