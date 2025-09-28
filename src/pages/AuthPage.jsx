// src/pages/AuthPage.jsx
import { useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully 🚀");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created 🎉");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google login successful 🚀");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
  
      {/* Background Blobs */}
      <div className="absolute z-10 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>





      {/* Auth Card */}
      <div className="relative z-10 w-[90%] max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl border border-white/20">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login / Signup Button */}
        <button
          onClick={handleEmailAuth}
          className="w-full mb-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        {/* OR divider */}
        <div className="flex items-center justify-center text-gray-300 my-4">
          <span className="w-1/3 border-b border-gray-500"></span>
          <span className="mx-2">OR</span>
          <span className="w-1/3 border-b border-gray-500"></span>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 rounded-lg bg-white text-gray-700 font-medium flex items-center justify-center gap-3 hover:scale-105 transition-transform"
        >
          <FcGoogle size={22} /> Continue with Google
        </button>

        {/* Toggle */}
        <p className="text-center text-gray-200 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-300 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
