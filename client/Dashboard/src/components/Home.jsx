import React from 'react';
import "../App.css";
import Relevance from "./dashboardVisuals/Relevance";
import Intensity from "./dashboardVisuals/Intensity";
import Country from "./dashboardVisuals/Country";
import Likelihood from "./dashboardVisuals/Likelihood";
import Topic from "./dashboardVisuals/Topic";
import Region from "./dashboardVisuals/Region";

function Home(props) {
    const chartContainerStyle = {
        margin: '5px 30px 5px 20px',
        border: '1px solid #000',
        borderRadius: '8px',
        padding: '10px',
    };

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h2 className='main-title-text'>Dashboard</h2>
            </div>
            <div className='charts'>
                <div className='chart-container' style={chartContainerStyle}>
                    <h3 className='chart-title'>Intensity Chart</h3>
                    <Intensity data={props.data} />
                </div>
                <div className='chart-container' style={chartContainerStyle}>
                    <h3 className='chart-title'>Likelihood Chart</h3>
                    <Likelihood data={props.data} />
                </div>
                <div className='chart-container' style={chartContainerStyle}>
                    <h3 className='chart-title'>Relevance Chart</h3>
                    <Relevance data={props.data} />
                </div>
                <div className='chart-container' style={chartContainerStyle}>
                    <h3 className='chart-title'>Country Chart</h3>
                    <Country data={props.data} />
                </div>

                <div className='chart-container' style={chartContainerStyle}>
                    <h3 className='chart-title'>Region Chart</h3>
                    <Region data={props.data} />
                </div>
                <div className='chart-container topic-chart' style={chartContainerStyle}>
                    <h3 className='chart-title'>Topic Chart</h3>
                    <Topic data={props.data} />
                </div>
            </div>
        </main>
    )
}

export default Home;
