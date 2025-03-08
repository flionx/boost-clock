import { FC } from "react";
interface Props {
    newAchievs: number,
}

const NewAchiev: FC<Props> = ({newAchievs}) => {
    return (
        <div className="button__menu-achievs">{newAchievs}</div>
    )
}
export default NewAchiev;