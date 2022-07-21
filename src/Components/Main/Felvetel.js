import React from 'react'
import '../../css/Home.css';
import {Nav,Card, ListGroup,ListGroupItem,Modal} from 'react-bootstrap';
import {useEffect,useState} from 'react';
import Cart from '../Cart';
function Felvetel() {
   
  const [kosartart,setkosartart]=useState([])
  const [showCart, setShowCart] = useState(false);
  
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
    <Card className="text-center border border-dark p-2 mb-2 border-opacity-25" style={{ width: '24rem'}}>
    <div style={{textAlign:"left"}}>
          <Nav.Link style={{width:"75px"}} href="/">
      <button type="button"  className="btn btn-danger rounded-circle"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left" viewBox="0 0 16 16">
  <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
</svg></button></Nav.Link></div>
                   <Card.Body>
                      <h3 className='Title_self bg-danger text-light'>Castrum Boldua Középkori Étterem </h3>
                      <div style={{textAlign:"right",marginTop:"10px"}}>
           <svg onClick={handleShowCart} style={{backgroundColor:""}} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg>
<span style={{backgroundColor:"", width:"20px",height:"20px",borderRadius:"50%"}}>{kosartart.length}</span>
           </div>
                      <hr className='HR2'></hr>
                     
                       <Card.Text>
                
                           <ListGroup style={{ textAlign: "center" }} className="list-group-flush">
                               <ListGroupItem ><Nav.Link href="/Levesek"><button className=" btn-danger buttonStyle">Levesek</button></Nav.Link></ListGroupItem>
                               <ListGroupItem ><Nav.Link href="/Foetelek"><button className=" btn-danger buttonStyle">Főételek</button></Nav.Link> </ListGroupItem>
                               <ListGroupItem ><Nav.Link href="/Salatak"><button className=" btn-danger buttonStyle">Saláták</button></Nav.Link> </ListGroupItem>
                               <ListGroupItem ><Nav.Link href="/Martasok"><button className=" btn-danger buttonStyle">Mártások</button></Nav.Link> </ListGroupItem>
                               <ListGroupItem ><Nav.Link href="/Desszertek"><button className=" btn-danger buttonStyle">Desszertek</button></Nav.Link> </ListGroupItem>
                               <ListGroupItem ><Nav.Link href="/Italok"><button className=" btn-danger buttonStyle">Italok</button></Nav.Link> </ListGroupItem>

                           </ListGroup>
                       </Card.Text>
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

export default Felvetel