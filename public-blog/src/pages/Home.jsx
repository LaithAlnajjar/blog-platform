import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/PostCard';

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
    <div>
      {posts.map((post) => (
        <Link to={`/posts/${post.id}`} key={post.id}>
          <PostCard key={post.id} title={post.title} content={post.content} />
        </Link>
      ))}
    </div>
  );
}

export default Home;
