
import React from "react";
import Pagination from "./pagination";
import ListCard from "./listCard";
import { useState, useEffect } from "react";

const DisplayList = (props) => {
  const [active, setActive] = React.useState(1);
  const activeHandler = (clickedActive) => {
    setActive(parseInt(clickedActive));
  };

  const [data, setData] = React.useState(null);
  const [toDelete,setToDelete] = useState([]);
  const [searchData, setSearchData] = React.useState("");

  const onDelete=(id)=>{
    const newSearchData = [];
    const newData=[];
      for (let element of data) {
        if(element.id!=id)newData.push(element);
    }
    for (let element of searchData) {
      if(element.id!=id)newSearchData.push(element);
  }
    setSearchData(newSearchData);
    setData(newData);
  }

  const onDeleteMultiple=()=>{
    const newSearchData = [];
    const newData = [];
      for (let element of data) {
        if( toDelete.includes(element.id))continue;

        newData.push(element);
    }
    for (let element of searchData) {
      if( toDelete.includes(element.id))continue;

      newSearchData.push(element);
  }
    setSearchData(newSearchData);
    setData(newData);
    setToDelete([]);
  }


  const onSearch = (key) => {
    if (key === "") {
      const newSearchData = [];
      for (let element of data) {
        newSearchData.push(element);

      }
      setSearchData(newSearchData);
      return;
    }
    const newSearchData = [];
    for (let element of data) {

      if(element.name.toLowerCase().startsWith(key.toLowerCase()))newSearchData.push(element);
    }
    setSearchData(newSearchData);
  }

  const selectFunc = (id)=>{
    
    let flag=false;
    const newToDelete = toDelete;
    newToDelete.push(id);
    setToDelete(newToDelete);
  }

  const unSelectFunc = (id)=>{
    const newToDelete=[];
    for(let element in toDelete){
      if(element!=id){
        newToDelete.push(element);
      }
    }setToDelete(newToDelete);
  }

  const save=(id,name,email,role)=>{
    const newSearchData = [];
    const newData = [];
      for (let element of data) {
        if( element.id===id){
          newData.push({id,name,email,role});
          continue;
        }
        newData.push(element);
    }
    for (let element of searchData) {
      if( element.id===id){
        newSearchData.push({id,name,email,role});
        continue;
      }
      newSearchData.push(element);
  }
    setSearchData(newSearchData);
    setData(newData);
    setToDelete([]);
  }
  useEffect(() => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(response => response.json())
      .then((Data) => {
        setData(Data);
        setSearchData(Data);
      }).catch(error => {
        console.group(error);
      })
  }, [])

  return (<div style={{ display: "flex", minWidth: "600px", overflowX: "scroll", justifyContent: "center", width: "100%", alignItems: "center", flexDirection: "column" }}>
    
    <input style={{padding:"0.5em",borderRadius:"5px",width:"90%",margin:"1em"}} type="text" placeholder="Search by name" onChange={(e) => { onSearch(e.target.value) }}/>
    <div style={{ display: "flex", scrollbarWidth: "thin", width: "100%", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid black", padding: "1em 2em" }}>
      <input type="checkbox" disabled style={{ padding: "0em" }} onChange={(e) => { onSearch(e.target.value) }} />
      <span style={{ width: "250px", margin: "0 10px" }} >Name</span>
      <span style={{ width: "250px", margin: "0 10px" }}>Email</span>
      <span style={{ width: "250px", margin: "0 10px" }}> Role</span>
      <span style={{ width: "100px", margin: "0 10px" }}>Actions</span>
    </div>
    {(searchData) ? searchData.slice((active-1) * 10, Math.min(searchData.length, (active-1) * 10 + 10)).map((element) => {
      return <ListCard key={element.id} save={save} name={element.name} onDelete={onDelete} email={element.email} role={element.role} id={element.id} unSelectIt={unSelectFunc} selectIt = {selectFunc} toDelete={toDelete} />
    }) : <>Loading...</>}
    <div style={{ width: "90%", margin: "1em", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <button onClick={onDeleteMultiple} style={{ color: "white", backgroundColor: "#ff5171", borderRadius: "20px", border: "none", padding: "1em", margin: "1em" }}> Delete Selected</button>
      <Pagination
        active={active}
        size={(searchData) ? ((searchData.length) / 10 + ((searchData.length) % 10 == 0 ? 0 : 1)) : 0}
        step={2}
        onClickHandler={activeHandler}
      />
    </div>

  </div>

  );
};

export default DisplayList;