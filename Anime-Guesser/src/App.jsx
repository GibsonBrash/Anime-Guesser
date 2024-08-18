import { useState, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [question, setQuestion] = useState(false);
  //const [imageAverageColors, setImageAverageColors] = useState();

  const pixelRef1 = useRef();
  const pixelRef2 = useRef();
  const pixelRef3 = useRef();
  const imageRef = useRef();
  let imageAverageColors = useRef(new Array());

  const canvasImage = useRef(null);
  const contextImage = useRef(null);

  const drawPixel = (canvas, ctx) => {
    

  	for(let y = 0; y <= canvas.height; y+=16){
    	for(let x = 0; x <= canvas.width; x+=16){
          ctx.fillStyle = `rgb(${imageAverageColors.current[x].r}, ${imageAverageColors.current[x].g}, ${imageAverageColors.current[x].b})`;
          ctx.fillRect(x, y, 16, 16);
          
      	}
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
      //colors.push({"r":data[x],  "g":data[x+1], "b":data[x+2], "a":data[x+3]});
      Red += data[x];
      RedCount++;
      Blue += data[x+1];
      BlueCount++;
      Green += data[x+2];
      GreenCount++;
    }
    //console.log("array of colors mapped to correct label ", colors);
    const redAverage = Math.round(Red/RedCount);
    const greenAverage = Math.round(Green/GreenCount);
    const blueAverage = Math.round(Blue/BlueCount);
    
    return {r: redAverage , g: greenAverage, b: blueAverage};
  }

  const pixelateInfo = () => {
    const height = canvasImage.current.height;
    const width = canvasImage.current.width;

    for(let y = 0; y < height; y+=16){
      for(let x = 0; x < width-1; x+=16){
        const colors = getHandleImageData(contextImage.current.getImageData(x,y,16,16));
        imageAverageColors.current.push(colors);
      }
    }
    drawPixel(pixelRef1.current, pixelRef1.current.getContext('2d'));
    drawPixel(pixelRef2.current, pixelRef2.current.getContext('2d'));
    drawPixel(pixelRef3.current, pixelRef3.current.getContext('2d'));
    //const man = getHandleImageData(contextImage.current.getImageData(0,0,16,16));

  }

  const loadImage = () => {
    const newImage = new Image();
    newImage.src = "https://cdn.myanimelist.net/images/anime/3/20713.jpg";
    newImage.crossOrigin = "anonymous";
    newImage.onload = () => {
      console.log("image");
      canvasImage.current = imageRef.current;
      canvasImage.current.width = newImage.width;
      canvasImage.current.height = newImage.height;

      contextImage.current = canvasImage.current.getContext('2d');
      contextImage.current.drawImage(newImage, 0, 0);
      //console.log("image data maybe ", contextImage.current.getImageData(0,0,16,16));
      //const colors = getHandleImageDate(contextImage.current.getImageData(0,0,16,16));
      pixelateInfo();
      
    }
    
  }

  useEffect(() => {
    const canvasPixel1 = pixelRef1.current;
    const canvasPixel2 = pixelRef2.current;
    const canvasPixel3 = pixelRef3.current;
    const contextPixel1 = canvasPixel1.getContext('2d');
    const contextPixel2 = canvasPixel2.getContext('2d');
    const contextPixel3 = canvasPixel3.getContext('2d');
    console.log("yo ", canvasPixel1);
    loadImage();
    /*
    drawPixel(contextPixel1, canvasPixel1);
    drawPixel(contextPixel2, canvasPixel2);
    drawPixel(contextPixel3, canvasPixel3);
    */
  },[])

  
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
         
        </div>
      </div>
      <button onClick={() => setQuestion(question ? false : true)}>
        big o'l Question
      </button>
    </>
  )
}

export default App
