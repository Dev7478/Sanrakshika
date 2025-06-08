import { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAlert } from './AlertContext';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showAlert } = useAlert();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function signup(email, password, userData) {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile
      await updateProfile(user, {
        displayName: `${userData.first_name} ${userData.last_name}`,
        photoURL: null
      });

      // Send email verification
      await sendEmailVerification(user);
      showAlert('Verification email sent! Please check your inbox.', 'success');

      return { user };
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message);
      showAlert(error.message, 'error');
      throw error;
    }
  }

  async function login(email, password) {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        await signOut(auth);
        throw new Error('Please verify your email before logging in');
      }

      showAlert('Login successful!', 'success');
      return { user };
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      showAlert(error.message, 'error');
      throw error;
    }
  }

  async function signInWithGoogle() {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      showAlert('Google sign-in successful!', 'success');
      return { user: result.user };
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError(error.message);
      showAlert(error.message, 'error');
      throw error;
    }
  }

  async function logout() {
    try {
      setError(null);
      await signOut(auth);
      setCurrentUser(null);
      showAlert('Logged out successfully!', 'success');
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.message);
      showAlert(error.message, 'error');
    }
  }

  async function resetPassword(email) {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
      showAlert('Password reset email sent! Please check your inbox.', 'success');
    } catch (error) {
      console.error('Password reset error:', error);
      setError(error.message);
      showAlert(error.message, 'error');
      throw error;
    }
  }

  async function verifyResetCode(code) {
    try {
      setError(null);
      const email = await verifyPasswordResetCode(auth, code);
      return email;
    } catch (error) {
      console.error('Reset code verification error:', error);
      setError(error.message);
      showAlert(error.message, 'error');
      throw error;
    }
  }

  async function confirmResetPassword(code, newPassword) {
    try {
      setError(null);
      await confirmPasswordReset(auth, code, newPassword);
      showAlert('Password has been reset successfully!', 'success');
    } catch (error) {
      console.error('Password reset confirmation error:', error);
      setError(error.message);
      showAlert(error.message, 'error');
      throw error;
    }
  }

  const value = {
    currentUser,
    loading,
    error,
    signup,
    login,
    signInWithGoogle,
    logout,
    resetPassword,
    verifyResetCode,
    confirmResetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 