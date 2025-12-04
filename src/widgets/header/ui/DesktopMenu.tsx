import UserButton from './UserButton'
import MenuList from './MenuList'

const DesktopMenu = () => {
  return (
    <div className='hidden items-center gap-5 min-xl:flex'>
        <MenuList />
        <UserButton />
    </div>
  )
}

export default DesktopMenu