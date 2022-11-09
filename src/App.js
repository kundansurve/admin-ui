import logo from './logo.svg';
import './App.css';
import DisplayList from './components/displayList';
import { useEffect, useState } from 'react';

function App() {
  const [data,setData]=useState(null);

  useEffect(()=>{
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
    .then(response=>response.json())
    .then((Data)=>{
      
      setData(Data);
    }).catch(error=>{
      console.group(error);
    })
  },[])

  return (
    <div className="App" >
      <div style={{width:"80%",margin:"auto"}}>
        <DisplayList data={data}/>
      </div>
    </div>
  );
}

export default App;
