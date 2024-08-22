import { useState, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [question, setQuestion] = useState(false);
  const [imageAverageColorsForReal, setImageAverageColorsForReal] = useState(null);

  const pixelRef1 = useRef();
  const pixelRef2 = useRef();
  const pixelRef3 = useRef();
  const imageRef = useRef();
  let imageAverageColors = useRef(new Array());
  const pixelRefArray =  useRef(new Array());

  const testRef = useRef();

  const canvasImage = useRef(null);
  const contextImage = useRef(null);

  const drawPixel = (canvas, ctx, index) => {
    
    let arrayStart = index * 2;
    let heightCount = index * 14;
    
  	for(let y = 0; y <= canvas.height; y+=16){
    	for(let x = 0; x <= canvas.width; x+=16){
          ctx.fillStyle = `rgb(${imageAverageColors.current[arrayStart + heightCount].r}, ${imageAverageColors.current[arrayStart + heightCount].g}, ${imageAverageColors.current[arrayStart + heightCount].b})`;
          ctx.fillRect(x, y, 16, 16);
         
          arrayStart++
      }
      
      arrayStart = 0;
      heightCount = 14*(index === 0 ? 1 : index);
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
    console.log("countcheck: ", Red, RedCount);
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
      

      drawPixel(pixelRef1.current, pixelRef1.current.getContext('2d'), 0);
      drawPixel(pixelRef2.current, pixelRef2.current.getContext('2d'), 1);
      drawPixel(pixelRef3.current, pixelRef3.current.getContext('2d'), 2);

      for(let x = 0; x < pixelRefArray.current.length; x++){
        if(pixelRefArray.current[x]){
          drawPixel(pixelRefArray.current[x], pixelRefArray.current[x].getContext('2d'), x);
        }
      }
    }    

  }

  const loadImage = () => {
    const newImage = new Image();
    newImage.src = "https://cdn.myanimelist.net/images/anime/3/20713.jpg";
    newImage.crossOrigin = "anonymous";
    newImage.onload = () => {
      
      canvasImage.current = imageRef.current;
      canvasImage.current.width = newImage.width;
      canvasImage.current.height = newImage.height;

      contextImage.current = canvasImage.current.getContext('2d',{alpha: false, willReadFrequently: true});
      contextImage.current.drawImage(newImage, 0, 0);
      
      pixelateInfo();
      
    }
  
    setImageAverageColorsForReal(imageAverageColors);
  }

  useEffect(() => {
    
    
    loadImage();
   
  },[])

  const displayCanvas = () => {
    let divs = [];
    for(let x = 0; x < 70; x++){
      divs.push(<canvas key={x} ref={(e) => pixelRefArray.current.push(e)} height="32px" width="32px"></canvas>);
    }
    return divs;
  }
  return (
    <>
      <nav>Anime Guesser
      </nav>
      <div className="guessImageContainer">
        <canvas ref={imageRef} id="image"></canvas>
        <div id="pixel-container">
          <canvas ref={pixelRef1} id="pixel1" height="32px" width="32px" style={question ? {display: "none"} : {display: "block"}}></canvas>
          <canvas ref={pixelRef2} id="pixel2" height="32px" width="32px" ></canvas>
          <canvas ref={pixelRef3} id="pixel3" height="32px" width="32px" ></canvas>
         {
          displayCanvas()
         }
        </div>
      </div>
      <button onClick={() => setQuestion(question ? false : true)}>
        big o'l Question
      </button>
      <canvas ref={testRef} height="320px" width="224"></canvas>

    </>
  )
}


export default App
