import Header from '@/widgets/header'
import CircleButtonHome from '@/features/auth/ui/CircleButtonHome'

const SecondLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <CircleButtonHome />
      {children}
    </>
  )
}

export default SecondLayout