import Footer from '@/widgets/footer'

const LegalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="main-wrapper py-7.5">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default LegalLayout