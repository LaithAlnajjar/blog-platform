import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from '../../styles/Header.module.css';

function Header() {
  const auth = useAuth();

  return (
    <header className={styles['header']}>
      <Link to={'/'}>
        <h1 className={styles['blog-name']}>Code & Craft</h1>
      </Link>

      <div className={styles['bot-sec']}>
        <ul className={styles['nav-list']}>
          <li className={styles['li']}>
            <Link to="/" className={styles['link']}>
              All Articles
            </Link>
          </li>
        </ul>

        {(auth.user && (
          <ul className={styles['signed-list']}>
            <li className={styles['username'] + ' ' + styles['li']}>
              {auth.user.username}
            </li>
            <li className={styles['logout-container'] + ' ' + styles['li']}>
              <button className={styles['logout-btn']} onClick={auth.logout}>
                Logout
              </button>
            </li>
          </ul>
        )) || (
          <ul className={styles['auth-list']}>
            <li className={styles['login'] + ' ' + styles['li']}>
              <Link to="/login" className={styles['link']}>
                Login
              </Link>
            </li>
            <li className={styles['register'] + ' ' + styles['li']}>
              <Link to="/register" className={styles['link']}>
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;
