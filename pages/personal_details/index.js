import { useState, useRef, useEffect } from "react";
import Chart from "chart.js";
import Style from "/styles/PageStandard.module.css";
import ButtonStyle from "/styles/ProfileActivities.module.css";
import Swal from "sweetalert2";
import ChartStyle from "styles/chart.module.css";
import NavigationPanel from "/components/navigationPanel/NavigationPanel";
import { myProgressLinks } from "/components/navigationPanel/NavigationPanelLinksList";


async function fetchWeights() {
  try {
    const response = await fetch("/api/fetchWeights", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data.weights);
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
    if (chartRef.current) {
      updateChart();
    } else {
      createChart();
    }
  }, [weightData]);

  async function handleWeightInput() {
    var weight;

    Swal.fire({
      title: "Enter Weight",
      input: "number",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Add",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      preConfirm: (inputWeight) => {
        weight = Number(inputWeight);
        return new Promise((resolve) => {
          setTimeout(() => {
            if (weight === 0 || weight === null) {
              Swal.showValidationMessage("Weight is required");
              resolve();
            } else {
              updateToDB(weight);
              resolve();
            }
          }, 500);
        });
      },
    }).then(() => {
      updateChart();
    });
  }

  async function updateToDB(weight) {
    try {
      setWeightData([...weightData, Number(weight)]);
      let response = await fetch("/api/addWeightToDB", {
        method: "POST",
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

  const createChart = () => {
    const ctx = document.getElementById("myChart").getContext("2d");

    const labels = Array.from(
      { length: weightData.length },
      (_, index) => `Data ${index + 1}`
    );

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            data: weightData,
            label: "Weight",
            borderColor: "rgba(123, 182, 221, 1)",
            backgroundColor: "rgba(123, 182, 221, 0.2)",
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Weight (kg)",
            },
          },
        },
      },
    });
  };

  const updateChart = () => {
    chartRef.current.data.datasets[0].data = weightData;
    chartRef.current.update();
  };

  const handleRefresh = () => {
    window.location.reload(); // Refresh the page
  };

  return (
    <>
      <NavigationPanel links={myProgressLinks} />
        <div className={Style.inner}>
          <canvas id="myChart"></canvas>
          <button className={ButtonStyle.button} onClick={handleWeightInput}>
            Add Weight
          </button>
          <button className={ButtonStyle.button} onClick={handleRefresh}>
            Refresh
          </button>
        </div>
    </>
  );
}

export default LineChart;
