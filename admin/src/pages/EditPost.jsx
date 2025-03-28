import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';

function PostEdit() {
  const { id } = useParams();
  const [post, setPost] = useState({ title: '', content: '' });
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_TINY_MCE_API_KEY;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/${id}`)
      .then((res) => setPost(res.data.data));
  }, [id]);

  const handleEditorChange = (content) => {
    setPost({ ...post, content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/posts/${id}`,
        { ...post },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating post:', error);
    }
    navigate('/posts');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Post</h2>
      <input
        type="text"
        name="title"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <Editor
        apiKey={apiKey}
        value={post.content}
        onEditorChange={handleEditorChange}
      />
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default PostEdit;
