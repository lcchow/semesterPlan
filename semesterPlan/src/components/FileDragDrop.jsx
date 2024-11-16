import { useState, useEffect } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function FileDragDrop() {

    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const validFileTypes = ["image/jpeg", "image/png", "image/jpg"]
    const navigate = useNavigate();

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
        
        if (!file) {
            const files = event.dataTransfer.files;
            if (files.length >= 1) {
                const file = files[0];

                if (validFileTypes.includes(file.type)) {
                    setFile(file);
                    setError('');
                    console.log("File Uploaded:", file);
                } else {
                    console.log("Upload Failed: Invalid file type.")
                    setFile(null);
                    setError("Invalid file type. Please upload a JPEG, JPG, or PNG file.")
                }
            }
        }
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    const handleImageSubmit = async (imageFile) => {
        const reader = new FileReader();

        if (!imageFile) return;

        setLoading(true);

        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            // const response = await axios.post('http://localhost:5000/image/read-image', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // });
            
            // MOCK RESPONSE
            const response = {data: [
                {
                  "type": "text",
                  "text": "[\n  {\n    \"summary\": \"Weekly Activity Week 1: Technology and values\",\n    \"start\": {\"date\": \"2024-09-13\"},\n    \"end\": {\"date\": \"2024-09-13\"},\n    \"description\": \"Due by 11:59pm\"\n  },\n  {\n    \"summary\": \"Weekly Activity Week 2: Research Ethics I\",\n    \"start\": {\"date\": \"2024-09-16\"},\n    \"end\": {\"date\": \"2024-09-16\"},\n    \"description\": \"Due by 12pm\"\n  },\n  {\n    \"summary\": \"Online Activity Week 3: Research Ethics II\",\n    \"start\": {\"date\": \"2024-09-23\"},\n    \"end\": {\"date\": \"2024-09-23\"},\n    \"description\": \"Due by 12pm\"\n  },\n  {\n    \"summary\": \"Assignment 1 - Computing Science Research and Ethical Guidelines (5%)\",\n    \"start\": {\"date\": \"2024-09-26\"},\n    \"end\": {\"date\": \"2024-09-26\"},\n    \"description\": \"Due by 11:59pm\"\n  },\n  {\n    \"summary\": \"Online Activity Week 4: Information and Privacy\",\n    \"start\": {\"date\": \"2024-09-30\"},\n    \"end\": {\"date\": \"2024-09-30\"},\n    \"description\": \"Due by 12pm\"\n  },\n  {\n    \"summary\": \"Online Activity Week 5: Intellectual Property\",\n    \"start\": {\"date\": \"2024-10-07\"},\n    \"end\": {\"date\": \"2024-10-07\"},\n    \"description\": \"Due by 12pm\"\n  },\n  {\n    \"summary\": \"Online Activity: Intellectual Property\",\n    \"start\": {\"date\": \"2024-10-14\"},\n    \"end\": {\"date\": \"2024-10-14\"},\n    \"description\": \"Due by 12pm\"\n  },\n  {\n    \"summary\": \"Midterm Exam (25%)\",\n    \"start\": {\"dateTime\": \"2024-10-16T15:45:00-07:00\"},\n    \"end\": {\"dateTime\": \"2024-10-16T17:00:00-07:00\"},\n    \"description\": \"In-person in CSIL\"\n  }\n]"
                }
              ]}

            //Reponse.data should be an array
            if (Array.isArray(response.data) && response.data.length > 0) {
                const calendarEvents = response.data[0];
                
                setResponseData(calendarEvents);
                setFile(null);
                console.log(calendarEvents);

                navigate('/summary', {state: { data: calendarEvents }})
                
                console.log('Read Image API Response:', response);
            } else {
                console.error('Response data array does not contain elements'); 
            }

        } catch (error) {
            console.error('Error reading image:', error);
        }
    };

    const handleCancel = () => {
        setFile(null);
    }

    const handleSubmit = () => {
        handleImageSubmit(file);
    }



    return (
        <>  
            <div 
                onDrop = {handleDrop} 
                onDragOver = {handleDragOver}
                className = "flex items-center justify-center w-10/12 h-3/4 border-4 border-slate-300 border-dashed rounded-lg"
            >
                {file && 
                    <>
                        <p>File Uploaded: {file.name}</p>
                        <div className="flex gap-4 m-4">
                            <button 
                                className="text-white py-2 px-4 rounded-lg border-0 bg-sky-500 font-bold hover:bg-sky-300 hover:cursor-pointer"
                                onClick={handleSubmit}
                            > 
                                Submit 
                            </button>

                            <button 
                                className="text-white py-2 px-4 rounded-lg border-0 bg-sky-500 font-bold hover:bg-sky-300 hover:cursor-pointer"
                                onClick={handleCancel}
                            > 
                                Cancel 
                            </button>
                        </div>
                    </>
                    
                }
                {!file && 
                    <>
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
                        </>
                    
                }
            </div>
        </>
    )

}