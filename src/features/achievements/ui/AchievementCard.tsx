import Image from 'next/image'
import hexagonLock from "@/shared/assets/images/hexagon-lock.webp"
import hexagonUnlock from "@/shared/assets/images/hexagon-unlock.webp"
import { LockIcon } from '@/shared/ui/icons'
import { useTranslations } from 'next-intl'
import { Achievement } from '../types'
interface AchievementCardProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>,
  title: Achievement['title'],
  step: number,
  max: number
}
const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  step,
  max,
  icon: AchievmentIcon
}) => {
  const t = useTranslations();
  return (
    <div className={`flex flex-col items-center gap-y-1 text-black pt-1.5 px-2.5 pb-2.5 rounded-lg
       ${step >= max ? "bg-[#f2f2ff]" : "bg-[#caccf5]"} 
    `}>
      <div className="w-19 min-h-21.5 relative">
        {step >= max ? <>
          <Image src={hexagonUnlock} alt='hexagon unlock' />
          <AchievmentIcon className="absolute top-1/2 left-1/2 -translate-1/2" />
        </>
          : <>
            <Image src={hexagonLock} alt='hexagon lock' />
            <LockIcon className="absolute top-1/2 left-1/2 -translate-1/2 w-10 h-11" />
          </>}

      </div>
      <div className="flex flex-col justify-between h-9/10">
        <div>
          <h4 className="text-xl font-primary text-center mb-1">
            {t(`achiev-${title}`)}
          </h4>
          <p className="font-secondary font-normal mb-1 leading-[118%] text-center text-sm">
            {t(`achiev-${title}-desc`)}
          </p>
        </div>
        <div className="w-14 p-1 text-center bg-action-secondary-light rounded-md mx-auto">
          {step}/{max}
        </div>
      </div>
    </div>
  )
}

export default AchievementCard