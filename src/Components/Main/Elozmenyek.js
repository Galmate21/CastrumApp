import React from 'react'
import {useState,useEffect} from "react";
import {Nav,Row,Card} from 'react-bootstrap';
import axios from "axios"
import "../../css/Home.css";


function Elozmenyek() {
const [orders,setorders]=useState([]);
const [logikai,setlogikai]=useState("")
    
useEffect(()=>{
    axios({
        method: 'get',
        url: `https://hidden-coast-90775.herokuapp.com/orders`,
        responseType: 'json'
      })
        .then((response)=> {
          setorders(response.data)
          setlogikai(true)

          if(response.data.length===0){
            setlogikai(false)
          }
          
        });

       
  },[])




  return (
    <div className='centered'>
        <Card className="text-center border border-dark p-2 mb-2 border-opacity-25" style={{ width: '24rem',height:"800px"}}>

        <div style={{textAlign:"left"}}>
          <Nav.Link style={{width:"75px"}} href="/">
      <button type="button"  className="btn btn-danger rounded-circle"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left" viewBox="0 0 16 16">
  <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
</svg></button></Nav.Link>
      </div>
      <Card.Body>
      <h3 className='Title_self text-light'>Castrum Boldua Középkori Étterem </h3>
                      <hr className='HR2'></hr>
                     <h4>Rendelések</h4>

        <Card.Text>
            <div style={{marginTop:"25px", backgroundColor:""}}>
            <h5 style={{display: logikai===false ? '' : 'none'}}>Jelenleg egyik asztalra sem érkezett rendelés!</h5>

        <Row xs={3} sm={3} md={3}>
            {orders.map((value,key)=>{
                return(
                    <div key={key}>
                       <Nav.Link href={"/elozmeny/"+value._id}> <button className="btn btn-outline-danger" style={{marginBottom:"15px"}}>
                        {value._id.replace(".","/")}
                        </button>
                        </Nav.Link>
                    </div>
                )
            })}
            
            
            
            
            </Row>      

            </div>
        </Card.Text>

      </Card.Body>
        </Card>
        
        
        
        
        
        </div>
  )
}

export default Elozmenyek