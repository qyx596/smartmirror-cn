import React from "react";
import "./Home.css"
import Clock from "../components/Clock";
import Weather from "../components/Weather";
import Sentence from "../components/Sentence";
import Hot from "../components/Hot";
import Covid19Status from "../components/Covid19Status";
import News from "../components/News";
import Finance from "../components/Finance";

function Home() {
    return (
        <>
            {/*<div className={"top"} id={"top"}>*/}
            {/*    <Finance />*/}
            {/*</div>*/}
            <div className={"side"} style={{float: "left"}}>
                <div style={{width: "80%"}}>
                    <Covid19Status />
                </div>
                <br />
                <div style={{width: "80%"}}>
                    <Hot />
                </div>
            </div>
            <div className={"side"} style={{float: "right"}} id={"right"}>
                <div style={{width: "20em", float: "right"}}>
                    <Clock />
                    <br />
                    <Weather />
                </div>
            </div>
            <div className={"bottom"} id={"bottom"}>
                <News />
            </div>
            <div className={"middle"} id={"middle"}>
                <Sentence />
            </div>
        </>
    );
}

export default Home;
