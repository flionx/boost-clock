"use client"
import { useState } from 'react'
import ButtonSubmit from './buttons/ButtonSubmit'
import ButtonGoogle from './buttons/ButtonGoogle'
import InputField from './InputField'
import LineOr from './LineOr'
import useAuth from '../model/useAuth'
import { useTranslations } from 'next-intl'
interface AuthFormProps {
  type: "signup" | "login"
}
const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInWithEmail, signUpWithEmail, authWithGoogle } = useAuth();
  const t = useTranslations();

  const handleSubmit = () => {
    if (!email.trim() || password.length < 6) return;
    const submit = type === "login" ? signInWithEmail : signUpWithEmail;
    submit(email, password)
  }

  return (
    <form
      className="w-88 bg-white p-5 rounded-lg text-content-dark mb-5"
      onSubmit={e => e.preventDefault()}
    >
      <InputField type='email' id='email' label={t("email").toUpperCase()} placeholder='example@gmail.com'
        value={email} onChange={e => setEmail(e.target.value)}
      />
      <InputField type='password' id='password' label={t("password").toUpperCase()}
        placeholder="password" value={password} onChange={e => setPassword(e.target.value)}
      />
      <ButtonSubmit onClick={handleSubmit}>
        {t(`sign${type === "login" ? "In" : "Up"}Email`)}
      </ButtonSubmit>
      <LineOr />
      <ButtonGoogle onClick={authWithGoogle}>
        {t(`sign${type === "login" ? "In" : "Up"}Google`)}
      </ButtonGoogle>
    </form>
  )
}

export default AuthForm