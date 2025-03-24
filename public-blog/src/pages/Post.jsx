import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`).then((res) => {
      setPost(res.data.data);
    });

    axios.get(`http://localhost:3000/posts/${id}/comments`).then((res) => {
      setComments(res.data.data);
    });
  }, [id]);

  return (
    <div>
      <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
      <div>
        <h2>Comments</h2>
        {comments.map((comment) => (
          <div key={comment.id}>
            <h3>{comment.user.username}</h3>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;
