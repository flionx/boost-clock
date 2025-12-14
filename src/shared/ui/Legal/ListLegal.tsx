interface ListLegalProps {
    children: React.ReactNode,
    type: "ordered" | "unordered"
}
const ListLegal: React.FC<ListLegalProps> = ({children, type}) => {
    if (type === "ordered") return (
        <ol className="pl-5 text-lg mb-3 font-legal list-decimal flex flex-col gap-y-1">
            {children}
        </ol>
    )
    
  return (
    <ul className="pl-5 text-lg mb-3 font-legal list-disc flex flex-col gap-y-1">
        {children}
    </ul>
  )
}

export default ListLegal