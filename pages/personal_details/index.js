import { useState, useRef, useEffect } from "react";
import Chart from "chart.js";
import Style from "/styles/PageStandard.module.css";
import ButtonStyle from "/styles/ProfileActivities.module.css";
import Swal from "sweetalert2";
import ChartStyle from 'styles/chart.module.css'
import NavigationPanel from "/components/navigationPanel/NavigationPanel";
import { myProgressLinks } from "/components/navigationPanel/NavigationPanelLinksList";


async function fetchWeights() {
    try {
      const response = await fetch("/api/fetchWeights", {
        method: "GET",
      });
      const data = await response.json();
      console.log(data.weights)
      return data.weights;
    } catch (error) {
      console.log(error);
    }
  }


function LineChart() {
    const [weightData, setWeightData] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        (async () => {
            const fetchedWeightData = await fetchWeights();
            setWeightData(fetchedWeightData);
        })();
    }, []);

    useEffect(() => {
        console.log(weightData);
        renderChart();
      }, [weightData]);

    console.log(weightData)
    async function handleWeightInput() {
        console.log(weightData)
        var weight;
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
                weight = Number(inputWeight);
                return new Promise((resolve) => {
                    setTimeout(() => {
                        if (weight === "" || weight === null) {
                            Swal.showValidationMessage("Weight is required");
                            resolve();
                        } else {
                            updateToDB(weight);
                            resolve();
                            renderChart();
                        }
                    }, 500);
                });
            }
        })
    };

    async function updateToDB(weight){
        try {
            setWeightData([...weightData, Number(weight)]);
            let response = await fetch('/api/addWeightToDB', {
                method: 'POST',
                body: Number(weight),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            console.log("Encountered an error adding weight:", error);
        }
    }

    const renderChart = () => {
        console.log(weightData)
        var ctx = document.getElementById("myChart").getContext("2d");

        const labels = Array.from({ length: weightData.length }, (_, index) => `Data ${index + 1}`);

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
                  fill: false,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }

        const handleRefresh = () => {
            window.location.reload(); // Refresh the page
          }

    return (
        <>
        <NavigationPanel links={myProgressLinks} />
            <div className={Style.chartContainer}>
                <div className={Style.innerForGraph}>
                    <canvas id="myChart"></canvas>
                    <button className={ButtonStyle.button} onClick={() => handleWeightInput()}>Add Weight</button>
                    <button className={ButtonStyle.button} onClick={handleRefresh}>Refresh</button>
                </div>
            </div>
        </>
    );
}

export default LineChart;