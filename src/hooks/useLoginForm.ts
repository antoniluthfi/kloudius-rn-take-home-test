import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { LoginFormData, loginSchema } from '../schemas/loginSchema';

export function useLoginForm() {
  const { login } = useAuth();
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  async function onSubmit(data: LoginFormData) {
    setGeneralError('');
    setLoading(true);
    try {
      await login(data.email.trim(), data.password);
    } catch (e: any) {
      setGeneralError(e.message || 'Login failed');
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
