import React from "react";
import { signInWithGoogle } from "../firebase";
const Login = () => {
  return (
    <div>
      <div className="bg-red-200 absolute top-0 sm: w-screen h-screen flex flex-col justify-around items-center content-center">
        <p className="text-3xl text-indigo-900 font-myfont font-extrabold text-center p-2">
          Time is what We want, <br />
          But We use worst!
        </p>
        <img
          src={require("../assets/login.svg")}
          alt="login_svg"
          className="w-3/4 mx-auto sm:w-1/4"
        />
        <button
          onClick={signInWithGoogle}
          className="p-3 w-1/2  bg-purple-900  text-purple-200 font-myfont shadow-md"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
