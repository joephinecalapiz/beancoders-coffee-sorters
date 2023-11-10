import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import feather from 'feather-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import api_endpoint from '../../config';
import Sidebar from '../../component/Sidebar';
import Topbar from '../../component/Topbar';
import "../.././css/Dashboard.css";

const ChartComponent = () => {
    const [navVisible, showNavbar] = useState(false);
    const chartRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [beanCount, setBeanCount] = useState([]);
    const [goodBeansCount, setGoodBeansCount] = useState(0); // New state for good beans count
    const [countDate, setCountDate] = useState('');

    useEffect(() => {
        feather.replace({ 'aria-hidden': 'true', 'width': '50', 'height': '50' });
    }, []);

    useEffect(() => {
        axios.get(api_endpoint + "/count").then((response) => {
            const beanData = response.data.beans;
            console.log(beanData)
            // Set the "good beans" counts array to beanCount state
            setBeanCount(beanData);
        });
    }, []);

    console.log(beanCount.good)



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

        // Filter products based on selected date
        const beanCounts = selectedDate
            ? beanCount.filter((beans) => {
                const updatedTime = beans.updated_at.toDate();
                return updatedTime.toDateString() === selectedDate.toDateString();
            })
            : beanCount;

        if (!Array.isArray(beanCounts)) {
            // Handle the case where beanCounts is not an array
            console.error('beanCounts is not an array:', beanCounts);
            return;
        }

        // Process beanCount data and update quantitiesByDay using reduce
        const updatedQuantitiesByDay = beanCounts.reduce((quantitiesByDay, beans) => {
            if (beans.created_at) {
                const updatedTime = beans.updated_at.toDate();
                const dayIndex = updatedTime.getDay();
                const goodBeans = beans.good;
                quantitiesByDay[dayIndex] += goodBeans; // Multiply by goodBeansCount
            }
            return quantitiesByDay;
        }, [...quantitiesByDay]); // Clone the quantitiesByDay array to avoid mutating the original

        // Update quantitiesByDay state with the new data
        // setQuantitiesByDay(updatedQuantitiesByDay);



        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: daysOfWeek,
                datasets: [
                    {
                        data: updatedQuantitiesByDay,
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


    const toggleSidebar = () => {
        showNavbar(!navVisible);
    };

    return (
        <>
            <div
                className={`p-0 ${navVisible ? "ml-0" : "sm:ml-0"}`}
                style={{
                    transition: "margin-left 0.3s ease",
                    marginTop: "-20px",
                }}
            >
                <div className="d-flex flex-wrap align-items-start border-bottom m-10">
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group me-2">
                            <span data-feather="calendar" className="calendar-icon"></span>
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                className="relative btn btn-sm mt-3 ml-3 dark:bg-container btn-outline-secondary"
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
                <canvas className="chart my-4 w-100 m-3" id="myChart" width="500" height="150"></canvas>
            </div>
        </>
    );
};

export default ChartComponent;
