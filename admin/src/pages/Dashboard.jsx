import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Post from '../components/Post';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    const fetchPosts = async () => {
      const publishedData = await axios.get('http://localhost:3000/posts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const unpublishedData = await axios.get(
        'http://localhost:3000/posts/unpublished',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setPosts([...publishedData.data.data, ...unpublishedData.data.data]);
    };

    fetchPosts();
  }, [navigate, user]);

  const handleDelete = async (post) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${post.id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPosts(posts.filter((p) => p.id !== post.id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>
        Welcome to the admin dashboard. Here you can manage your application.
      </p>
      <Link to="/new">New Post</Link>

      <ul>
        {posts.map((post) => (
          <Post key={post.id} post={post} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
