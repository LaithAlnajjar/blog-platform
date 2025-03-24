import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`).then((res) => {
      setPost(res.data.data);
    });

    axios.get(`http://localhost:3000/posts/${id}/comments`).then((res) => {
      setComments(res.data.data);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    const token = auth.token;
    const response = await axios.post(
      `http://localhost:3000/posts/${id}/comments`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.data);
    if (response.data.success) {
      setComments([...comments, response.data.data]);
    }
  };

  return (
    <div>
      <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
      <div>
        <h2>Comments</h2>
        {auth.user && (
          <div>
            <form
              action={`http://localhost:3000/posts/${id}/comments`}
              method="POST"
              onSubmit={handleSubmit}
            >
              <input type="text" name="content" />
              <button type="submit">Add Comment</button>
            </form>
          </div>
        )}
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
