export default function PageCard({children, className}) {

    return (
        <div className={`flex flex-col items-center justify-center bg-white rounded-lg shadow border border-gray-200 ${className}`}>
            {children}
        </div>
    )
}