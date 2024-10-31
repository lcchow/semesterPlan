
import { useState, useEffect } from "react";
import sampleData from '../../sample.json'
import sampleData2 from '../../sample2.json'
import EventCard from "../components/EventCard";
import EventCardList from "../components/EventCardList";

export default function Summary() {
    const assignments = sampleData2.assignments;
    const quizzes = sampleData2.quizzes;
    const exams = sampleData2.exams;
    const [calendarData, setCalendarData] = useState(sampleData.events);


    return (
        
        <>
            
            <div>
                <h1>Summary Page</h1>
                <p></p>
                <EventCardList 
                    calendarData = {calendarData} />
            </div>
        
        
        </>

    )


}