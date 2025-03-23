import { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get('http://localhost:3000/posts');
      setPosts(response.data.data);
      console.log(response.data.data);
    };
    getPosts();
  }, []);
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} title={post.title} content={post.content} />
      ))}
    </div>
  );
}

export default Home;
