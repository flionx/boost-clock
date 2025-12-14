"use client"
import { useAuthStore } from '../store/auth'
import { ArrowDownIcon } from '@/shared/ui/icons'
import Link from 'next/link'

const CircleButtonHome = () => {
    const isLoading = useAuthStore(state => state.isLoading);

    return (
        <Link 
            href="/" 
            className={`
                flex justify-center items-center bg-white size-10 rounded-full border border-[#d8d8d8] fixed top-18 left-9
                ${isLoading ? "pointer-events-none" : ""}
            `}
        >
            <ArrowDownIcon className="rotate-90 -translate-x-0.5 size-7 text-[#1c1c1c]" />
        </Link>
  )
}

export default CircleButtonHome