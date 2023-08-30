import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import feather from 'feather-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import api_endpoint from '../../config';

const ChartComponent = () => {
    const chartRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [beanCount, setBeanCount] = useState([]);
    const [goodBeansCount, setGoodBeansCount] = useState(0); // New state for good beans count
    const [countDate, setCountDate] = useState('');

    useEffect(() => {
        feather.replace({ 'aria-hidden': 'true', 'width': '50', 'height': '50' });
    }, []);

    useEffect(() => {
        if (selectedDate) {
            axios.get(api_endpoint + '/count', {
                params: { date: selectedDate.toISOString().substr(0, 10) } // Extract yyyy-mm-dd part
            }).then((response) => {
                const bean = response.data.beans;
                setGoodBeansCount(bean.good ?? 0);
                setCountDate(selectedDate.toISOString().substr(0, 10));
            });
            console.log(bean.good ?? 0);
        }
    }, [selectedDate]);
    


    useEffect(() => {
        const ctx = document.getElementById('myChart');

        // Destroy the previous Chart instance, if it exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Prepare the data for the chart
        const daysOfWeek = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        const quantitiesByDay = [0, 0, 0, 0, 0, 0, 0]; // Initialize quantities for each day of the week

    // Process beanCount data and update quantitiesByDay
    beanCount.forEach(bean => {
        const createdDate = new Date(bean.created_at);
        const createdDay = createdDate.getDay();
        quantitiesByDay[createdDay] += (goodBeansCount);
    });

        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: daysOfWeek,
                datasets: [
                    {
                        data: quantitiesByDay,
                        lineTension: 0,
                        backgroundColor: 'transparent',
                        borderColor: '#007bff',
                        borderWidth: 4,
                        pointBackgroundColor: '#007bff'
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                        labels: {
                            text: 'Beans',
                            fontSize: 16
                        }
                    }
                }
            }
        });
    }, [beanCount, selectedDate]);


    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-start pt-3 pb-2 mb-3 border-bottom m-10">
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="flex btn-group me-2">
                        <span data-feather="calendar" className="calendar-icon"></span>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            className="btn btn-sm m-2 btn-outline-secondary"
                            dateFormat="MMMM d, yyyy"
                            peekNextMonth
                            showMonthDropdown
                            placeholderText="mm-dd-yyyy"
                            showYearDropdown
                            dropdownMode="select"
                        />
                    </div>
                </div>
            </div>
            <canvas className="my-4 w-100 m-3" id="myChart" width="500" height="150"></canvas>
        </div>
    );
};

export default ChartComponent;
