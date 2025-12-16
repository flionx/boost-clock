import AuthContainer from '@/features/auth/ui/AuthContainer'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sign up",
  description: "Don't waste time, start working with BoostClock!"
};

const SignupPage = () => {
  return (
    <AuthContainer type="signup" />
  )
}

export default SignupPage