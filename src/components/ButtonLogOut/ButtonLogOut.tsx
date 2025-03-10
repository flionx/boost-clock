import { FC, useContext } from 'react'
import { UserContext } from '../UserProvider/UserProvider';
import { Link } from 'react-router-dom';
const itemClass = 'button__menu user-icon';

interface Props {
  setHasModal: VoidFunction,
}

const ButtonLogOut: FC<Props> = ({setHasModal}) => {
  const hasUser = useContext(UserContext);

  return (
    <>
      {hasUser && <button className={itemClass} onClick={setHasModal}>Log out</button>}
      {!hasUser && <Link className={itemClass} style={{color: 'currentcolor'}} to='/login'>Log in</Link>}
    </>
  )
}

export default ButtonLogOut;