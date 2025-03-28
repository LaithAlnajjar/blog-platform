import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Post({ post: initialPost, onDelete }) {
  const [post, setPost] = useState(initialPost);
  const [isLoading, setIsLoading] = useState(false);

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      await axios.put(
        `http://localhost:3000/posts/${post.id}/`,
        { ...post, published: true },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setPost({ ...post, published: true });
    } catch (error) {
      console.error('Error publishing post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnPublish = async () => {
    setIsLoading(true);
    try {
      await axios.put(
        `http://localhost:3000/posts/${post.id}/`,
        { ...post, published: false },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setPost({ ...post, published: false });
    } catch (error) {
      console.error('Error unpublishing post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li>
      <Link to={`/edit/${post.id}`}>{post.title}</Link>
      {post.published ? (
        <button onClick={handleUnPublish} disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Unpublish'}
        </button>
      ) : (
        <button onClick={handlePublish} disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Publish'}
        </button>
      )}
      <button onClick={() => onDelete(post)} disabled={isLoading}>
        Delete
      </button>
    </li>
  );
}

export default Post;
