
import { useState, useEffect } from "react";
import sampleData from '../../sample.json'
import shortSampleData from '../../sample-short.json'
import sampleData2 from '../../sample2.json'
import EventCard from "../components/EventCard";
import EventCardList from "../components/EventCardList";
import { PlusCircleIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import Modal from "../components/Modal";
import { useAppContext } from '../AppProvider';

export default function Summary() {
    const assignments = sampleData2.assignments;
    const quizzes = sampleData2.quizzes;
    const exams = sampleData2.exams;
    const [calendarData, setCalendarData] = useState(shortSampleData.events);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { token } = useAppContext();


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
            
        } catch (error) {
          console.error("Error adding events:", error);
        }
    };


    return (
        
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

            <div className="flex flex-col items-center m-5 mt-8 rounded-lg">
                <button 
                    className="flex w-64 justify-center align-middle gap-2 text-white py-2 px-4 rounded-lg border-0 bg-sky-500 font-bold hover:bg-sky-300"
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusCircleIcon className="size-6"/>
                    Add additional events
                </button>

                <EventCardList 
                    calendarData = {calendarData} 
                />

                <button 
                    className="flex w-64 justify-center align-middle gap-2 text-white py-2 px-4 rounded-lg border-0 bg-sky-500 font-bold hover:bg-sky-300"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        
        
        </>

    )


}