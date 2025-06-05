  import { useState } from "react";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { doc, getDoc, setDoc } from "firebase/firestore";
  import { auth, db } from "../firebase/firebaseConfig";
  import { useNavigate } from "react-router-dom";

  function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      setError(null);

      try {
        const result = await signInWithEmailAndPassword(auth, email, password);

        if (!result.user.emailVerified) {
          await auth.signOut();
          setError("Please verify your email before logging in.");
          return;
        }

        // 🔐 Firestore logic to send welcome email only once
        const userRef = doc(db, "users", result.user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists() || !userSnap.data().welcomeSent) {
          await fetch("http://localhost:5000/send-welcome", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: result.user.email,
              name: result.user.displayName || "User",
            }),
          });

          await setDoc(userRef, {
            email: result.user.email,
            welcomeSent: true,
          }, { merge: true });
        }

        alert("Login successful!");
        navigate("/");
      } catch (err) {
        setError("Invalid email or password.");
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="text-right mt-1">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-blue-600 text-sm hover:underline focus:outline-none"
                >
                  {showPassword ? "Hide Password" : "Show Password"}
                </button>
              </div>
            </div>

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>

          <p className="mt-2 text-sm text-center">
            <a href="/forgot-password" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </p>
        </div>
      </div>
    );
  }

  export default LoginPage;
