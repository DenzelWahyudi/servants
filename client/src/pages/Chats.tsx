import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Heading } from "../components/Heading";
import { useAuth } from "../hooks/useAuth";
import { API_URL } from "../api"

export function Chats() {

    return(
        <div className="mx-auto p-4 sm:px-12 py-5 flex flex-col gap-13">
            <Header variant="openings" />
            <div className="-mt-8">
                <Heading>Chats</Heading>
            </div>
            
            <Footer />
        </div>
    )
}
