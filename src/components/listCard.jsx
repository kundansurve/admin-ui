import editIcon from './../icons/edit.png';
import deleteIcon from './../icons/delete.png';
import { useState } from 'react';

function ListCard(props){
    const [editMode,setEditMode]=useState(false);
    const [name,setName] = useState(props.name);
    
    const [email,setEmail] = useState(props.email);
    
    const [role,setRole] = useState(props.role);
    
    const [select,setSelect] = useState(false);
    const onDelete = props.onDelete;

    const saveFunc=props.save;
    const save = ()=>{
        saveFunc(props.id,name,email,role);
        setEditMode(false);
    }

    return <div  style={{key:props.id,display:"flex",scrollbarWidth:"thin",backgroundColor:(select)?"#e3e3e3":"",width:"100%",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid black",padding:"1em 2em"}}>
        <input type="checkbox" style={{padding:"0.5em"}} onChange={(e)=>{( e.target.checked)?props.selectIt(props.id)(setSelect(true)):props.unSelectIt(props.id);setSelect(false)}}></input>
        {(!editMode)?<><span style={{width:"250px",margin:"0 10px"}}>{props.name}</span>
        <span style={{width:"250px",margin:"0 10px"}}>{props.email}</span>
        <span style={{width:"250px",margin:"0 10px"}}>{props.role}</span></>
        :
        <><input style={{width:"200px",margin:"0 10px",padding:"0.5em",border:"none"}} name='name' value={name}  onChange={(e)=>{setName(e.target.value)}}/>
        <input style={{width:"200px",margin:"0 10px",padding:"0.5em",border:"none"}} name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <input style={{width:"200px",margin:"0 10px",padding:"0.5em",border:"none"}} name='role' value={role} onChange={(e)=>{setRole(e.target.value)}}/></>
        }
        <div style={{width:"100px",margin:"0 10px",display:"flex",justifyContent:"center",alignItems:"center"}}>
            {(!editMode)?<img src={editIcon} onClick={()=>{setEditMode(true);}} style={{width:"20px",margin:"0.5em"}} alt="edit" />:<button onClick={()=>{save()}} style={{padding:"0.5em",color:"white",background:"#4BB543",borderRadius:"5px",border:"none"}}>Save</button>}
            <img type='button' style={{width:"20px",margin:"0.5em"}} src={deleteIcon} alt="delete" onClick={()=>{props.onDelete(props.id)}} /></div>
    </div>;
}

export default ListCard;