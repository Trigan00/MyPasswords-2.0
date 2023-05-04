import { useTypedSelector } from '../store/hooks/useTypedSelector';

export function useAuth() {
  const { email, id, token, isLoading } = useTypedSelector(
    (state) => state.user,
  );

  return {
    isAuth: !!email,
    email,
    id,
    token,
    isLoading,
  };
}
