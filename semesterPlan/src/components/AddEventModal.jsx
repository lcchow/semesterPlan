import { useState } from "react";
import Btn from "./Btn";
import Modal from "./Modal";
import { CalendarDaysIcon, CheckIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";

export default function AddEventModal({ isModalOpen, setIsModalOpen, addCalendarEvent }) {
    const [title, setTitle] = useState("");
    const [isChecked, setIsChecked] = useState(true);
    const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [startTime, setStartTime] = useState("00:00");
    const [endTime, setEndTime] = useState("00:00");
    const [startDateTime, setStartDateTime] = useState(getDateTime(startTime))
    const [endDateTime, setEndDateTime] = useState(getDateTime(endTime))
    const [description, setDescription] = useState("");

    function getDateTime(initTime) {
        const TIMEZONE = "-07:00";
        const SECONDS = ":00";
        let dateTime = date + "T" + initTime + SECONDS + TIMEZONE;
        return dateTime
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleCheck = () => {
        setIsChecked(!isChecked);
    }

    const handleDateSelect = (e) => {
        console.log(e.target.value)
        setDate(e.target.value);
    }

    const handleStartTimeSelect = (e) => {
        setStartTime(e.target.value);
        setStartDateTime(getDateTime(e.target.value));
    }

    const handleEndTimeSelect = (e) => {
        setEndTime(e.target.value);
        setEndDateTime(getDateTime(e.target.value));
    }

    const handleDesciptionChange = (e) => {
        setDescription(e.target.value);
    }

    function createCalendarEvent() {
        let event = {
            summary: title,
            description: description
        }

        if (isChecked) {
            event.start = {date};
            event.end = {date};
        } else {
            event.start = {dateTime: startDateTime};
            event.end = {dateTime: endDateTime};
        }

        return event;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let calendarEvent = createCalendarEvent();

        addCalendarEvent(calendarEvent);
        setIsModalOpen(false)
        console.log("CREATED EVENT:",calendarEvent);
    }

    return (
        <Modal
            isModalOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            className="flex flex-col"
        >
            <form onSubmit={handleSubmit}>
                <p className="font-bold text-gray-700 mb-3 text-lg">Add Course Event</p>
                
                {/* Title Input */}
                <label htmlFor="eventTitle" className="w-full text-sm text-gray-700">Title</label>
                <input type="text" id="eventTitle" 
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-md block w-full ps-3 p-2.5 max-w-sm mb-4" 
                    placeholder="e.g. CMPT 101 - Assignment 1" 
                    onChange={handleTitleChange} 
                />

                {/* Date Select */}
                <label className="w-full text-sm text-gray-700">Event Date</label>
                <div className="relative max-w-sm mb-4 flex gap-3">
                    <div className="grid inset-y-0 start-0 items-center flex-grow">
                        <CalendarDaysIcon className="absolute ml-2 size-5 row-start-1 col-start-1 stroke-gray-400"/>
                        <input required id="default-datepicker" type="date" 
                            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg w-full ps-9 p-2.5 row-start-1 col-start-1" 
                            onChange={handleDateSelect}
                        />
                    </div>

                    {/* All Day Checkbox */}
                    <label htmlFor="all-day-checkbox" className="select-none grid grid-flow-col gap-2 items-center text-sm font-medium text-gray-700">
                        <div className="grid items-center justify-center">
                        <input type="checkbox" id="all-day-checkbox"
                            onChange={handleCheck}
                            checked={isChecked}
                            className="appearance-none peer w-5 h-5 row-start-1 col-start-1
                            checked:bg-sky-600 checked:border-sky-600 bg-gray-50 border border-gray-300 rounded-md"
                        />
                        <CheckIcon className="invisible peer-checked:visible w-5 h-5 row-start-1 col-start-1 stroke-white stroke-2"/>
                        </div>
                        All Day
                    </label>
                </div>

                { isChecked ? 
                    <></> :
                    <>
                        {/* Time Select */}
                        <div className="mb-4 flex gap-5">
                            {/* Start Time */}
                            <div>
                                <label htmlFor="time" className="w-full text-sm text-gray-700">Start Time:</label>
                                <div className="">
                                    <input type="time" id="time" onChange={handleStartTimeSelect} className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg p-2.5" value={startTime} />
                                </div>
                            </div>

                            {/* End Time */}
                            <div>
                                <label htmlFor="time" className="w-full text-sm text-gray-700">End Time:</label>
                                <div className="">
                                    <input type="time" id="time" onChange={handleEndTimeSelect} className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg p-2.5" value={endTime} />
                                </div>
                            </div>
                        </div>
                    </>
                }


                {/* Description Input */}
                <label htmlFor="eventDesc" className="w-full text-sm text-gray-700">Description</label>
                <input type="text" id="eventDesc" 
                    className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-md block w-full ps-3 p-2.5 max-w-sm mb-4" 
                    placeholder="e.g. Covers chapters 1-5" 
                    onChange={handleDesciptionChange}
                />
                
                <div className="flex gap-5">
                    <Btn
                        type = "submit"
                        className="text-white rounded-lg border-0 bg-sky-500 font-bold hover:bg-sky-300 hover:cursor-pointer w-24 min-w-24"
                        // onClick={() => setIsModalOpen(false)}
                    >
                        Submit
                    </Btn>

                    <button
                        className="text-white py-2 px-4 rounded-lg font-bold w-24 min-w-24 bg-gray-500 hover:bg-gray-600"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Close
                    </button>
                </div>
            </form>

            
        </Modal>
    )
}