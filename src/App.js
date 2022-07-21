import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Components/Main/Home";
import Felvetel from "./Components/Main/Felvetel";
import Elozmeny from "./Components/Main/Elozmeny";
import Italok from "./Components/Nav/Italok";
import Levesek from "./Components/Nav/Levesek";
import Desszertek from "./Components/Nav/Desszertek";
import Martasok from "./Components/Nav/Martasok";
import Salatak from "./Components/Nav/Salatak";
import Foetel from "./Components/Nav/Foetel";
import Elozmenyek from "./Components/Main/Elozmenyek";
import Borok from "./Components/Nav/Borok";
import Egyeb from "./Components/Nav/Egyeb";
import Kavek from "./Components/Nav/Kavek";
import Sorok from "./Components/Nav/Sorok";
import Palinkak from "./Components/Nav/Palinkak";
import Szorpok from "./Components/Nav/Szorpok";
import Szorp from "./Components/Nav/Szorp";



function App() {
  return (
<BrowserRouter>
      <div className="App">
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Felvetel" element={<Felvetel />} />
          <Route path="/Elozmeny/:id" element={<Elozmeny />} />
          <Route path="/Elozmenyek" element={<Elozmenyek />} />

          <Route path="/Italok" element={<Italok />} />   
          <Route path="/Levesek" element={<Levesek />} />  
          <Route path="/Desszertek" element={<Desszertek />} />   
          <Route path="/Martasok" element={<Martasok />} />         
          <Route path="/Salatak" element={<Salatak />} />         
          <Route path="/Foetelek" element={<Foetel />} />    
          <Route path="/Borok" element={<Borok />} /> 
          <Route path="/Egyeb" element={<Egyeb />} />  
          <Route path="/Kavek" element={<Kavek />} />   
          <Route path="/Sorok" element={<Sorok />} />    
          <Route path="/Palinkak" element={<Palinkak />} />  
          <Route path="/Szorpok" element={<Szorpok />} />   
          <Route path="/Szorp/:id" element={<Szorp />} />         
          
          








        </Routes>
      </div>

      
    </BrowserRouter>
  );
}

export default App;
