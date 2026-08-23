function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">
          Login
        </h1>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </section>
    </main>
  )
}

export default LoginPage