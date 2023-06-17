import { useState, useRef, useEffect } from "react";
import Chart from "chart.js";
import Style from "/styles/PageStandard.module.css";
import ButtonStyle from "/styles/ProfileActivities.module.css";
import Swal from "sweetalert2";
import ChartStyle from 'styles/chart.module.css'

async function fetchWeights() {
    try {
        const response = await fetch('/api/fetchWeights', {
            method: 'GET',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export default function LineChart() {
    const [weightData, setWeightData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const chartRef = useRef(null);

    useEffect(() => {
        (async () => {
            const fetchedWeightData = await fetchWeights();
            setWeightData(fetchedWeightData.weight);
            setIsLoading(false);
        })();
    }, []);

    useEffect(() => {
        renderChart();
    }, [weightData]);

    async function handleWeightInput(weight) {
        Swal.fire({
            title: "Enter Weight",
            input: "number",
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Add",
            cancelButtonText: "Cancel",
            showLoaderOnConfirm: true,
            preConfirm: (inputWeight) => {
                return new Promise((resolve) => {
                    setTimeout(async () => {
                        if (inputWeight === "" || inputWeight === null) {
                            Swal.showValidationMessage("Weight is required");
                            resolve();
                        } else {
                            setWeightData([...weightData, Number(inputWeight)]);
                            resolve();
                            try {
                                console.log(inputWeight);
                                let response = await fetch('/api/addWeightToDB', {
                                    method: 'POST',
                                    body: JSON.stringify({ weight: Number(inputWeight) }),
                                    headers: {
                                        Accept: "application/json, text/plain, */*",
                                        "Content-Type": "application/json",
                                    },
                                });
                                console.log(response);
                            } catch (error) {
                                console.log("Encountered an error adding weight:", error);
                            }
                        }
                    }, 500);
                });
            }
        });
    }
    


    const renderChart = () => {
        if (!weightData.length || !chartRef.current) {
            return;
        }

        const ctx = chartRef.current.getContext("2d");
        const labels = Array.from(
            { length: weightData.length },
            (_, index) => `Data ${index + 1}`
        );

        new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        data: weightData,
                        label: "Weight",
                        borderColor: "#3e95cd",
                        backgroundColor: "#7bb6dd",
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    return (
        <>
            <div className={Style.chartContainer}>
                <div className={Style.inner}>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <canvas id="myChart" ref={chartRef}></canvas>
                            <button className={ButtonStyle.button} onClick={() => handleWeightInput(weightData)}>Add Weight</button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
