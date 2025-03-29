import styles from '../../styles/Footer.module.css';

function Footer() {
  return (
    <footer className={styles['footer']}>
      <div className={styles['container']}>
        <p className={styles['text']}>
          © {new Date().getFullYear()} Code & Craft. All rights reserved.
        </p>
        <p className={styles['credit']}>
          Created by{' '}
          <a
            href="https://github.com/laithalnajjar"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Laith Alnajjar
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
