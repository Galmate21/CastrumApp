import React from 'react'
import {useState, useEffect} from 'react';
import axios from 'axios';
import '../css/Home.css';
import {Form} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {requestPrint} from'../../src/bxlcommon.js';
import {printText,setPosId,setCharacterset,checkPrinterStatus,cutPaper,getPosData} from  '../../src/bxlpos.js'

function Cart() {
    const [kosar,setkosar]=useState([]);
    const [termek,settermek]=useState([]);
    const [ures,setures]=useState("");
    var osszeg=0;
    const [asztal,setasztal]=useState("");
    const [asztalnev,setasztalnev]=useState("");
    const [tobb,settobb]=useState("");
    const [log,setlog]=useState(false);
    const [orders,setorders]=useState([]);
    const [vissza,setvissza]=useState("")
    const [buttonShow,setButtonShow]=useState(false)
    var koret=0;
    var Afa27=0;

    var LF = "\n";
var issueID = 1;
var tmp = "123456789"
var _inch = 3;
var p_result=document.getElementById('p_result');
var p_name=document.getElementById('p_name');

function viewResult(result) {
  p_result.value = result;
}

function PrintReceipt() {

  var etelek=[];
  setPosId(issueID);
  setCharacterset(1250);
  checkPrinterStatus();
  for (let index = 0; index < kosar.length; index++) {
    if(kosar[index].type!=="Szorp"||kosar[index].type!=="Bor"||kosar[index].type!=="Sor"||kosar[index].type!=="Palinka"||kosar[index].type!=="Kave"||kosar[index].type!=="egyebItal"){
      etelek.push({count:kosar[index].count,name:kosar[index].name,info:kosar[index].info})
    }
  }
  if(etelek.length!==0){
  printText(asztal.replace(".","/")+"\n",2, 2, true, false, false, 0, 1);
  
  printText("---------------------------\n",2, 2, true, false, false, 0, 1);
  for (let index = 0; index < etelek.length; index++) {
    printText(etelek[index].count+" "+etelek[index].name+" ("+etelek[index].info+") "+"\n",2, 2, true, false, false, 0, 1);
    
  }
 
 // printText("\nMegjegyzés: "+"asd"+"\n",0, 1, true, false, false, 0, 1);
  }
  
  /*printText("Items 2                             1                   200.00\n", 0, 0, false, false, false, 0, 0);
  printText("Items 3                             1                   300.00\n", 0, 0, false, false, false, 0, 0);
  printText("Items 4                             1                   400.00\n", 0, 0, false, false, false, 0, 0);
  printText("Items 5                             1                   500.00\n", 0, 0, false, false, false, 0, 0);
  printText("--------------------------------------------------------------\n", 0, 0, false, false, false, 0, 0);
  printText("                                               Sub-Total 895.0\n", 0, 1, true, false, false, 0, 0);
  printText("                                               Discount    5.0\n", 0, 1, true, false, false, 0, 0);
  printText("                                              ----------------\n", 0, 0, false, false, false, 0, 0);
  printText("                                               Tax Total 200.0\n", 0, 1, true, false, false, 0, 0);
  printText("                                              ----------------\n", 0, 0, false, false, false, 0, 0);
  printText("                                               Total   1,000.0\n", 0, 1, true, false, false, 0, 0);
  printText("--------------------------------------------------------------\n", 0, 0, false, false, false, 0, 0);*/

  // error
  



cutPaper(1);

var strSubmit = getPosData();

console.log(strSubmit);

issueID++;
requestPrint(p_name.value, strSubmit, viewResult);

return true;


}
    
    useEffect(()=>{
        const cartItem=JSON.parse(localStorage.getItem('cart'))
        if(cartItem){
          setkosar(cartItem)
          setlog(true)
          setvissza("X")
        }
        else{
            setures("A kosara jelenleg üres!")
            setlog(false)
           
        }
       
      },[])

      
      useEffect(()=>{
        axios({
            method: 'get',
            url: `https://hidden-coast-90775.herokuapp.com/foods`,
            responseType: 'json'
          })
            .then((response)=> {
              settermek(response.data)
              
              
            });
      },[])

        
      useEffect(()=>{
        axios({
            method: 'get',
            url: `https://hidden-coast-90775.herokuapp.com/orders`,
            responseType: 'json'
          })
            .then((response)=> {
              setorders(response.data)
              
              
            });
      },[])

     const delFromCart=(i)=>{
         kosar.splice(i,1);
         setkosar([...kosar])
         localStorage.setItem("cart",JSON.stringify(kosar))
         if(kosar.length===0){
            localStorage.removeItem("cart")
            setures("A kosara jelenleg üres!")
            setlog(false)
            setasztal("")
            setvissza("")
            setButtonShow(false)
          }
     }

     const kivalasztas=()=>{
       if(asztalnev===""&&tobb===""){
        toast.warning(`Válassz asztalt!`, {
          position: "top-center"})
       
         return;
       }
      if(tobb!==""){
        setasztal(asztalnev+"."+tobb);
        
      }
      else{
        setasztal(asztalnev);
      }
      setlog(false)
      setButtonShow(true)
     }

     const rendelesLeadas=async(e)=>{
      e.preventDefault();
      if(asztalnev==="Válassz asztalt!"||asztalnev===""){
        toast.warning(`Válassz asztalt!`, {
          position: "top-center"})
       
        return;
      }
      if(asztal==="Válassz asztalt!"||asztal===""){
        toast.warning(`Válassz asztalt!`, {
          position: "top-center"})
        return;
      }
      PrintReceipt();

      var order=orders.find(order=>order._id===asztal)
      if(order){

        for (let index = 0; index < kosar.length; index++) {
          
          var item = order.rendelesek.find(item => item.name === kosar[index].name&&item.info.every(ai=>kosar[index].info.includes(ai))&&item.info.length===kosar[index].info.length);
          if(item){
            
            
            item.Price=item.Price/item.count
            item.count+=kosar[index].count
            item.Price=item.count*item.Price
           
           
          }
          else{
            order.rendelesek.push(kosar[index])
          }
         
          
          
          
        }
        
        order.osszeg=order.osszeg+osszeg
        order.koret=order.koret+koret
        order.Afa27=order.Afa27+Afa27
        try {
          const config={
            headers:{
              "Content-type":"application/json"
            }
          }
          await axios.put(`https://hidden-coast-90775.herokuapp.com/UpdateOrder/${asztal}`,{
            order:order.rendelesek,osszeg:order.osszeg,Afa27:order.Afa27,koret:order.koret
        },config)
        toast.success("Sikeresen szerkesztetted "+ asztal+" asztalt!", {
          position: "top-center"
        }); 
        localStorage.removeItem("cart")
        setkosar([])
        setTimeout(function () {
          window.location.assign(`/Elozmeny/${asztal}`)
            
         }, 3000);
            setures("A kosara jelenleg üres!")
            setlog(false)
            setasztal("")
            setvissza("")
            setButtonShow(false)
        } catch (error) {
          toast.error("Hiba!", {
            position: "top-center"})

        }

       
        return;
      }
      else{
        
        try {
          const config={
            headers:{
              "Content-type":"application/json"
            }
          }
         await axios.post(`https://hidden-coast-90775.herokuapp.com/Order`,{
          asztal,kosar,osszeg,Afa27,koret
        },config)
        toast.success("Sikeresen hozzáadtál egy új rendelést! :) ", {
          position: "top-center"
        }); 

        localStorage.removeItem("cart")
        setkosar([])
        setTimeout(function () {
          window.location.assign(`/Elozmeny/${asztal}`)
            
         }, 3000);
            setures("A kosara jelenleg üres!")
            setlog(false)
            setasztal("")
            setvissza("")
            setButtonShow(false)
          
        } catch (error) {
          toast.error("Hiba!", {
            position: "top-center"})
        }
      }


         
          }  

          const asztalvisszavonas=()=>{
            setlog(true);
            setasztal("")
          }

       
          

  return (
    <div>
         <h2>{ures}</h2>
        
         <h2 style={{textAlign:"center",display: log===true ? 'none' : ''}}>{asztal.replace(".","/")} <button
         className='btn btn-outline-danger' style={{marginLeft:"15px",display: buttonShow===false ? 'none' : ''}} onClick={asztalvisszavonas}>{vissza}</button></h2>
         <div className='d-flex'>
         <Form.Select style={{marginRight:"10px",width:"160px",marginBottom:"15px",display: log===false ? 'none' : ''}} onChange={(e)=>setasztalnev(e.target.value)} aria-label="Default select example">
         <option class="form-control" value="" defaultValue>Válassz asztalt!</option>
                
                <option class="form-control" value="Jobb1">Jobb1</option>
                <option class="form-control" value="Jobb2">Jobb2</option>
                <option class="form-control" value="Jobb3">Jobb3</option>
                <option class="form-control" value="Jobb4">Jobb4</option>
                <option class="form-control" value="Jobb5">Jobb5</option>
                <option class="form-control" value="Jobb6">Jobb6</option>
                <option class="form-control" value="Jobb7">Jobb7</option>
                <option class="form-control" value="Jobb8">Jobb8</option>
                <option class="form-control" value="Jobb9">Jobb9</option>
                <option class="form-control" value="Jobb10">Jobb10</option>
                <option class="form-control" value="Jobb11">Jobb11</option>
                <option class="form-control" value="Jobb12">Jobb12</option>
                
                <option class="form-control" value="Bal1">Bal1</option>
                <option class="form-control" value="Bal2">Bal2</option>
                <option class="form-control" value="Bal3">Bal3</option>
                <option class="form-control" value="Bal4">Bal4</option>
                <option class="form-control" value="Bal5">Bal5</option>
                <option class="form-control" value="Bal6">Bal6</option>
                <option class="form-control" value="Bal7">Bal7</option>
                <option class="form-control" value="bal8">Bal8</option>
                
                <option class="form-control" value="Pult1">Pult1</option>
                <option class="form-control" value="Pult2">Pult2</option>
                <option class="form-control" value="Pult3">Pult3</option>
               
                <option class="form-control" value="Terasz1">Terasz1</option>
                <option class="form-control" value="Terasz2">Terasz2</option>
                <option class="form-control" value="Terasz3">Terasz3</option>
                <option class="form-control" value="Terrasz4">Terasz4</option>
                <option class="form-control" value="Terasz5">Terasz5</option>
                <option class="form-control" value="Terasz6">Terasz6</option>
                <option class="form-control" value="Terasz7">Terasz7</option>
                <option class="form-control" value="Terasz8">Terasz8</option>
                <option class="form-control" value="Terasz9">Terasz9</option>
                <option class="form-control" value="Terasz10">Terasz10</option>
                <option class="form-control" value="Terasz11">Terasz11</option>
                <option class="form-control" value="Terasz12">Terasz12</option>
</Form.Select>
    
    <h6 style={{fontSize:"32px",display: log===false ? 'none' : ''}}>/</h6>
    <Form.Select style={{marginLeft:"10px",width:"160px",marginBottom:"15px",display: log===false ? 'none' : ''}} onChange={(e)=>settobb(e.target.value)} aria-label="Default select example">
         <option class="form-control" value="" defaultValue>Több család esetén</option>
                
                <option class="form-control" value="1">1</option>
                <option class="form-control" value="2">2</option>
                <option class="form-control" value="3">3</option>
                <option class="form-control" value="4">4</option>
                <option class="form-control" value="5">5</option>
                <option class="form-control" value="6">6</option>
                <option class="form-control" value="7">7</option>
                <option class="form-control" value="8">8</option>
                <option class="form-control" value="9">9</option>
                <option class="form-control" value="10">10</option>
                <option class="form-control" value="11">11</option>
                <option class="form-control" value="12">12</option>
                
                <option class="form-control" value="13">13</option>
                <option class="form-control" value="14">14</option>
                <option class="form-control" value="15">15</option>
                <option class="form-control" value="16">16</option>
                <option class="form-control" value="17">17</option>
                <option class="form-control" value="18">18</option>
                <option class="form-control" value="19">19</option>
                <option class="form-control" value="20">20</option>
                
                
</Form.Select>

</div>
<button style={{fontSize:"12px",marginLeft:"10px", marginBottom:"15px",display: log===false ? 'none' : ''}} className='btn btn-danger' onClick={kivalasztas}>Kiválasztás</button>

    {kosar.map((value,index)=>{
      {termek.map((t,a)=>{
        if (t._id===value.id&&t.info.length<value.info.length) {
         
         
          return(osszeg+=(value.info.length-t.info.length)*800*value.count
       
          
              
            )
          

        }
      })}
        if(value.Afa===27){
          Afa27+=value.Price
        }
         osszeg+=value.Price
         koret+=value.Price
        return(
            <div style={{border:"1px solid black",marginBottom:"15px"}} key={index}>
                <h6 onClick={()=>delFromCart(index)} className='SelfClose'>X</h6>     
                <p style={{marginLeft:"15px"}}>{value.count} <b>x</b> <b style={{display:value.dl===0||value.dl===undefined?"none":''}}>{value.dl} dl</b> <span style={{fontSize:'20px'}}>{value.name}</span></p>

                {value.info.map((inf,key)=>{
                    return(
                        
                            <span key={key} className='' style={{marginLeft:"15px"}}><i><b>{inf}</b></i></span>
        
                        
                    )
                })}
                
            </div>
        )
    })}
        <h4 style={{textAlign:'right',display: osszeg===0 ? 'none' : ''}}>Összeg: <i>{osszeg}</i> Ft</h4>
       <p hidden> {koret=osszeg-koret}</p>
      
        <button style={{display: ures==="" ? '' : 'none'}} className='btn btn-danger' onClick={rendelesLeadas}>Rendelés leadása</button>
        <ToastContainer />
    </div>
  )
}

export default Cart