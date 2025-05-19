import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAuth, FirebaseAuthTypes, signInWithCredential, GoogleAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut } from '@react-native-firebase/auth';

type User = FirebaseAuthTypes.User | null;

interface AuthContextType {
    user: User;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);
    const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
    const auth = getAuth();

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '',
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        });
    }, []);

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
            setLoading(false);
        });

        return subscriber;
    }, [auth]);

    const signInWithGoogle = useCallback(async () => {
        if (isGoogleSigningIn) return;
        setIsGoogleSigningIn(true);
        setLoading(true);

        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            await GoogleSignin.signOut(); 

            const userInfo = await GoogleSignin.signIn();
            const idToken = userInfo?.data?.idToken;

            if (!idToken) {
                throw new Error('No ID token received from Google Sign-In');
            }

            const credential = GoogleAuthProvider.credential(idToken);
            await signInWithCredential(auth, credential).then((userCredentials) => {
                setUser(userCredentials.user);
            });

        } catch (error) {
            console.error('Google Sign-In Error:', error);
            await GoogleSignin.signOut();
            throw error;
        } finally {
            setIsGoogleSigningIn(false);
            setLoading(false);
        }
    }, [isGoogleSigningIn, auth]);


    const signUp = useCallback(async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password)
    }, [auth]);

    const signIn = useCallback(async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            const user = userCredentials.user;
            setUser(user);
        });
    }, [auth]);

    const signOut = useCallback(async () => {
        try {
            setLoading(true);
            await GoogleSignin.signOut();
            await firebaseSignOut(auth);
        } catch (error) {
            console.error('Sign Out Error:', error);
            setLoading(false);
            throw error;
        }
    }, [auth, setLoading]);

    const values = useMemo(() => {
        return {
            user,
            loading,
            signInWithGoogle,
            signOut,
            signIn,
            signUp,
        };
    }, [user, loading, signInWithGoogle, signOut, signIn, signUp]);

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);