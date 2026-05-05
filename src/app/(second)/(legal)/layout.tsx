import Header from '@/widgets/header'
import CircleButtonHome from '@/features/auth/ui/CircleButtonHome'
import Footer from '@/widgets/footer'

const LegalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="main-wrapper py-7.5">
        <CircleButtonHome />
        {children}
      </main>
      <Footer />
    </>
  )
}

export default LegalLayout