import React from 'react'
import {useState,useEffect} from 'react';
import axios from 'axios';
import {Card,Modal,CloseButton,Nav} from 'react-bootstrap';
import '../../css/Home.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from '../Cart';

function Martasok() {
    const [foods,setFoods]=useState([]);
    const [show, setShow] = useState(false);
    const [food,setFood]=useState([]);
    const [foodInfo,setFoodInfo]=useState([]);
    const [count,setCount]=useState(0);
    const [AddItem,setAdditem]=useState([]);
    const [kosartart,setkosartart]=useState([])
    const [showCart, setShowCart] = useState(false);
    

    useEffect(()=>{
        axios({
          method: 'get',
          url: 'https://hidden-coast-90775.herokuapp.com/foods/Martas',
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
    

       const ModalById=async(id)=>{
        axios({
            method: 'get',
            url: `https://hidden-coast-90775.herokuapp.com/food/${id}`,
            responseType: 'json'
          })
            .then((response)=> {
              setFood(response.data)
              setFoodInfo(response.data.info)
              setShow(true)
              setCount(0);
            setAdditem([])

              console.log(response.data)
            });
       }


       const handleClose = () => {setShow(false);
        setFood([]);
        setCount(0);
        setAdditem([])
      }
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


      const Increase=()=>{
          setCount(count+1);
          
      }

      const Descrease=()=>{
        if(count<2){
            setShow(false)
        }

        setCount(count-1);
        

    }

      
  
    const delItem=(index)=>{
        AddItem.push(foodInfo[index]);
        setAdditem([...AddItem]);
        foodInfo.splice(index,1);
        setFoodInfo([...foodInfo]);
        console.log(foodInfo);
    }

    const AddToItems=(index)=>{
        foodInfo.push(AddItem[index]);
        setFoodInfo([...foodInfo]);
        AddItem.splice(index,1);
        setAdditem([...AddItem]);
        console.log(AddItem);
    }
    const AddToCart=function(name,info,ar,t){
      var items = JSON.parse(localStorage.getItem('cart')) || [];
      var item = items.find(item => item.name === name&&item.info.join(',')===info.join(','));
     if (count===0) {
      toast.warning(`Add meg a mennyiséget!`, {
        position: "top-center"})

      return;
     }
      if (item) {
        item.count += count;
        item.Price+=ar*count;
        toast.info(`${item.name} mennyiségének növelése`, {
          position: "top-center"})
        
      }else{
        items.push({
          name:name,
          info:info,
          count:count,
          Price:ar*count,
          type:t
        })
        toast.success("Sikeres hozzáadása a kosárhoz!", {
          position: "top-center"
        }); 
        
      }
     
      localStorage.setItem('cart', JSON.stringify(items));
      setkosartart(items)
      setTimeout(function () {
        handleClose();
     }, 1500);
     
     
    }  



  return (
    <div className='centered'>
    
      
        <Card className="text-center border border-dark p-2 mb-2 border-opacity-25" style={{ width: '24rem',height:"800px" }}>
        <div style={{textAlign:"left"}}>
          <Nav.Link style={{width:"75px"}} href="/Felvetel">
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
            <div className="centered2" key={key}>
                 <button onClick={()=>ModalById(value._id)} type="button"  className="btn btn-outline-danger rounded-circle"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="35" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg></button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <h5 style={{marginRight:'35px',textAlign: "left"}}>{value.name}</h5>
                
                
            </div>
            )
        })}
            
           
        </Card.Text>
        <hr className='HR2'></hr>
        </Card.Body>
        </Card>
        <Modal show={show} onHide={handleClose} animation={true}>
                    <Modal.Header className='bg-danger' closeButton>
                       
                       
                       
                    </Modal.Header>
                    <Modal.Body style={{height:"350px"}} > 
                            <h1 className="text-center">{food.name}</h1>
                            <hr className='HR2'></hr>
                           {foodInfo.map((v,i)=>{
                               return(
                                   <div key={i} className='text-center'>
                                        <h6><CloseButton  onClick={()=>delItem(i)} /> {v}</h6>
                                   </div>
                               )
                               
                           })}

                    <h5 style={{marginTop:"100px"}}>Hozzáadható:</h5>
                    
                    <h3>{AddItem.length===0?"Jelenleg nincs olyan, amit hozzá lehetne adni!":""}</h3>
                    {AddItem.map((a,index)=>{
                               return(
                                   <div key={index} className='text-center'>
                                        <h6><svg onClick={()=>AddToItems(index)} xmlns="http://www.w3.org/2000/svg" width="25" height="35" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg> {a}</h6>
                                   </div>
                               )
                               
                           })}
                      
                    </Modal.Body>
                    <Modal.Footer style={{height:"150px"}} className='d-flex bg-light justify-content-center'>
                        
                    <button type="button" onClick={Increase}  className="btn btn-outline-danger rounded-circle"><svg xmlns="http://www.w3.org/2000/svg" width="45" height="55" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg></button>
                            <h3 style={{marginLeft:"50px",marginRight:"50px"}}>{count}</h3>

<button type="button" onClick={Descrease}  className="btn btn-outline-danger rounded-circle"><svg xmlns="http://www.w3.org/2000/svg" width="45" height="55" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
</svg></button>
                           <button className='btn btn-danger' onClick={()=>AddToCart(food.name,foodInfo,food.Price,food.Type)} style={{marginTop:"18px"}}>Hozzáadás</button>
                        
                    </Modal.Footer>
                </Modal>





                <Modal show={showCart} onHide={handleCloseCart} animation={true}>
                    <Modal.Header className='bg-danger' closeButton>
                       <h3>Kosár</h3>
                       
                       
                    </Modal.Header>
                    <Modal.Body  > 
                          <Cart />
                    </Modal.Body>
                    
                </Modal>

                <ToastContainer />
    </div>
  )
}
export default Martasok
