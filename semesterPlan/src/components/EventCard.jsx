import { format, parseISO } from 'date-fns';

export default function EventCard({title, startObj, endObj, description}) {
    const TIME_FORMAT = 'hh:mm a';
    const DAY_FORMAT = 'dd';
    const SHORT_MONTH_FORMAT = 'MMM';

    const start = (startObj.dateTime) ? parseISO(startObj.dateTime) : parseISO(startObj.date);
    const end = (endObj.dateTime) ? parseISO(endObj.dateTime) : parseISO(endObj.date);
    const startTime = (startObj.dateTime) ? format(start, TIME_FORMAT) : null;
    const endTime = (endObj.dateTime) ? format(end, TIME_FORMAT) : null;
    const shortMonth = format(start, SHORT_MONTH_FORMAT);
    const day = format(start, DAY_FORMAT);

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
                        {shortMonth}
                    </p>
                    <p className="font-extrabold text-2xl">
                        {day}
                    </p>
                    <h5 className="mt-3 text-base font-semibold">
                        {title}
                    </h5>
                    
                    {startTime && endTime && 
                        <p className=" font-medium text-sm">
                            {startTime} to {endTime}
                        </p>
                    }

                    <p className=" font-medium text-sm">
                        {description}
                    </p>

                </div>
            </div>
        </>
    )
}