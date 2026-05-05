import { useTranslations } from 'next-intl'
import AuthForm from './AuthForm'
import Link from 'next/link'
interface AuthContainerProps {
  type: "signup" | "login"
}
const AuthContainer: React.FC<AuthContainerProps> = ({ type }) => {
  const t = useTranslations();

  return (
    <main className="flex flex-col justify-center items-center h-[85vh]">
      <h2 className="text-4xl mb-4">
        {type === "login" ? t("logIn") : t("createAccount")}
      </h2>
      <AuthForm type={type} />
      <span className="mb-1">
        {type === "login" ? t("doYouHaveAccount") : t("alreadyHaveAccount")}
      </span>
      <Link
        href={`/${type === "login" ? "signup" : "login"}`}
        className="underline"
      >
        {type === "login" ? t("createAccount") : t("logIn")}
      </Link>
    </main>
  )
}

export default AuthContainer