import EventCard from "./EventCard";


export default function EventCardList({ calendarData }) {
    console.log({calendarData})
 
    return (
        <>
        <div className="flex flex-wrap justify-center max-h-[70vh] w-3/5 gap-4 overflow-y-auto content-start my-8">
            {calendarData.map((event, index) => {



                // Determine the block number (groups of 4)
                const row = Math.floor(index / 4);

                // Determine whether to swap colors based on the block number (even/odd)
                const isOddRow = row % 2 !== 0;

                // Alternate colors within the block
                const isEvenIndex = (index % 4) % 2 === 0 // Check if even or odd index card within block

                return (
                    <EventCard 
                        key={event.summary}
                        title={event.summary}
                        startObj={event.start}
                        endObj={event.end} 
                        description={event.description}
                        isOddRow={isOddRow}
                        isEvenIndex={isEvenIndex}
                    />
            )})}
        </div>
        </>
    )
}