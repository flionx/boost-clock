import { ArrowDownIcon } from "@/shared/ui/icons"
import Header from "@/widgets/header"
import Link from "next/link"

const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
  return (
    <>
        <Header withMenu={false}/>
        <main className="relative">
            <Link href="/" className="flex justify-center items-center bg-white size-10 rounded-full border border-[#d8d8d8] fixed top-18 left-9">
                <ArrowDownIcon className="rotate-90 -translate-x-0.5 size-7 text-[#1c1c1c]" />
            </Link>
            {children}
        </main>
    </>
  )
}

export default AuthLayout