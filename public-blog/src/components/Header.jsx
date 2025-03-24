import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Header.module.css';

function Header() {
  const auth = useAuth();

  return (
    <header className={styles['header']}>
      <Link to={'/'}>
        <h1 className={styles['blog-name']}>Code & Craft</h1>
      </Link>

      <nav>
        <ul className={styles['nav-list']}>
          <li>
            <Link to="/" className={styles['link']}>
              All Articles
            </Link>
          </li>
        </ul>
      </nav>
      {(auth.user && (
        <ul>
          <li>{auth.user.username}</li>
          <li>
            <button onClick={auth.logout}>Logout</button>
          </li>
        </ul>
      )) || (
        <ul className={styles['auth-list']}>
          <li>
            <Link to="/login" className={styles['link']}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className={styles['link']}>
              Sign Up
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}

export default Header;
