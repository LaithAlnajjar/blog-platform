import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`).then((res) => {
      setPost(res.data.data);
    });
  }, [id]);
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

export default Post;
