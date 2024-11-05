
export default function Modal({isModalOpen, children}) {

    if(!isModalOpen) {
        return null;
    }


    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-40">
                <div 
                    className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full m-3 z-50"
                    onClick={e => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </>
    )
}