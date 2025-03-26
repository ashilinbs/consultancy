import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    ArcElement, 
    Title, 
    Tooltip, 
    Legend 
} from "chart.js";

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Analysis = () => {
    // Sample Bar Chart Data (Sales Data)
    const barChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Total Sales ($)",
                data: [12000, 15000, 13000, 17000, 20000, 22000], // Sample sales data
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

    // Sample Pie Chart Data (Category-wise sales distribution)
    const pieChartData = {
        labels: ["Electronics", "Groceries", "Clothing", "Furniture", "Accessories"],
        datasets: [
            {
                label: "Sales Distribution",
                data: [30000, 25000, 20000, 15000, 10000], // Sample category sales
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"],
                hoverOffset: 4,
            },
        ],
    };

    // Chart Options
    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Monthly Sales Data" },
        },
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Sales Overview</h2>

            {/* Bar Chart */}
            <div className="mb-6">
                <Bar data={barChartData} options={options} />
            </div>

            {/* Pie Chart */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Sales Distribution</h3>
                <Pie data={pieChartData} />
            </div>
        </div>
    );
};

export default Analysis;
