// import './index.css'
function ChangeButton({className, onClickHandler, type, children}) {
    
    return (
        <button className={className}
        onClick={() => {
            onClickHandler(type, children)
        }}>{children}</button>
    )
}

export default ChangeButton;