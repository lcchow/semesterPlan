
export default function EventCard({title, date}) {
    return (
        <>
            <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-56">
                {/* <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
                    <span className="text-sm text-slate-600 font-medium">
                        Card Header
                    </span>
                </div> */}

                <div className="p-4">
                    <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                        {title}
                    </h5>

                    <p className="text-slate-600 leading-normal font-light">
                        {date}
                    </p>
                </div>
            </div>
        </>
    )
}