import { useState, useRef, useEffect } from "react";
import Chart from "chart.js";
import Style from "/styles/PageStandard.module.css";
import Swal from "sweetalert2";
import NavigationPanel from "/components/navigationPanel/NavigationPanel";
import { myProgressLinks } from "/components/navigationPanel/NavigationPanelLinksList";

// Function to fetch weights from the server
async function fetchWeights() {
    try {
      const response = await fetch("/api/fetchWeights", {
        method: "GET",
      });
      const data = await response.json();
      return data.weights;
    } catch (error) {
    }
  }

// Define the LineChart component as the default export
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
        if(weightData)
          renderChart();
      }, [weightData]);

    // Function to handle the weight input
    async function handleWeightInput() {
        var weight;
        Swal.fire({
            title: "Enter Weight",
            input: "number",
            inputAttributes: {
                autocapitalize: "off",
                step: "any" // Allow decimal values
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
                        }
                        else if(weight < 0 ){
                          Swal.showValidationMessage("Weight is too small, you're not that skinny...");
                          resolve();
                        }
                        else if(weight > 1000){
                          Swal.showValidationMessage("Weight is too big, you're not that fat...");
                          resolve();
                        }
                        else {
                            updateToDB(weight);
                            resolve();
                            renderChart();
                        }
                    }, 500);
                });
            }
        })
    };
    
    // Function to update the weight data in the database
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

    // Function to render the chart
    const renderChart = () => {
        var ctx = document.getElementById("myChart").getContext("2d");
        let labels;
        
        labels = Array.from({ length: weightData.length }, (_, index) => `Data ${index + 1}`);

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
        
    return (
        <>
        <NavigationPanel links={myProgressLinks} />
            <div className={Style.innerForGraph}>
                <div className={Style.chartContainer}>
                  <div className={Style.chart}><canvas id="myChart"></canvas></div>
                   <div className={Style.chartButtons}>
                   <button className={Style.chartbutton} onClick={() => handleWeightInput()}>Add Weight</button>
                   </div>
                </div>
          </div>
        </>
    );
}

export default LineChart;