import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import axios from "axios";
import { useEffect, useState } from "react";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function ChartSection({ start, end}) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!start || !end) return;

    axios
      .get(
        `http://localhost:5000/api/chart?shoe=Adidas Ultraboost&start=${start}&end=${end}`
      )
      .then((res) => {
        const apiData = res.data;

        // 🔥 Generate all dates between start and end
        const allDates = [];
        let current = new Date(start);
        const last = new Date(end);

        while (current <= last) {
          allDates.push(new Date(current));
          current.setDate(current.getDate() + 1);
        }

        // 🔥 Match API data with full date range
        const formattedData = allDates.map((date) => {
          const found = apiData.find(
            (item) =>
              new Date(item.date).toDateString() ===
              date.toDateString()
          );

          return {
            date: date,
            sales: found ? found.sales : 0,
            clicks: found ? found.clicks : 0,
          };
        });

        setChartData(formattedData);
      })
      .catch((err) => console.error(err));
  }, [start, end]);

  const data = {
    labels: chartData.map((d) =>
      d.date.toLocaleDateString()
    ),
    datasets: [
      {
        label: "Sales",
        data: chartData.map((d) => d.sales),
        borderColor: "#2e86de",
        tension: 0.4,
      },
      {
        label: "Clicks",
        data: chartData.map((d) => d.clicks),
        borderColor: "#eb3b5a",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
  };

  if (!chartData.length) return <p>No data available</p>;

  return (
    <div style={{ height: "250px" }}>
      <Line data={data} options={options} />
    </div>
  );
}
