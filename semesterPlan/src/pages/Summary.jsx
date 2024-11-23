
import { useState, useEffect } from "react";
import sampleData from '../../sample.json'
import shortSampleData from '../../sample-short.json'
import sampleData2 from '../../sample2.json'
import EventCard from "../components/EventCard";
import EventCardList from "../components/EventCardList";
import { PlusCircleIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useAppContext } from '../AppProvider';
import { useLocation, useNavigate } from "react-router-dom";
import PageCard from "../components/PageCard";
import Btn from "../components/Btn";
import AddEventModal from "../components/AddEventModal";

export default function Summary() {
    const [calendarData, setCalendarData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { token } = useAppContext();

    const location = useLocation()
    const responseData = location.state?.data;
    const navigate = useNavigate();

    useEffect(() => {
        if (responseData.text) {
            const cleanResponseData = responseData.text.replace(/\n/g, '').trim();

            let calendarEvents = [];
            try {
                calendarEvents = JSON.parse(cleanResponseData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }

            setCalendarData(calendarEvents);
            console.log("SUMMARY:", calendarEvents);
            
        }
    }, [responseData]);

    function addCalendarEvent(event) {
        setCalendarData((prevData) => [...prevData, event])
    }


    const handleSubmit = async (e) => {
        console.log("HANDLE SUBMIT")
        try {
                const response = await fetch('http://localhost:5000/calendar/create_event', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(calendarData)
                });
            
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            
                console.log("Events Submitted:", response);

                setCalendarData(null);
                navigateHome()
            
        } catch (error) {
          console.error("Error adding events:", error);
        }
    };

    const navigateHome = () => {
        navigate('/home')
    };


    return (
        
        <>

            {calendarData ? (
                <>
                    <AddEventModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} addCalendarEvent={addCalendarEvent}/>

    
                    <PageCard className="flex flex-col items-center w-11/12 h-full p-6 rounded-lg">

                        <h1 className="font-bold text-2xl text-slate-700">Calendar events created from image:</h1>

                        <EventCardList 
                            calendarData = {calendarData} 
                        />

                        <Btn 
                            className="flex w-64 justify-center align-middle mb-5 text-white py-2 px-4 rounded-lg border-0 bg-sky-500 font-bold hover:bg-sky-300"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <PlusCircleIcon className="size-6 mr-2"/>
                            Add additional events
                        </Btn>

                        <Btn 
                            className="flex w-64 justify-center align-middle gap-2 text-white py-2 px-4 rounded-lg border-0 bg-sky-500 font-bold hover:bg-sky-300"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Btn>
                    </PageCard>
                </>
            ) : (
                <p>Loading calendar data...</p>
            )}

 
        
        
        </>

    )


}