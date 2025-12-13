import { GoogleIcon } from '@/shared/ui/icons'
interface AuthFormProps {
  type: "signup" | "login"
}
const AuthForm: React.FC<AuthFormProps> = ({type}) => {
  return (
    <form className="w-88 bg-white p-5 rounded-lg text-[#1c1c1c] mb-5">
      <label htmlFor="email" className="inline-block mb-1 text-[#2e2e2e]">EMAIL</label>
      <input type="email" id="email" placeholder="example@gmail.com" className="py-2.5 px-2 bg-[#ededed] rounded-md mb-4 w-full"/>
      <label htmlFor="password" className="inline-block mb-1 text-[#2e2e2e]">PASSWORD</label>
      <input type="password" id="password" placeholder="password" className="py-2.5 px-2 bg-[#ededed] rounded-md mb-4 w-full"/>
      <button 
        className="w-full bg-secondary p-3 text-center rounded-md text-white mt-2.5 mb-6 transition-all duration-200  
          hover:bg-modal-btn-ui-active shadow-[0_2px_2px_#0000001a] active:translate-y-px active:shadow-[0_1px_2px_#0000001a]"
      >
        Sign {type === "login" ? "in" : "up"} with Email
      </button>
      <div className="w-full h-px bg-[#d7d7d7] mb-6 relative">
        <span className="absolute top-1/2 left-1/2 -translate-1/2 bg-white px-2.5">or</span>
      </div>
      <button 
        className="w-full p-3 text-center rounded-md transition-all duration-200 shadow-[0_2px_2px_#0000001a] 
          active:translate-y-px active:shadow-[0_1px_2px_#0000001a] border-[#dcdcdc] border relative"
      >
        <GoogleIcon className="absolute top-1/2 left-[15%] -translate-y-1/2 size-5.5"/>
        Sign {type === "login" ? "in" : "up"} with Email
      </button>
    </form>
  )
}

export default AuthForm