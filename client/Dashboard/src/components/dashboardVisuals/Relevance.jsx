import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const RelevanceBySector = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartNode = document.getElementById('relevanceBySectorChart');

        // Destroy previous chart before rendering a new one
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Group data by sector and calculate averages
        const sectors = [...new Set(data.map(entry => entry.sector))];
        const sectorData = sectors.map(sector => {
            const sectorEntries = data.filter(entry => entry.sector === sector);
            const relevanceAverage = sectorEntries.reduce((sum, entry) => sum + entry.relevance, 0) / sectorEntries.length;
            const intensityAverage = sectorEntries.reduce((sum, entry) => sum + entry.intensity, 0) / sectorEntries.length;
            const likelihoodAverage = sectorEntries.reduce((sum, entry) => sum + entry.likelihood, 0) / sectorEntries.length;
            return {
                sector,
                relevanceAverage,
                intensityAverage,
                likelihoodAverage
            };
        });

        // Render the new polar area chart
        const newChart = new Chart(chartNode, {
            type: 'polarArea',
            data: {
                labels: sectorData.map(entry => entry.sector),
                datasets: [
                    {
                        label: 'Average Relevance',
                        data: sectorData.map(entry => entry.relevanceAverage),
                        backgroundColor: [
                            'rgba(69, 123, 157, 0.8)',
                            'rgba(116, 157, 42, 0.8)',
                            'rgba(198, 83, 103, 0.8)',
                            'rgba(74, 114, 125, 0.8)',
                            'rgba(178, 143, 91, 0.8)',
                            'rgba(128, 182, 171, 0.8)',
                            'rgba(198, 115, 70, 0.8)',
                            'rgba(72, 172, 126, 0.8)',
                            'rgba(206, 92, 131, 0.8)',
                            'rgba(120, 138, 171, 0.8)',
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
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const sectorEntry = sectorData[context.dataIndex];
                                return [
                                    `Relevance: ${sectorEntry.relevanceAverage.toFixed(2)}`,
                                    `Intensity: ${sectorEntry.intensityAverage.toFixed(2)}`,
                                    `Likelihood: ${sectorEntry.likelihoodAverage.toFixed(2)}`,
                                ];
                            },
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
            <canvas id="relevanceBySectorChart" width="500px" height="300px"></canvas>
        </div>
    );
};

export default RelevanceBySector;
