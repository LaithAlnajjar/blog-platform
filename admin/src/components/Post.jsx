import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/Post.module.css';

const API_URL = 'https://blog-api-production-b6da.up.railway.app/posts';

function Post({ post: initialPost, onDelete }) {
  const [post, setPost] = useState(initialPost);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePublishToggle = async (shouldPublish) => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.put(
        `${API_URL}/${post.id}`,
        { ...post, published: shouldPublish },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setPost({ ...post, published: shouldPublish });
    } catch (error) {
      const message =
        error.response?.data?.message || 'Error updating post status';
      setError(message);
      console.error('Error updating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setIsLoading(true);
      try {
        await onDelete(post);
      } catch (error) {
        console.error(error);
        setError('Error deleting post');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <li className={styles['post-item']}>
      <Link to={`/edit/${post.id}`} className={styles['post-title']}>
        {post.title}
      </Link>
      {error && <p className={styles['error']}>{error}</p>}
      <div className={styles['actions']}>
        <button
          onClick={() => handlePublishToggle(!post.published)}
          disabled={isLoading}
          className={`${styles['button']} ${
            post.published
              ? styles['button-unpublish']
              : styles['button-publish']
          }`}
        >
          {isLoading ? 'Updating...' : post.published ? 'Unpublish' : 'Publish'}
        </button>
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className={`${styles['button']} ${styles['button-delete']}`}
        >
          {isLoading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </li>
  );
}

export default Post;
