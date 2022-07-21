import React from 'react'
import {Nav,Card, ListGroup,ListGroupItem} from 'react-bootstrap';
import '../../css/Home.css'
function Home() {
  return (
    <div className='centered'>
     <Card className="text-center border border-dark p-2 mb-2 border-opacity-25" style={{ width: '24rem',height:"800px" }}>
                    
                    <Card.Body>
                       <h3 className='Title_self bg-danger text-light'>Castrum Boldua Középkori Étterem </h3>
                       <hr className='HR'></hr>
                        <Card.Text>
                            <ListGroup style={{ textAlign: "center" }} className="list-group-flush">
                                <ListGroupItem ><Nav.Link href="/Felvetel"><button className=" btn-danger buttonStyle">Rendelés felvétele</button></Nav.Link></ListGroupItem>
                                <ListGroupItem ><Nav.Link href="/Elozmenyek"><button className=" btn-danger buttonStyle">Rendelési Előzmények</button></Nav.Link> </ListGroupItem>
                               
                            </ListGroup>
                        </Card.Text>
                    </Card.Body>
                    
                </Card> 
    </div>

  )
}

export default Home