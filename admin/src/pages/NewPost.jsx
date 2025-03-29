import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';

const API_URL = 'https://blog-api-production-b6da.up.railway.app/posts';

function NewPost() {
  const [post, setPost] = useState({ title: '', content: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_TINY_MCE_API_KEY;
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (content) => {
    setPost({ ...post, content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post.title || !post.content) {
      setError('Title and content are required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await axios.post(API_URL, post, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create post');
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>
      {error && <p>{error}</p>}
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={post.title}
        onChange={handleChange}
        required
        disabled={isLoading}
      />
      <Editor
        apiKey={apiKey}
        onEditorChange={handleEditorChange}
        disabled={isLoading}
        init={{ height: 500 }}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}

export default NewPost;
