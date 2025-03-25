import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import styles from '../../styles/Post.module.css';

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
    if (response.data.success) {
      e.target.content.value = '';
      setComments([...comments, response.data.data]);
    }
  };

  return (
    <div className={styles['post']}>
      <div>
        <h1 className={styles['title']}>{post.title}</h1>
        <p className={styles['content']}>{post.content}</p>
      </div>
      <div className={styles['comments']}>
        <h2 className={styles['comments-title']}>Comments</h2>
        {(auth.user && (
          <div className={styles['add-comment']}>
            <form
              action={`http://localhost:3000/posts/${id}/comments`}
              method="POST"
              onSubmit={handleSubmit}
              className={styles['comment-form']}
            >
              <input
                type="text"
                name="content"
                className={styles['comment-input']}
              />
              <button type="submit" className={styles['comment-submit']}>
                Add Comment
              </button>
            </form>
          </div>
        )) || (
          <div className={styles['please-login']}>
            {' '}
            Please login to add a comment
          </div>
        )}
        {comments.map((comment) => (
          <div key={comment.id} className={styles['comment']}>
            <h3 className={styles['comment-username']}>
              {comment.user.username}
            </h3>
            <p className={styles['comment-content']}>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;
