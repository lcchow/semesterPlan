import { useState, useEffect } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

export default function FileDragDrop() {

    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const validFileTypes = ["image/jpeg", "image/png", "image/jpg"]

    const handleFileChange = (event) => {
        if (event.target.files) {
            const file = event.target.files[0];

            if (validFileTypes.includes(file.type)) {
                setFile(file);
                setError('');
                console.log("File Uploaded:", file);
            } else {
                console.log("Upload Failed: Invalid file type.");
                setFile(null);
                setError("Invalid file type. Please upload a JPEG, JPG, or PNG file.")
            }
        }
    };


    function handleDrop(event) {
        // NEED TO CHECK IF PROPER FILE TYPE
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length >= 1) {
            const file = files[0];

            if (validFileTypes.includes(file.type)) {
                setFile(file);
                console.log("File Uploaded:", file);
            } else {
                console.log("Upload Failed: Invalid file type.")
                setFile(null);
                setError("Invalid file type. Please upload a JPEG, JPG, or PNG file.")
            }
        }
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    return (
        <>
            <div 
                onDrop = {handleDrop} 
                onDragOver = {handleDragOver}
                className = "flex items-center justify-center w-2/3 h-64 border-4 border-slate-300 border-dashed rounded-lg"
            >

                <section className="flex flex-col items-center space-y-1 text-slate-500 font-sans">
                    <CloudArrowUpIcon className="size-24" />
                    <p className="text-xl font-bold">Drag and drop to upload</p>
                    <p className="text-xl font-bold">or</p>
                    <input type="file" id ="fileUploadBtn"
                        className="hidden" onChange={handleFileChange} />
                    <label htmlFor="fileUploadBtn"
                        className="text-white py-2 px-4 rounded-lg border-0 bg-sky-500 font-bold hover:bg-sky-300 hover:cursor-pointer" >
                        Browse
                    </label>
                    {error && <p className="text-red-600">{error}</p>}
                </section>
                    
                
            </div>
        </>
    )

}