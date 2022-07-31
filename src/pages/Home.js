import React from "react";
import "./Home.css"
import Clock from "../components/Clock";
import Covid19Status from "../components/Covid19Status";
import Weather from "../components/Weather";
import Poem from "../components/Poem";
import Hot from "../components/Hot";


function Home() {
    return (
        <>
            <div className={"top"}>
                TOP
            </div>
            <div className={"side"} style={{float: "left"}}>
                <Covid19Status />
                <Hot />
            </div>
            <div className={"side"} style={{float: "right"}}>
                <Clock />
                <Weather />
            </div>
            <div className={"bottom"}>
                BOTTOM
            </div>
            <div className={"middle"}>
                <Poem />
            </div>
        </>
    );
}

export default Home;
