// Add 'async' and 'await searchParams'
export default async function LoginPage({ searchParams }) {
  const params = await searchParams;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
        <form className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-2 border rounded" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-2 border rounded" 
          />
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
