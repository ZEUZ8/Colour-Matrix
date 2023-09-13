import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const boxes = [];
  const [box, setBox] = useState([]);
  const [boxorder, setBoxorder] = useState([]);
  const [order, setOrder] = useState(1);

  function handleClick(id, clicked) {
    if (!clicked) { // changing the colour upto the last box
      box.forEach((val) => {
        if (val.id === id) {
          val.color = "green";
          val.order = order;
          val.clicked = true;
          setOrder((prev) => prev + 1);
          setBoxorder((prev) => [...prev, val]);
        }
      });

      if (order > 8) {
        if (!clicked) {
          setTimeout(() => {// only changing colour of the last box
            box.forEach((val) => {
              if (val.id === id) {
                val.color = "orange";
                val.order = order;
                val.clicked = false;
                setBox([...box]); // Update the state to trigger a re-render
              }
            });
          }, 1000); // Wait for 1 seconds before changing to orange 
        }

          setTimeout(() => {// reversing all the boxes colour to orange
            boxorder.reverse().map((val, i) => {
              console.log(val, "ll");
              setTimeout(() => {
                val.color = "orange";
                val.clicked = false;
                setBox([...box]); // Update the state to trigger a re-render
              }, 500 * i);
            });
          }, 2000); // Wait for 2 seconds before changing to orange

      }
    }
  }

  useEffect(() => {
    for (let i = 0; i < 9; i++) {
      boxes.push({ color: "pink", clicked: false, order: 0, id: i + 1 });
    }
    setBox(boxes);//
  }, []);

  return (
    <>
      <div className="parent">
        {box?.map((val) => {
          return (
            <div
              className={`box ${val.clicked ? 'flipped' : ''}`}
              key={val.id}
              style={{ backgroundColor: `${val.color}` }}
              onClick={() => handleClick(val.id, val.clicked)}
            ></div>
          );
        })}
      </div>
    </>
  );
}

export default App;
