import useListenerClick from "../../model/useListenerClick"

interface ModalOptionsProps {
    children: React.ReactNode,
    onClose: VoidFunction
}
const ModalOptions: React.FC<ModalOptionsProps> = ({children, onClose}) => {
    useListenerClick(onClose)
  return (
    <div className="absolute w-34 top-0 right-1/1 z-5 bg-[#e9eaff] rounded-md overflow-hidden">
        {children}
    </div>
  )
}

export default ModalOptions