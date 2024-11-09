import EventCard from "./EventCard";


export default function EventCardList({ calendarData }) {
    console.log({calendarData})
    return (
        <>
        <div className="flex flex-wrap max-h-[50vh] w-4/5 gap-4 overflow-y-auto content-start my-8">
            {calendarData.map((event) => {
                return (
                    <EventCard 
                        key={event.summary}
                        title={event.summary}
                        startObj={event.start}
                        endObj={event.end} 
                        description={event.description}
                    />
            )})}
        </div>
        </>
    )
}