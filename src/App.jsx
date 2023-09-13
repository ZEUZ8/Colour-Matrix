import React, { useEffect, useState } from "react";
import "./App.css";

function App() {

  const boxes = [];
  const [box, setBox] = useState([]);
  const [boxorder, setBoxorder] = useState([]);
  const [order, setOrder] = useState(1);

  function handleClick(id,clicked){
  
      if(!clicked){
        const handledBox = box.map((val)=>{
          if(order > 8){
            if(val.id === id){
              val.color = 'orange'
              val.order = order;
              val.clicked = true;
              setOrder(prev => prev+1);
              setBoxorder(prev => [...prev, val])
            }
          }else{
            if(val.id === id){
              val.color = 'green'
              val.order = order;
              val.clicked = true;
              setOrder(prev => prev+1);
              setBoxorder(prev => [...prev, val])
            }
          }
         
          return val;
        })

        setBox(handledBox);

        if(order > 8){
          setTimeout(() => {
            let rev = boxorder.reverse().map((val, i) => {
              console.log(val,"ll");
              setTimeout(() => {
                val.color = 'orange';
                setBox([...box]); // Update the state to trigger a re-render
              }, 800 * i);
              return val;
            });
    
            setBox(rev);
          }, 1000); // Wait for 2 seconds before changing to red
        }
       }
  }

  useEffect(()=>{
    for (let i = 0; i < 9; i++) {
      boxes.push({color:'pink', clicked:false, order:0, id:(i+1)})
    }
    setBox(boxes);
  },[])

  return (
    <>
     <div className="parent">
        {
          box?.map((val)=>{
            return(
              <div className="box" key={val.id} style={{backgroundColor:`${val.color}`}} onClick={()=>handleClick(val.id,val.clicked)}></div>
            )
          })
        }
     </div>
    </>
  );
}

export default App;