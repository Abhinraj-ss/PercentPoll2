import React,{useEffect, useState} from 'react'
import {Doughnut} from 'react-chartjs-2'
import { chartColors } from "./colors";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);


function Donutchart(props) {
  var arr = JSON.parse(props.poll.pollOptions)

  const [pollOptions,setPollOptions] = useState(arr.map((item)=>(item.poll_option)))
  const [pollCount,setPollCount] =useState(arr.map((item)=>(item.option_count)))
  console.log(arr)
  
  const [options,setOptions] = useState({
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
    
  })
  const [data,setData] = useState({
    labels: pollOptions,
    datasets: [
      { 
        data: pollCount,
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors
      }
    ]
  })

  return (
      <div>
        <Doughnut  data={data} options={options} />
      </div>
    
  )
}

export default Donutchart