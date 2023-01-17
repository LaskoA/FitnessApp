import { useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { AuthContext } from '../context';
import { login, register } from '../api';
import { SignInForm, SignUpForm } from '../types/forms';

export const useAuthActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setState } = useContext(AuthContext);
  const { push } = useRouter();

  const signIn = useCallback(async (data: SignInForm) => {
    setIsLoading(true);
    try {
      const result = await login(data);

      setState(result);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUp = useCallback(async (data: SignUpForm) => {
    setIsLoading(true);
    try {
      await register(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    await push('/');
    setState();
  }, []);

  return {
    isLoading,
    signIn,
    signUp,
    signOut,
  };
};
