import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import styles from '../../styles/Post.module.css';
import parse from 'html-react-parser';

const API_URL = 'https://blog-api-production-b6da.up.railway.app/posts';

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = useAuth();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        setIsLoading(true);
        const [postRes, commentsRes] = await Promise.all([
          axios.get(`${API_URL}/${id}`),
          axios.get(`${API_URL}/${id}/comments`),
        ]);

        setPost(postRes.data.data);
        setComments(commentsRes.data.data);
      } catch (err) {
        setError(err.message || 'Failed to load post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;

    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${API_URL}/${id}/comments`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (response.data.success) {
        e.target.content.value = '';
        setComments([...comments, response.data.data]);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className={styles['loading']}>Loading...</div>;
  }

  if (error) {
    return <div className={styles['error']}>Error: {error}</div>;
  }

  if (!post) {
    return <div className={styles['error']}>Post not found</div>;
  }

  return (
    <div className={styles['post']}>
      <div>
        <h1 className={styles['title']}>{post.title}</h1>
        <div className={styles['meta']}>
          <time className={styles['date']}>{formatDate(post.createdAt)}</time>
        </div>
        <div className={styles['content']}>{parse(post.content)}</div>
      </div>
      <div className={styles['comments']}>
        <h2 className={styles['comments-title']}>Comments</h2>
        {auth.user ? (
          <div className={styles['add-comment']}>
            <form onSubmit={handleSubmit} className={styles['comment-form']}>
              <input
                type="text"
                name="content"
                className={styles['comment-input']}
                placeholder="Add a comment..."
                disabled={isSubmitting}
              />
              <button
                type="submit"
                className={styles['comment-submit']}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add Comment'}
              </button>
            </form>
          </div>
        ) : (
          <div className={styles['please-login']}>
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
