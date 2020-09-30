import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const [code, setCode] = React.useState("");
  if (loading)
    return (
      <div className="flex flex-col min-h-screen justify-around items-center p-2">
        <p>loading....</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col min-h-screen justify-around items-center p-2">
        <p>{error}</p>
      </div>
    );
  return (
    <div>
      <div className="flex flex-col justify-around items-center max-h-screen min-h-full font-myfont">
        <p className="p-2 text-gray-900 text-3xl font-extrabold text-center font-myfont">
          Welcome to QuicMarc! <br /> Enter the code and
          <br />
          post your presence
        </p>
        <input
          onChange={(e) => setCode(e.target.value)}
          type="text"
          placeholder="Enter code"
          className="p-3 border border-indigo-400 text-center m-8"
        />
        <div>
          <Link className="w-full" to={`/room/${code.trim()}`}>
            <button className="p-2 bg-blue-800 w-48 text-white font-bold text-xl shadow-md rounded-full">
              Submit
            </button>
          </Link>
        </div>
        <Link to="/create">
          <p className="p-3 text-md border border-blue-400 m-4 hover:bg-blue-400">
            Create a new class
          </p>
        </Link>
      </div>
      <div className="flex flex-col justify-around items-center absolute  w-screen bottom-0 p-3  font-myfont">
        {user ? (
          <button
            onClick={() => auth.signOut()}
            className="py-2 px-6 bg-purple-900 text-white"
          >
            Logout
          </button>
        ) : (
          <>
            <p className="text-center p-2">
              Are you a teacher? <br /> Login to create room
            </p>
            <Link to="/login">
              <button className="py-2 px-6 bg-purple-900 text-white">
                Login
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
