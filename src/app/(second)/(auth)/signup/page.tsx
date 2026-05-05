import AuthContainer from '@/features/auth/ui/AuthContainer'
import { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: locale === "ru" ? "Регистрация" : "Sign up",
    description: locale === "ru" 
      ? "Не теряйте время, начните работать с BoostClock!" 
      : "Don't waste time, start working with BoostClock!"
  }
}

const SignupPage = () => {
  return (
    <AuthContainer type="signup" />
  )
}

export default SignupPage