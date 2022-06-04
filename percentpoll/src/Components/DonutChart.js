import React from 'react'
import {Doughnut} from 'react-chartjs-2'
import { chartColors } from "./colors";
import {Chart,ArcElement} from 'chart.js'
Chart.register(ArcElement)


function Donutchart() {
    const options = {
        
        elements: {
            arc: {
              borderWidth: 2,
              borderColor: '#ffffff'

            }
          }
      };
      const data = {
        labels: ["a", "b", "c", "d"],
        datasets: [
          { label: 'My First Dataset',
            data: [300, 50, 100, 50],
            backgroundColor: chartColors,
            hoverBackgroundColor: chartColors
          }
        ]
      };

  return (
      <>
        <div>DonutChart</div>
        <Doughnut data={data} options={options} />
      </>
    
  )
}

export default Donutchart