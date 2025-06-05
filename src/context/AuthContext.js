import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); // undefined = loading

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          await firebaseUser.reload(); // ✅ Force reload to get updated emailVerified

          const docRef = doc(db, "users", firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          const role = docSnap.exists() ? docSnap.data().role : "user";

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            emailVerified: firebaseUser.emailVerified, // ✅ include this
            role,
          });
        } catch (err) {
          console.error("❌ Error fetching user role:", err);
          setUser(null);
        }
      } else {
        setUser(null); // user not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {user !== undefined && children}
    </AuthContext.Provider>
  );
};
