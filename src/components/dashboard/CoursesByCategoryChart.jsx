import  { useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const CoursesByCategoryChart = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/dashboard/by-category');
                createChart(response.data);
            } catch (error) {
                console.error('Error fetching course categories:', error);
            }
        };

        const createChart = (data) => {
            const ctx = chartRef.current.getContext('2d');

            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(item => item.categoryName),
                    datasets: [{
                        label: 'Nombre de cours',
                        data: data.map(item => item.count),
                        backgroundColor: 'rgba(54, 162, 235, 0.7)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Cours par catégorie'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Nombre de cours'
                            }
                        }
                    }
                }
            });
        };

        fetchData();

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div className="chart-wrapper">
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default CoursesByCategoryChart;