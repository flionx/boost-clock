"use client"
import useListener from '@/shared/model/useListener'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface ModalOptionsProps {
  onClose: () => void
  children: React.ReactNode
  triggerRef?: React.RefObject<HTMLElement | null>
}

const ModalOptions: React.FC<ModalOptionsProps> = ({ onClose, children, triggerRef }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isPositioned, setIsPositioned] = useState(false);
  useListener("click", onClose)
  useListener("scroll", onClose)

  useEffect(() => {
    if (triggerRef?.current && modalRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const modalWidth = modalRef.current.offsetWidth
      
      modalRef.current.style.top = `${rect.top}px`
      modalRef.current.style.left = `${rect.left - modalWidth}px`
      
      setIsPositioned(true)
    }
  }, [triggerRef, children])

  return createPortal(
    <div 
      ref={modalRef}
      className="fixed w-34 z-50 bg-[#e9eaff] rounded-md overflow-hidden"
      style={{ opacity: isPositioned ? 1 : 0 }}
    >
      {children}
    </div>,
    document.body
  )
}

export default ModalOptions