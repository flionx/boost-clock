"use client"
import UserButton from "../UserButton"
import MenuList from "../MenuList"

const MobileMenu = () => {
  return (
    <ul className="
        flex flex-col-reverse items-center justify-around 
        w-63 h-50 bg-secondary font-nav rounded-sm
        absolute top-10 left-7/10 -translate-x-7/10
        shadow shadow-secondary border border-[#3a3a3a] z-2
        max-[34.3rem]:-translate-x-9/10"
    >
        <UserButton />
        <MenuList />
    </ul>
  )
}

export default MobileMenu