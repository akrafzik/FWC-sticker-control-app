export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h1>Register to the FIFA Sticker Album Controller!</h1>
      <div className="flex">
        <p>Username</p>
        <input className="mr-2"></input>
      </div>
      <div className="flex">
        <p>Password</p>
        <input className="mr-2"></input>
      </div>
      <div className="flex">
        <p>Forgot Password</p>
      </div>
      <div className="flex">
        <button>Register</button>
      </div>
    </div>
  );
}
