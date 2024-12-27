import FileDragDrop from "../components/FileDragDrop";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import PageCard from "../components/PageCard";

export default function Home() {


    return (
        <>
            <PageCard className="w-11/12 h-full p-6 gap-4 rounded-lg">
                <h1 className="text-4xl font-semibold mb-8">Upload an image of your course syllabus</h1>

                <FileDragDrop />

            </PageCard>

        </>
    )
}