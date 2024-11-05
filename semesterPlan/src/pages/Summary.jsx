
import { useState, useEffect } from "react";
import sampleData from '../../sample.json'
import sampleData2 from '../../sample2.json'
import EventCard from "../components/EventCard";
import EventCardList from "../components/EventCardList";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Modal from "../components/Modal";

export default function Summary() {
    const assignments = sampleData2.assignments;
    const quizzes = sampleData2.quizzes;
    const exams = sampleData2.exams;
    const [calendarData, setCalendarData] = useState(sampleData.events);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleAddEvent() {
        // setToggleModal(true);
    }


    return (
        
        <>
            <Modal
                isModalOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                className="flex flex-col"
            >
                <h2>Testing Modal</h2>
                <p> Testing Modal text</p>
                <label for="eventDesc" className="w-full">Description</label>
                <input type="text" name="eventDesc" 
                    className="border border-gray-300 rounded-lg w-full" />


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
                    onClick={() => setIsModalOpen(true)}
                >
                    Submit
                </button>
            </div>
        
        
        </>

    )


}