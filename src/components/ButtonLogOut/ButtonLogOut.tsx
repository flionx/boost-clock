import React, { FC, SetStateAction, useContext } from 'react'
import { UserContext } from '../UserProvider/UserProvider';
import { Link } from 'react-router-dom';
const itemClass = 'button__menu user-icon';

interface ButtonLogOutProps {
  setHasModal: React.Dispatch<SetStateAction<boolean>>
}

const ButtonLogOut: FC<ButtonLogOutProps> = ({setHasModal}) => {

  const hasUser = useContext(UserContext);

  return (
    <>
      {hasUser && <button className={itemClass} onClick={() => setHasModal}>Log out</button>}
      {!hasUser && <Link className={itemClass} style={{color: 'currentcolor'}} to='/login'>Log in</Link>}
    </>
  )
}

export default ButtonLogOut;