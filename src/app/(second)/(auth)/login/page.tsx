import AuthContainer from '@/features/auth/ui/AuthContainer'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Login",
  description: "Don't waste time, log in to your BoostClock account and enjoy the work process."
};

const LoginPage = () => {
  return (
    <AuthContainer type="login" />
  )
}

export default LoginPage