
import { useState, useEffect } from "react";
import sampleData from '../../sample.json'
import shortSampleData from '../../sample-short.json'
import sampleData2 from '../../sample2.json'
import EventCard from "../components/EventCard";
import EventCardList from "../components/EventCardList";
import { PlusCircleIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import Modal from "../components/Modal";
import { useAppContext } from '../AppProvider';
import { useLocation, useNavigate } from "react-router-dom";
import PageCard from "../components/PageCard";
import Btn from "../components/Btn";

export default function Summary() {
    const [calendarData, setCalendarData] = useState(null);
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
                navigate('/home')
            
        } catch (error) {
          console.error("Error adding events:", error);
        }
    };


    return (
        
        <>

            {calendarData ? (
                <>
                    <Modal
                        isModalOpen={isModalOpen}
                        closeModal={() => setIsModalOpen(false)}
                        className="flex flex-col"
                    >
                        <h2>Testing Modal</h2>
                        <p> Testing Modal text</p>
                        <label for="eventDesc" className="w-full">Title/Description</label>
                        <input type="text" name="eventDesc" 
                            className="bg-gray-50 border border-gray-300  text-sm text-gray-900 rounded-lg block w-full ps-3 p-2.5 max-w-sm" placeholder="Title/Description" />

                        <div class="relative max-w-sm">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <CalendarDaysIcon className="size-5 "/>
                            </div>
                        
                            <input datepicker id="default-datepicker" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full ps-10 p-2.5 " placeholder="Select date" />
                        </div>
                        
                        <button
                            className="text-white py-2 px-4 rounded-lg border-0 bg-sky-500 font-bold hover:bg-sky-300 hover:cursor-pointer"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>
                    </Modal>

    
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