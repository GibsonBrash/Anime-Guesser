import { useState, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [question, setQuestion] = useState(false);
  const [reveal, setReveal] = useState(Array(70).fill(false));


  const imageRef = useRef();
  const imageAverageColors = useRef(new Array());
  const pixelRefArray =  useRef(new Array());

  const testRef = useRef();

  const canvasImage = useRef(null);
  const contextImage = useRef(null);

  const drawPixel = (canvas, ctx, index) => {
    let arrayStart = 0;
    let heightCount = 0;
    let keepArrayStart = 0;
    
   
  
    if(index < 7){
      arrayStart = index * 2;
    }
    if(index > 6 && index < 14){
      arrayStart = ((index * 2) + 14);
    }
    if(index > 13 && index < 21){
      arrayStart = ((index * 2) + (14 * 2));
    }
    if(index > 20 && index < 28){
      arrayStart = ((index * 2) + (14 * 3));
    }
    if(index > 27 && index < 35){
      arrayStart = ((index * 2) + (14 * 4));
    }
    if(index > 34 && index < 42){
      arrayStart = ((index * 2) + (14 * 5));
    }
    if(index > 41 && index < 49){
      arrayStart = ((index * 2) + (14 * 6));
    }
    if(index > 48 && index < 56){
      arrayStart = ((index * 2) + (14 * 7));
    }
    if(index > 55 && index < 63){
      arrayStart = ((index * 2) + (14 * 8));
    }
    if(index > 62 && index < 70){
      arrayStart = ((index * 2) + (14 * 9));
    }
    

    keepArrayStart = arrayStart;
    
  	for(let y = 0; y < canvas.height; y+=16){
      
    	for(let x = 0; x < canvas.width; x+=16){
          
          ctx.fillStyle = `rgb(${imageAverageColors.current[arrayStart + heightCount].r}, ${imageAverageColors.current[arrayStart + heightCount].g}, ${imageAverageColors.current[arrayStart + heightCount].b})`;
          
          ctx.fillRect(x, y, 16, 16);
         
          arrayStart++
      }
      
      arrayStart = keepArrayStart;
      heightCount = 14;
  	}
      
  }

  const getHandleImageData = ({data}) => {
    
    let Red = 0;
    let RedCount = 0;
    let Green = 0;
    let GreenCount = 0;
    let Blue = 0;
    let BlueCount = 0;
    
    for(let x = 0; x < data.length; x+=4){
     
      Red += data[x];
      RedCount++;
      Green += data[x+1];
      GreenCount++;
      Blue += data[x+2];
      BlueCount++;

    }
    //console.log("countcheck: ", Red, RedCount);
    const redAverage = Math.round(Red/RedCount);
    const greenAverage = Math.round(Green/GreenCount);
    const blueAverage = Math.round(Blue/BlueCount);
    
    return {r: redAverage , g: greenAverage, b: blueAverage};
  }

  const pixelateInfo = () => {
    const height = canvasImage.current.height;
    const width = canvasImage.current.width;

    const ctx = testRef.current.getContext('2d');    
    
    if(imageAverageColors.current.length === 0){
      for(let y = 0; y < height; y+=16){
        for(let x = 0; x < width-1; x+=16){
          const colors = getHandleImageData(contextImage.current.getImageData(x,y,16,16));
          
          
          ctx.fillStyle = `rgb(${colors.r}, ${colors.g}, ${colors.b})`;
          ctx.fillRect(x, y, 16, 16);
          imageAverageColors.current.push(colors);
        }
      
      }
      
      for(let x = 0; x < pixelRefArray.current.length; x++){
        if(pixelRefArray.current[x]){
          drawPixel(pixelRefArray.current[x], pixelRefArray.current[x].getContext('2d'), x);
        }
      }
    }    

  }

  const loadImage = () => {
    const newImage = new Image();
    newImage.src = "https://cdn.myanimelist.net/images/anime/12/76049.jpg";
    newImage.crossOrigin = "anonymous";
    newImage.onload = () => {
      
      canvasImage.current = imageRef.current;
      canvasImage.current.width = newImage.width;
      canvasImage.current.height = newImage.height;

      contextImage.current = canvasImage.current.getContext('2d',{alpha: false, willReadFrequently: true});
      contextImage.current.drawImage(newImage, 0, 0);
      
      pixelateInfo();
      
    }
  
   
  }

  useEffect(() => {
    
    
    loadImage();
   
  },[])

  const handlePixelRefArray = (e) => {
    if(pixelRefArray.current.length < 70){
      pixelRefArray.current.push(e);
    }
  }

  const displayCanvas = () => {
    let divs = [];
    for(let x = 0; x < 70; x++){

      //if(x < 3 || (x > 6 && x < 10)){
       // divs.push(<canvas key={x} ref={(e) => handlePixelRefArray(e)} height="32px" width="32px" style={question ? {opacity: "0"} : {opacity: "1"}}></canvas>);
     // }else{
        divs.push(<canvas key={x} ref={(e) => handlePixelRefArray(e)} height="32px" width="32px" style={reveal[x] ? {opacity: "0"} : {opacity: "1"}}></canvas>); 
     // }
      
    }
    return divs;
  }

  const handleDisplay = () => {
    //console.log("reveal", reveal);
    const revealUpdate = reveal.map((input, index) => {
      if(0 === index){
        return !input;
      }else{
        return input;
      }
    });
    console.log("reveal", revealUpdate);
    setReveal(revealUpdate);
  }

  return (
    <>
      <nav>Anime Guesser
      </nav>
      <div className="guessImageContainer">
        <canvas ref={imageRef} id="image"></canvas>
        <div id="pixel-container">
         {
          reveal.map((input, index) => {
            return(<canvas key={index} ref={(e) => handlePixelRefArray(e)} height="32px" width="32px" style={input ? {opacity: "0"} : {opacity: "1"}}></canvas>)
          })
         }
        </div>
      </div>
      <button onClick={() => setQuestion(question ? false : true)}>
        big o'l Question
      </button>
      <button onClick={() => handleDisplay()}>yobro</button>
      <canvas ref={testRef} height="320px" width="224"></canvas>

    </>
  )
}

/*
<canvas ref={pixelRef1} id="pixel1" height="32px" width="32px" style={question ? {display: "none"} : {display: "block"}}></canvas>
          
*/
export default App
