"use client"
interface FormContainer {
    children: React.ReactNode
}
const FormContainer: React.FC<FormContainer> = ({children}) => {
  return (
    <form 
        onSubmit={e => e.preventDefault()}
        className="w-full py-5 px-[clamp(0.9375rem,2.5vw,4rem)] bg-accent rounded-xl"
    >
        {children}
    </form>
  )
}

export default FormContainer