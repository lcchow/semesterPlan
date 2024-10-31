import EventCard from "./EventCard";


export default function EventCardList({ calendarData }) {
    console.log({calendarData})
    return (
        <>
        <div className="flex flex-wrap gap-4">
            {calendarData.map((event) => {
                const date = event.start.date
                return (<EventCard 
                    key={event.id}
                    title={event.summary}
                    date={date} 
                />)
            })}
        </div>
        </>
    )
}