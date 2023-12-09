import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

// Country component to display a bar chart based on selected country
const Country = ({ data }) => {
    // Ref for chart canvas
    const chartRef = useRef(null);

    // State to track the selected country
    const [selectedCountry, setSelectedCountry] = useState('United States of America');

    // State to store unique country names
    const [countryList, setCountryList] = useState([]);

    // Effect to extract unique country names when data changes
    useEffect(() => {
        const countries = [...new Set(data.map(entry => entry.country))];
        setCountryList(countries);
    }, [data]);

    // Effect to render or update the chart when the selected country or data changes
    useEffect(() => {
        // Get the chart canvas element
        const chartNode = document.getElementById('countryChart');

        // Cleanup previous chart instance if it exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Filter data based on the selected country
        const filteredData = selectedCountry
            ? data.filter(entry => entry.country === selectedCountry)
            : [];

        // Group data by sector and calculate average intensity
        const sectors = [...new Set(filteredData.map(entry => entry.sector))];
        const sectorData = sectors.map(sector => {
            const sectorEntries = filteredData.filter(entry => entry.sector === sector);
            const intensitySum = sectorEntries.reduce((sum, entry) => sum + entry.intensity, 0);
            const averageIntensity = intensitySum / sectorEntries.length;
            return {
                sector,
                averageIntensity,
            };
        });

        // Render the new bar chart
        const newChart = new Chart(chartNode, {
            type: 'bar',
            data: {
                labels: sectorData.map(entry => entry.sector),
                datasets: [
                    {
                        label: `Average Intensity`,
                        data: sectorData.map(entry => entry.averageIntensity),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(255, 206, 86, 0.8)',
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(153, 102, 255, 0.8)',
                        ],
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        });

        // Update the chart ref with the new instance
        chartRef.current = newChart;

        // Ensure proper cleanup when the component unmounts
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data, selectedCountry]);

    // Handler for country selection change
    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    // Render the component
    return (
        <div style={{ width: '100%', height: '500px' }}>
            {/* Country selection dropdown */}
            <label htmlFor="countrySelect">Select Country:</label>
            <select id="countrySelect" onChange={handleCountryChange} value={selectedCountry}>
                {countryList.map(country => (
                    <option key={country} value={country}>
                        {country}
                    </option>
                ))}
            </select>

            {/* Canvas element for the chart */}
            <canvas id="countryChart" width="100%" height="400"></canvas>
        </div>
    );
};

// Export the component
export default Country;
