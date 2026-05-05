import AuthContainer from '@/features/auth/ui/AuthContainer'
import { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: locale === "ru" ? "Вход" : "Login",
    description: locale === "ru" 
      ? "Не теряйте время, войдите в свою учетную запись BoostClock и наслаждайтесь рабочим процессом." 
      : "Don't waste time, log in to your BoostClock account and enjoy the work process."
  }
}

const LoginPage = () => {
  return (
    <AuthContainer type="login" />
  )
}

export default LoginPage