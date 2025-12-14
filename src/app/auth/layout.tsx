import CircleButtonHome from "@/features/auth/ui/CircleButtonHome"
import Header from "@/widgets/header"

const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
  return (
    <>
        <Header withMenu={false}/>
        <main>
            <CircleButtonHome />
            {children}
        </main>
    </>
  )
}

export default AuthLayout