import FileDragDrop from "../components/FileDragDrop";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {

    


    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-5xl">Home Page</h1>

                <FileDragDrop />
            </div>

        </>
    )
}