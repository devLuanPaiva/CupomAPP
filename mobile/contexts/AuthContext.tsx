import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

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
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '85958265034-8kkebja5dt53lapuhai8u42pls2fpcmk.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        });
    }, []);
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((authUser) => {
            setUser(authUser);
            setLoading(false);
        });

        return subscriber;
    }, []);

    const signInWithGoogle = useCallback(async () => {
         if (isGoogleSigningIn) return; 
        setIsGoogleSigningIn(true);
        try {
            await GoogleSignin.hasPlayServices();
            const userInfor = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(userInfor.data!.idToken)
            await auth().signInWithCredential(googleCredential);
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            setLoading(false);
            throw error;
        }finally {
        setIsGoogleSigningIn(false);
        setLoading(false);
    }

    }, [setLoading, isGoogleSigningIn]);

    const signUp = useCallback(async (email: string, password: string) => {
        await auth().createUserWithEmailAndPassword(email, password);
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        await auth().signInWithEmailAndPassword(email, password);
    }, []);


    const signOut = useCallback(async () => {
        try {
            setLoading(true);
            await GoogleSignin.signOut();
            await auth().signOut();
        } catch (error) {
            console.error('Sign Out Error:', error);
            setLoading(false);
            throw error;
        }
    }, [setLoading]);

    const values = useMemo(() => {
        return {
            user,
            loading,
            signInWithGoogle,
            signOut,
            signIn,
            signUp,

        };
    }, [user, loading, signInWithGoogle,
        signOut, signIn, signUp
    ]);
    return (
        <AuthContext.Provider
            value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);