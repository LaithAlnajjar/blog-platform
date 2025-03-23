function PostCard({ title, content }) {
  return (
    <div className="post-card">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export default PostCard;
