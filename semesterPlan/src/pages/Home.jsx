import FileDragDrop from "../components/FileDragDrop";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";

export default function Home() {

    
    const LOCAL_HOST_URL = 'http://localhost:8000';

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-5xl">Home Page</h1>

                <FileDragDrop />
            </div>



        
        </>




    )


}