import Image, { StaticImageData } from 'next/image'
import hexagonLock from "@/shared/assets/images/hexagon-lock.webp"
import hexagonUnlock from "@/shared/assets/images/hexagon-unlock.webp"
import lock from "@/shared/assets/images/lock.webp"
// todo: add icon when it complete
interface AchievementCardProps {
    // icon: string | StaticImageData,
    title: string,
    description: string,
    progress: {
        step: number,
        max: number
    }
}
const AchievementCard: React.FC<AchievementCardProps> = ({
    // icon,
    title,
    description,
    progress
}) => {
  return (
    <div className="flex flex-col items-center gap-y-1 text-black bg-[#caccf5] pt-1.5 px-2.5 pb-2.5 rounded-lg">
        <div className="w-19 min-h-21.5 relative">
            {progress.step === progress.max ? <>
                <Image src={hexagonUnlock} alt='hexagon unlock' />
                <Image 
                    // src={icon} 
                    src={lock} 
                    alt='lock' className="absolute top-1/2 left-1/2 -translate-1/2 w-10 h-11" 
                />
            </>
            :<>
                <Image src={hexagonLock} alt='hexagon lock' />
                <Image src={lock} alt='lock' className="absolute top-1/2 left-1/2 -translate-1/2 w-10 h-11" />
            </>}
            
        </div>
        <div className="flex flex-col justify-between h-9/10">
            <div>
                <h4 className="text-xl font-primary text-center mb-1">{title}</h4>
                <p className="font-secondary font-normal mb-1 leading-[118%] text-center text-sm">{description}</p>
            </div>
            <div className="w-14 p-1 text-center bg-[#b7b9d8] rounded-md mx-auto">
                {progress.step}/{progress.max}
            </div>
        </div>
    </div>
  )
}

export default AchievementCard