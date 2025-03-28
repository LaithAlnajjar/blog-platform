import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

      setPosts([
        ...posts,
        ...publishedData.data.data,
        ...unpublishedData.data.data,
      ]);
    };

    fetchPosts();
  }, [navigate, user]);

  return (
    <div>
      <h1> Admin Dashboard</h1>
      <p>
        Welcome to the admin dashboard. Here you can manage your application.
      </p>

      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`/edit/${post.id}`}>{post.title}</Link>
          <button>Delete</button>
        </li>
      ))}
    </div>
  );
}

export default Dashboard;
