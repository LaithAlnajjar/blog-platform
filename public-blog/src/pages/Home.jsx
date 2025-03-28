import { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import styles from '../../styles/Home.module.css';
import parse from 'html-react-parser';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get('http://localhost:3000/posts');
      const data = response.data.data;
      data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setPosts(data);
    };
    getPosts();
  }, []);
  return (
    <div className={styles['container']}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          content={parse(post.content)}
        />
      ))}
    </div>
  );
}

export default Home;
