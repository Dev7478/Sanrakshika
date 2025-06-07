import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAlert } from './AlertContext';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();
  const [firebaseAuth, setFirebaseAuth] = useState(null);

  useEffect(() => {
    // Initialize Firebase Auth
    try {
      const auth = getAuth();
      setFirebaseAuth(auth);
    } catch (error) {
      console.error('Firebase initialization error:', error);
      showAlert('Error initializing authentication. Please try again later.', 'error');
    }

    // Get initial session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes in Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        // If user signs in with email, update their profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (!profile) {
          // Create profile if it doesn't exist
          const { error } = await supabase
            .from('profiles')
            .insert([
              {
                id: session.user.id,
                email: session.user.email,
                updated_at: new Date().toISOString(),
              },
            ]);

          if (error) {
            console.error('Error creating profile:', error);
          }
        }
      }
      setCurrentUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [showAlert]);

  async function signup(email, password, metadata = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });

    if (error) throw error;
    return data;
  }

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  }

  async function logout() {
    try {
      // Sign out from both Supabase and Firebase
      await Promise.all([
        supabase.auth.signOut(),
        firebaseAuth?.signOut()
      ]);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async function resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  }

  async function signInWithGoogle() {
    if (!firebaseAuth) {
      throw new Error('Firebase authentication not initialized');
    }

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      
      // Get the Google user's ID token
      const idToken = await result.user.getIdToken();
      
      // Sign in to Supabase with the Google ID token
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 