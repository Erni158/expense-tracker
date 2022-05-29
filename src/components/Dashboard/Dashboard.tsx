import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import styles from './Dashboard.module.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Home', 'Food', 'Clothing', 'Transport'],
  datasets: [
    {
      label: '# of Votes',
      data: [308, 25, 126.52, 493.2],
      backgroundColor: [
        'rgba(255, 99, 132)',
        'rgba(54, 162, 235)',
        'rgba(255, 206, 86)',
        'rgba(75, 192, 192)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
      hoverOffset: 4
    },
  ],
};

const options = {
  plugins: {
    tooltip: {
      callbacks: {
        label(tooltipItems: any) {
          return `${tooltipItems.formattedValue} zł`
        }
      }
    }
  }
};

const Dashboard = () => {
  return (
    <div className={styles.root}>
      <div className={styles.chart}>
        <Doughnut data={data} options={options} />
      </div>
      <div>
        500 zł
      </div>
    </div>
  )
}

export default Dashboard;