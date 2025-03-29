import { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import styles from '../../styles/Home.module.css';
import parse from 'html-react-parser';

const API_URL = 'https://blog-api-production-b6da.up.railway.app/posts';

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(API_URL);
        const sortedPosts = response.data.data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPosts(sortedPosts);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div className={styles['loading']}>Loading posts...</div>;
  }

  if (error) {
    return <div className={styles['error']}>Error: {error}</div>;
  }

  return (
    <div className={styles['container']}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          createdAt={post.createdAt}
          title={post.title}
          content={parse(post.content)}
        />
      ))}
    </div>
  );
}

export default Home;
