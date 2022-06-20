import React from 'react'
import {Doughnut} from 'react-chartjs-2'
import { chartColors } from "./colors";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);


function Donutchart(props) {
  var arr = props.poll.pollOptions

  const pollOptions = (arr.map((item)=>(item.poll_option)))
  const pollCount =(arr.map((item)=>(item.option_count)))
  console.log(arr,pollOptions,pollCount)
  

  const options = {
    maintainAspectRatio:false,
    responsive:true,
    layout:{
      autoPadding:true
    },
    elements: {
        arc: {
          borderWidth: 1,
          borderColor: '#ffffff'
        }
      },
      
      plugins: {
        legend: {
          display:true,
          position:'top',
          align: 'start',
          labels:{
            font: {
              size: 15   
          }
          }
        }
      }
    
  }
  const data ={
    labels: pollOptions,
    datasets: [
      { 
        data:pollCount ,
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors
      }
    ]
  }
  console.log(data)
  return (
        <Doughnut  data={data} options={options} />
    
  )
}

export default Donutchart