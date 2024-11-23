import { format, parseISO } from 'date-fns';

export default function EventCard({title, startObj, endObj, description, isOddRow, isEvenIndex}) {
    const TIME_FORMAT = 'hh:mm a';
    const DAY_FORMAT = 'dd';
    const SHORT_MONTH_FORMAT = 'MMM';

    const start = (startObj.dateTime) ? parseISO(startObj.dateTime) : parseISO(startObj.date);
    const end = (endObj.dateTime) ? parseISO(endObj.dateTime) : parseISO(endObj.date);
    const startTime = (startObj.dateTime) ? format(start, TIME_FORMAT) : null;
    const endTime = (endObj.dateTime) ? format(end, TIME_FORMAT) : null;
    const shortMonth = format(start, SHORT_MONTH_FORMAT);
    const day = format(start, DAY_FORMAT);

    const lightBgColour = "bg-sky-200";
    const darkBgColour = "bg-sky-700";
    const lightTextColor = "text-white"
    const darkTextColor = "text-slate-600"

    const bgColour = isEvenIndex 
        ? (isOddRow? lightBgColour : darkBgColour) // Even index card, odd row
        : (isOddRow? darkBgColour : lightBgColour) // Odd index card, even row

    const textColour = isEvenIndex 
        ? (isOddRow? darkTextColor : lightTextColor) // Even index card, odd row
        : (isOddRow? lightTextColor : darkTextColor) // Odd index card, even row

    return (
        <>
            <div className={`flex flex-col w-60 h-60 ${bgColour} ${textColour} shadow border border-black-200 rounded-md  p-5 text-left`}>
                <div className="flex-grow">

                        <p className=" font-medium text-sm">
                            {shortMonth}
                        </p>
                        <p className="font-extrabold text-2xl">
                            {day}
                        </p>
                        <h5 className="mt-3 text-sm font-semibold">
                            {title}
                        </h5>
                </div>

                <p className="mt-auto font-medium text-xs ">
                    {description}
                </p>
                    
                {startTime && endTime && 
                    <p className=" font-medium text-xs">
                        {startTime} to {endTime}
                    </p>
                }
            </div>
        </>
    )
}