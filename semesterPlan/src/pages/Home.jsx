import FileDragDrop from "../components/FileDragDrop";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import PageCard from "../components/PageCard";

export default function Home() {


    return (
        <>
            <PageCard className="w-10/12 h-5/6 p-6 gap-4">
                <h1 className="text-5xl font-semibold mb-8">Home Page</h1>

                <FileDragDrop />

            </PageCard>

        </>
    )
}