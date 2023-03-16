import { useSelector } from 'react-redux';

export function useAuth() {
  const { email, username, token, image } = useSelector((state) => state.userSlice.user);

  return {
    isAuth: !!username,
    email,
    username,
    token,
    image,
  };
}
