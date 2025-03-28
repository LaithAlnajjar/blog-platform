import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';

function NewPost() {
  const [post, setPost] = useState({ title: '', content: '' });
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_TINY_MCE_API_KEY;
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (content) => {
    setPost({ ...post, content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:3000/posts', post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleChange}
      />
      <Editor apiKey={apiKey} onEditorChange={handleEditorChange} />
      <button type="submit">Save</button>
    </form>
  );
}

export default NewPost;
