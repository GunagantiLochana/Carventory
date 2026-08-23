function LoginPage() {
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" />

      <label htmlFor="password">Password</label>
      <input id="password" type="password" />

      <button type="button">Login</button>
    </div>
  )
}

export default LoginPage