import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Post from '../components/Post';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Dashboard.module.css';

const API_URL = 'https://blog-api-production-b6da.up.railway.app/posts';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const auth = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [publishedData, unpublishedData] = await Promise.all([
          axios.get(`${API_URL}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }),
          axios.get(`${API_URL}/unpublished`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }),
        ]);

        setPosts([...publishedData.data.data, ...unpublishedData.data.data]);
      } catch (error) {
        setError('Failed to fetch posts. Please try again later.');
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [navigate, user]);

  const handleDelete = async (post) => {
    try {
      await axios.delete(`${API_URL}/${post.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPosts(posts.filter((p) => p.id !== post.id));
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  };

  return (
    <div className={styles['container']}>
      <header className={styles['header']}>
        <h1 className={styles['title']}>Admin Dashboard</h1>
        <div className={styles['actions']}>
          <Link
            to="/new"
            className={`${styles['button']} ${styles['button-primary']}`}
          >
            New Post
          </Link>
          <button
            onClick={auth.logout}
            className={`${styles['button']} ${styles['button-danger']}`}
          >
            Logout
          </button>
        </div>
      </header>

      {error && <p className={styles['error']}>{error}</p>}

      {isLoading ? (
        <p className={styles['loading']}>Loading posts...</p>
      ) : (
        <ul className={styles['posts-list']}>
          {posts.map((post) => (
            <Post key={post.id} post={post} onDelete={handleDelete} />
          ))}
          {posts.length === 0 && !error && (
            <p className={styles['no-posts']}>No posts found.</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
