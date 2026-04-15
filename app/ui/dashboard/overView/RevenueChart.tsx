'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js/auto';
// import './tailwindcss/tailwind.css';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        callback: (value) => `Rs. ${value}`, // Format y-axis values as currency
      },
      grid: {
        drawBorder: true as any,
        borderDash: [5, 5] as any,
      } as any,
    },
  },
};


type RevenueData = {
  month: string; 
  totalRevenue: number | null;
};

type DataProps = {
  data: RevenueData[]; 
};

const RevenueChart: React.FC<DataProps> = ({data}) => {

  const labels = data?.map(item => item?.month);
  const chartData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Revenue (in INR)',
        // data: data.map(item => item?.totalRevenue),
        data: [12999],
        backgroundColor: '#353535',
        borderRadius: 10,
        borderSkipped: false, // Remove border-skipping on bar edges
      },
    ],
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <p className='text-[14px] font-semibold text-gray-400'>Total Revenue</p>
      <h2 className="text-[20px] font-bold mb-4 text-gray-800">
        INR {data?.reduce((total: any, item) => total + item?.totalRevenue, 0).toFixed(2)}
      </h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RevenueChart;
