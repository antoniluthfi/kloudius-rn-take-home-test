import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { SignupFormData, signupSchema } from '../schemas/signupSchema';

export function useSignupForm() {
  const { signup } = useAuth();
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '' },
    mode: 'onTouched',
  });

  async function onSubmit(data: SignupFormData) {
    setGeneralError('');
    setLoading(true);
    try {
      await signup(data.name.trim(), data.email.trim(), data.password);
    } catch (e: any) {
      setGeneralError(e.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  }

  return {
    control,
    errors,
    loading,
    generalError,
    clearGeneralError: () => setGeneralError(''),
    onSubmit: handleSubmit(onSubmit),
  };
}
