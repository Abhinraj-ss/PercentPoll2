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
    layout:{
      padding:0
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
          position: 'left',
          align: 'center',
          maxWidth:400,
          maxHeight:70,
          labels:{
            boxWidth:180,
            boxHeight:25,
            padding:40,
            font: {
              size: 22  
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
      <div>
        <Doughnut  data={data} options={options} />
      </div>
    
  )
}

export default Donutchart