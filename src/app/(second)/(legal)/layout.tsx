import Footer from '@/widgets/footer'
import React from 'react'

const LegalLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
        <main className="w-[clamp(22rem,58.3vw,70rem)] mx-auto py-7.5">
            {children}
        </main>
        <Footer />
    </>
  )
}

export default LegalLayout