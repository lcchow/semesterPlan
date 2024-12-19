import { useState } from "react";
import Modal from "./Modal";
import Btn from "./Btn";

export default function AddPrefixModal({ isModalOpen, setIsModalOpen, addEventPrefix, setPrefix }) {

    const handlePrefixChange = (e) => {
        setPrefix(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addEventPrefix();

        setIsModalOpen(false)
    }

    return (
        <>
            <Modal
            isModalOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            className="flex flex-col"
            >
            <form onSubmit={handleSubmit}>
                <p className="font-bold text-gray-700 mb-3 text-lg">Add Event Title Prefix</p>
                <p className="text-gray-700 mb-3 text-sm">Example: If event title is "Homework 4" and prefix is set to "CMPT 300". Title will become "CMPT 300 - Homework 4".</p>
                
                {/* Description Input */}
                <label htmlFor="eventDesc" className="w-full text-sm text-gray-700 font-bold">Prefix</label>
                <input type="text" id="eventDesc" 
                    className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-md block w-full ps-3 p-2.5 max-w-sm mb-5" 
                    placeholder='e.g. "CMPT 300"'
                    onChange={handlePrefixChange}
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
        </>
    )

}