
export default function EventCard({title, date, description}) {

    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('en-US', {month: 'short'}).toUpperCase();
    const day = dateObj.getDate();

    return (
        <>
            <div className="relative flex flex-col max-w-52 w-52 h-40 bg-white shadow-sm border border-slate-200 rounded-lg">
                {/* <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
                    <span className="text-sm text-slate-600 font-medium">
                        Card Header
                    </span>
                </div> */}

                <div className="p-5 text-left text-slate-600">
                    <p className=" font-medium text-sm">
                        {month}
                    </p>
                    <p className="font-extrabold text-2xl">
                        {day}
                    </p>
                    <h5 className="mt-3 text-base font-semibold">
                        {title}
                    </h5>
                    {/* <p className="my-1 font-normal text-sm">
                        {description}
                    </p> */}

                    
                </div>
            </div>
        </>
    )
}