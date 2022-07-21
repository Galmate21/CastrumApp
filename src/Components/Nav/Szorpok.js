import React from 'react'
import {useState,useEffect} from 'react';
import axios from 'axios';
import {Card,Modal,Nav} from 'react-bootstrap';
import '../../css/Home.css';

import Cart from '../Cart';

function Szorpok() {
    const [foods,setFoods]=useState([]);
   

    const [kosartart,setkosartart]=useState([])
    const [showCart, setShowCart] = useState(false);
    

    useEffect(()=>{
        axios({
          method: 'get',
          url: 'https://hidden-coast-90775.herokuapp.com/foods/Szorp',
          responseType: 'json'
        })
          .then((response)=> {
            setFoods(response.data)
           
          });
       },[])


       useEffect(()=>{
        const cartItem=JSON.parse(localStorage.getItem('cart'))
        if(cartItem){
          setkosartart(cartItem)
        }
       
    
      },[])
    

      
      
      const handleCloseCart = () => {setShowCart(false);
        const cartItem2=JSON.parse(localStorage.getItem('cart'))
        if(cartItem2){
          setkosartart([...cartItem2])
        }
        else{
          setkosartart([])
        }
      } 
      const handleShowCart = () => {setShowCart(true);
        
      } 


    
    



  return (
    <div className='centered'>
    
      
        <Card className="text-center border border-dark p-2 mb-2 border-opacity-25" style={{ width: '24rem' }}>
        <div style={{textAlign:"left"}}>
          <Nav.Link href="/Italok">
      <button type="button"  className="btn btn-danger rounded-circle"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left" viewBox="0 0 16 16">
  <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
</svg></button></Nav.Link>
      </div>
        <Card.Body>
                      <h3 className='Title_self text-light'>Castrum Boldua Középkori Étterem </h3>
                      <hr className='HR2'></hr>
                     
        <Card.Text>
           <div style={{textAlign:"right"}}>
           <svg onClick={handleShowCart} style={{backgroundColor:""}} xmlns="http://www.w3.org/2000/svg" width="35" height="40" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg>
<span style={{backgroundColor:"", width:"20px",height:"20px",borderRadius:"50%"}}>{kosartart.length}</span>
           </div>
        {foods.map((value,key)=>{
            return(
            <div style={{ textAlign: "center",marginBottom:"25px",marginTop:"15px" }} className="list-group-flush" key={key}>
                <Nav.Link href={"/Szorp/"+value.link}><button type="button"  className="btn btn-danger buttonStyle">{value.name}</button></Nav.Link> 
                
                
            </div>
            )
        })}
            
           
        </Card.Text>
        <hr className='HR2'></hr>
        </Card.Body>
        </Card>
        


                <Modal show={showCart} onHide={handleCloseCart} animation={true}>
                    <Modal.Header className='bg-danger' closeButton>
                       <h3>Kosár</h3>
                       
                       
                    </Modal.Header>
                    <Modal.Body  > 
                          <Cart />
                    </Modal.Body>
                    
                </Modal>

               
    </div>
  )
}

export default Szorpok