import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';

const API_URL = 'https://blog-api-production-b6da.up.railway.app/posts';

function PostEdit() {
  const { id } = useParams();
  const [post, setPost] = useState({ title: '', content: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_TINY_MCE_API_KEY;

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPost(response.data.data);
      } catch (error) {
        setError('Failed to fetch post. Please try again.');
        console.error('Error fetching post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    fetchPost();
  }, [id, navigate]);

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
      await axios.put(
        `${API_URL}/${id}`,
        { ...post },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to update post. Please try again.');
      console.error('Error updating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Post</h2>
      {error && <p>{error}</p>}
      <input
        type="text"
        name="title"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        disabled={isLoading}
        required
      />
      <Editor
        apiKey={apiKey}
        value={post.content}
        onEditorChange={handleEditorChange}
        init={{ height: 500 }}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}

export default PostEdit;
