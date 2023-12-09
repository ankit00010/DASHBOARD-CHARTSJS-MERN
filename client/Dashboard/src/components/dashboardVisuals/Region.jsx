import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const RegionChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0) {
            return;
        }

        // Extract unique region names
        const uniqueLabels = [...new Set(data.map((entry) => entry.region))];

        // Count the number of articles for each unique region
        const articleCounts = uniqueLabels.map((label) =>
            data.filter((entry) => entry.region === label).length
        );

        // Data for the area chart
        const chartData = {
            labels: uniqueLabels,
            datasets: [
                {
                    label: 'Number of Articles',
                    data: articleCounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Area color
                    borderColor: 'rgba(75, 192, 192, 1)', // Border color
                    borderWidth: 1,
                },
            ],
        };

        // Chart configuration
        const chartOptions = {
            scales: {
                x: {
                    beginAtZero: true,
                },
            },
            plugins: {
                legend: {
                    display: false, // Hide legend
                },
            },
        };

        // Create the area chart
        const myChart = new Chart(chartRef.current, {
            type: 'line', // Area chart is a modified line chart
            data: chartData,
            options: chartOptions,
        });

        // Cleanup the chart on component unmount
        return () => {
            myChart.destroy();
        };
    }, [data]);

    return (
        <div style={{ maxWidth: '100%', maxHeight: '300px' }}>
            <h2>Region Chart</h2>
            <canvas ref={chartRef} width="500px" height="300px"></canvas>
        </div>
    );
};

export default RegionChart;
