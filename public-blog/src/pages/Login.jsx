function Login() {
  return (
    <div>
      <h2>Login</h2>
      <form action="http://localhost:3000/login" method="POST"></form>
      <label htmlFor="username">
        <input type="text" id="username" name="username" />
      </label>
      <label htmlFor="password">
        <input type="password" id="password" name="password" />
      </label>
    </div>
  );
}

export default Login;
