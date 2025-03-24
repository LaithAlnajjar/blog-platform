import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
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
    </header>
  );
}

export default Header;
