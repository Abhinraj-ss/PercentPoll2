import React,{ useState, useEffect} from 'react'
import ResponsiveAppBar from './Components/AppBar/AppBar'
import CreatePoll from './Components/CreatePoll/CreatePoll'

function App() {
  const[ data, setData] = useState([{}])
  useEffect (() => {
      fetch("/members").then(
        res => res.json()
      ).then(
        data =>{
          setData(data)
          console.log(data)
        }
      )
    },[]
  )
  return (
    <div>
      <ResponsiveAppBar/>
      {(typeof data.members === 'undefined')?(
        <p> Loading....</p>
      ): (
        data.members.map((member, i) => (
          <p key={i}> {member}</p>
        ))
      )}
      <CreatePoll/>
    </div>
  )
}

export default App