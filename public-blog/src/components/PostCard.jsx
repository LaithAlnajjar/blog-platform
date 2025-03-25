import styles from '../../styles/PostCard.module.css';
import { Link } from 'react-router-dom';
function PostCard({ title, content, id }) {
  return (
    <div className={styles['card']}>
      <h2 className={styles['title']}>{title}</h2>
      <p className={styles['content']}>{content}</p>
      <Link to={`/post/${id}`} className={styles['read-more']}>
        Read More →
      </Link>
    </div>
  );
}

export default PostCard;
