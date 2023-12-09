import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { colors } from '../../assets/color';

const LikelihoodChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartNode = document.getElementById('likelihoodChart');

        // Destroy previous chart before rendering a new one
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Extract unique countries from the data
        const countries = [...new Set(data.map(entry => entry.country))];

        // Calculate average likelihood for each country
        const countryData = countries.map((country, index) => {
            const countryEntries = data.filter(entry => entry.country === country);
            const avgLikelihood = countryEntries.reduce((sum, entry) => sum + entry.likelihood, 0) / countryEntries.length;
            return {
                country,
                avgLikelihood,
                color: colors[index],
            };
        });

        // Render the new chart
        const newChart = new Chart(chartNode, {
            type: 'pie',
            data: {
                labels: countryData.map(entry => `${entry.country}: Average Liklihood ${entry.avgLikelihood.toFixed(2)}`),
                datasets: [{
                    data: countryData.map(entry => entry.avgLikelihood),
                    backgroundColor: countryData.map(entry => entry.color),
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 10,
                            padding: 15,
                        },
                    },
                },
                tooltips: {
                    callbacks: {
                        label: (tooltipItem, data) => {
                            const dataset = data.datasets[tooltipItem.datasetIndex];
                            const value = dataset.data[tooltipItem.index];
                            return data.labels[tooltipItem.index];
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
            <canvas id="likelihoodChart" width="500px" height="300px"></canvas>
        </div>
    );
};

export default LikelihoodChart;
