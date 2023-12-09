import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const IntensityChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartNode = document.getElementById('intensityChart');

        // Check if the chartNode exists before rendering
        if (!chartNode) {
            return;
        }

        // Destroy previous chart before rendering a new one
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Extract both start and end years from data for x-axis labels
        const allYears = data.reduce((years, entry) => {
            if (entry.start_year && entry.end_year) {
                years.push(`${entry.start_year}-${entry.end_year}`);
            } else if (entry.start_year) {
                years.push(`${entry.start_year}`);
            } else if (entry.end_year) {
                years.push(`${entry.end_year}`);
            }
            return years;
        }, []);

        // Sort the years in ascending order
        const sortedYears = allYears.slice().sort();

        // Render the new chart
        const newChart = new Chart(chartNode, {
            type: 'bar',
            data: {
                labels: sortedYears,
                datasets: [{
                    label: 'Intensity',
                    data: data.map(entry => entry.intensity),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }],
            },
            options: {
                scales: {
                    x: {
                        type: 'category',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'Year',
                        },
                    },
                    y: {
                        type: 'linear',
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Intensity',
                        },
                    },
                },
            },
        });

        chartRef.current = newChart;

        // Ensure proper cleanup when the component unmounts
        return () => {
            newChart.destroy();
        };
    }, [data]);

    return (
        <div style={{ maxWidth: '100%', maxHeight: '300px' }}>
            <canvas id="intensityChart" width="500px" height="300px"></canvas>
        </div>
    );
};

export default IntensityChart;
