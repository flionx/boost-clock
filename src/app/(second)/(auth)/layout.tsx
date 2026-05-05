import CircleButtonHome from "@/features/auth/ui/CircleButtonHome"
import Header from "@/widgets/header"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header withMenu={false} />
      <CircleButtonHome />
      {children}
    </>
  )
}

export default AuthLayout