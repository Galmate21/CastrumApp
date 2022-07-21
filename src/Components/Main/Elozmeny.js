import React from 'react'
import {useState,useEffect}from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import '../../css/Home.css';
import {Card,Nav,Modal,ListGroup,ListGroupItem} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Elozmeny() {
  const params = useParams();

  const id = params.id;
  const [order,setorder]=useState([])
  const [rendelesek,setrendelesek]=useState([])
  const [show,setshow]=useState(false)
  const [name,setname]=useState("")
  const [price,setprice]=useState(0)
  const [info,setinfo]=useState([])
  const [count,setcount]=useState([])
  const [dl,setdl]=useState(0);
  const [editShow,seteditShow]=useState(false)
  const [asztal,setasztal]=useState("")
  useEffect(()=>{
    axios({
      method: 'get',
      url: `https://hidden-coast-90775.herokuapp.com/order/${id}`,
      responseType: 'json'
    })
      .then((response)=> {
        setorder(response.data)
        setrendelesek(response.data.rendelesek)
        setasztal(response.data._id)
      });
   },[id])

   const DeleteOrder=()=>{
    
      
    if (window.confirm("Biztos törlöd a rendelést?")){
    axios({
      method: 'delete',
      url: `https://hidden-coast-90775.herokuapp.com/orderDel/${id}`,
      responseType: 'json'
    })
      .then((response)=> {
        alert(id+" asztal sikeresen törölve!")
        window.location.assign("/elozmenyek");
      });
    }
   }

   const handleClose=()=>{
    setshow(false)
    setname("")
    setprice(0)
    setinfo([])
    setcount(0)
    setdl(0)
   }

   const OpenOrder=(i)=>{
    setshow(true)
    setname(rendelesek[i].name)
    setprice(rendelesek[i].Price)
    setinfo(rendelesek[i].info)
    setcount(rendelesek[i].count)
    setdl(rendelesek[i].dl)
   }

   const showedit=()=>{
    seteditShow(true)
   }

   const handleCloseEdit=()=>{
    seteditShow(false)
   }

   const DelToEdit=(i)=>{
    
    console.log(rendelesek[i].Afa)
    if(rendelesek[i].Afa===27){
        order.Afa27-=rendelesek[i].Price
    }
    if(rendelesek[i].info.length>rendelesek[i].base){
      order.koret-=(rendelesek[i].info.length-rendelesek[i].base)*800*rendelesek[i].count
      order.osszeg-=(rendelesek[i].info.length-rendelesek[i].base)*800*rendelesek[i].count
    }
    order.osszeg-=rendelesek[i].Price;
    rendelesek.splice(i,1);
    setrendelesek([...rendelesek]);
   }

   const Update=async()=>{
    if (rendelesek.length===0) {
      if(window.confirm("Ez a rendelés üres! Töröljem?")){
        DeleteOrder();
      }
      else{
        axios({
          method: 'get',
          url: `https://hidden-coast-90775.herokuapp.com/order/${id}`,
          responseType: 'json'
        })
          .then((response)=> {
            setorder(response.data)
            setrendelesek(response.data.rendelesek)
            setasztal(response.data._id)
            seteditShow(false)
          });
      }
    }
    else{
          if(window.confirm("Biztosan szeretné módosítáni a rendelést?")){
            try {
              const config={
                headers:{
                  "Content-type":"application/json"
                }
              }
              await axios.put(`https://hidden-coast-90775.herokuapp.com/UpdateOrder/${id}`,{
                order:rendelesek,osszeg:order.osszeg,Afa27:order.Afa27,koret:order.koret
            },config)
            toast.success("Sikeresen szerkesztetted "+ id+" asztalt!", {
              position: "top-center"
            }); 
            seteditShow(false)
            setTimeout(function () {
              axios({
                method: 'get',
                url: `https://hidden-coast-90775.herokuapp.com/order/${id}`,
                responseType: 'json'
              })
                .then((response)=> {
                  setorder(response.data)
                  setrendelesek(response.data.rendelesek)
                  setasztal(response.data._id)
                });
                
             }, 3000);
               
            } catch (error) {
              toast.error("Hiba!", {
                position: "top-center"})
    
            }

          }



    }

   }


  return (
    <div className='centered'>
         <Card className="text-center border border-dark p-2 mb-2 border-opacity-25" style={{ width: '24rem'}}>
         <div style={{textAlign:"left"}}>
          <Nav.Link style={{width:"75px"}} href="/elozmenyek">
      <button type="button"  className="btn btn-danger rounded-circle"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
  <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
</svg></button></Nav.Link>
<div style={{textAlign:"right"}}>
                          <button onClick={DeleteOrder} style={{marginTop:"-85px"}}  className="btn btn-outline-primary"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
</svg></button>

<button onClick={showedit} style={{marginTop:"-85px",marginLeft:"15px",marginRight:"15px"}}  className="btn btn-outline-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
</svg></button>
                        </div>
      </div>
      <Card.Body>

                      <h3 className='Title_self text-light'>Castrum Boldua Középkori Étterem </h3>
                      <hr className='HR2'></hr>

                      <Card.Text>
                        <h4>{asztal.replace(".","/")}</h4>
                        <hr className='HR2'></hr> <hr className='HR2'></hr>
                        {rendelesek.map((value,key)=>{
                              return(
                                <div style={{textAlign:"left"}} key={key}>
                                  <div style={{display:"flex"}}>

                                  <p onClick={()=>OpenOrder(key)}><b><i>{value.count}<b style={{display:value.dl===0||value.dl===undefined?"none":''}}>x {value.dl} dl</b> {value.name}</i> :{value.Price} Ft</b></p>&nbsp;
                                  
                                  
                                  </div>
                                </div>
                              )
                        })}

                        <p style={{display: order.koret===0 ? 'none' : '',textAlign:"left"}}><b><i>+köret:{order.koret} Ft</i></b></p>
                        <div style={{textAlign:"left",marginTop:"55px"}}>
                        <p>27%- os Áfa: {order.Afa27} Ft</p>
                        <p>5%- os Áfa: {order.osszeg-order.Afa27} Ft</p>
                        </div>
                        <div style={{textAlign:"right",backgroundColor:"crimson", color:"white",marginTop:"55px"}}>
                        <h5 style={{border:"1px solid black"}}>Összeg: {order.osszeg} Ft</h5>
                        </div>
                        
                      </Card.Text>
      </Card.Body>

         </Card>

         <Modal show={show} onHide={handleClose} animation={true}>
                    <Modal.Header className='bg-danger' closeButton>
                       <h3>{name}</h3>
                       
                       
                    </Modal.Header>
                    <Modal.Body  > 
                      <ListGroup style={{textAlign:"center",marginTop:"15px"}}>
                        <ListGroupItem><span style={{fontSize:"20px",fontWeight:"bold"}}>Ár:</span> {price} <b>Ft</b></ListGroupItem>
                        <ListGroupItem><span style={{fontSize:"20px",fontWeight:"bold"}}>Mennyiség:</span> {count} <b>darab</b> <span style={{display:dl===0||dl===undefined?"none":''}}>({dl} dl) </span></ListGroupItem>
                        <ListGroupItem><span style={{fontSize:"20px",fontWeight:"bold",display:info.length===0?"none":""}}>Tartalmaz:</span></ListGroupItem>
                        
                        {info.map((inf,index)=>{
                          return(
                            <div key={index}>
                              <p style={{textAlign:"center"}}>{inf}</p>
                            </div>
                          )
                        })}
                          

                      </ListGroup>
                        

                    </Modal.Body>
                    
                </Modal>

                <Modal show={editShow} onHide={handleCloseEdit} animation={true}>
                    <Modal.Header className='bg-danger' closeButton>
                       <h3>{id}</h3>
                       
                       
                    </Modal.Header>
                    <Modal.Body  > 
                         {rendelesek.map((rendeles,index)=>{
                          return(
                            <div key={index}>
                                 <p><b><i>{rendeles.count}<b style={{display:rendeles.dl===0||rendeles.dl===undefined?"none":''}}>x {rendeles.dl} dl</b> {rendeles.name}</i> :{rendeles.Price} Ft</b>
                                 <button onClick={()=>DelToEdit(index)} style={{marginLeft:"35px"}} className='btn btn-outline-primary'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
</svg></button></p>&nbsp;
                            </div>
                          )
                         })}
                         <button onClick={Update} className='btn btn-danger text-center'>Módosítás</button>
                    </Modal.Body>
                    
                </Modal>
                <ToastContainer />
    </div>
  )
}

export default Elozmeny