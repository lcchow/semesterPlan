
export default function Btn({children, className, onClick}) {
    return (
        <>
            <button onClick={onClick} className={`bg-sky-600 hover:bg-sky-700 text-white rounded py-2 px-4  ${className}`}> {children} </button>
        </>
    )
}