import React from 'react'
import {Doughnut} from 'react-chartjs-2'
import { chartColors } from "./colors";
import Chart from 'chart.js/auto';



function Donutchart() {
    const options = {
        
        elements: {
            arc: {
              borderWidth: 2,
              borderColor: '#ffffff'

            }
          },
        legend :{
            display:true,
        }
      };
      const data = {
        labels: ["a", "b", "c", "d","e","f"],
        datasets: [
          { label: 'My First Dataset',
            data: [300, 50, 100, 50,200,58],
            backgroundColor: chartColors,
            hoverBackgroundColor: chartColors
          }
        ]
      };

  return (
      <div>
        
        <Doughnut data={data} options={options} />
      </div>
    
  )
}

export default Donutchart