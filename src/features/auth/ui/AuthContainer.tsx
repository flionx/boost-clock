import AuthForm from './AuthForm'
import Link from 'next/link'
interface AuthContainerProps {
  type: "signup" | "login"
}
const AuthContainer: React.FC<AuthContainerProps> = ({type}) => {
  return (
    <div className="flex flex-col justify-center items-center h-[85vh]">
      <h2 className="text-4xl mb-4">
        {type === "login" ? "Login" : "Create an account"}
      </h2>
      <AuthForm type={type} />
      <span className="mb-1">
        {type === "login" ? "Do not have an account?" : "Already have an account?"}
      </span>
      <Link 
        href={`/auth/${type === "login" ? "signup" : "login"}`} 
        className="underline"
      >
        {type === "login" ? "Create an account" : "Log in"}
      </Link>
    </div>
  )
}

export default AuthContainer