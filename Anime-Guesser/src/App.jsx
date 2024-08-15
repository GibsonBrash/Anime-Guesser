import { useState, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [number, setNumber] = useState(0);

  const pixelRef = useRef();
  const imageRef = useRef();

  const canvasImage = useRef(null);
  const contextImage = useRef(null);

  const drawPixel = (ctx, canvas) => {
    const list = ["red","blue"]
	  let m = 0;
  	for(let y = 0; y <= canvas.height; y+=10){
    	for(let x = 0; x <= canvas.width; x+=10){
          ctx.fillStyle = list[m]
          ctx.fillRect(x, y, 10, 10);
          if(m === 0){
              m = 1;
          }else{
              m = 0;
          }
      	}
  	}
  }

  const loadImage = () => {
    const newImage = new Image();
    newImage.src = "https://cdn.myanimelist.net/images/anime/3/20713.jpg";
    
    newImage.onload = () => {
      canvasImage.current = imageRef.current;
      canvasImage.current.width = newImage.width;
      canvasImage.current.height = newImage.height;

      contextImage.current = canvasImage.current.getContext('2d');
      contextImage.current.drawImage(newImage, 0, 0);

    }
  }

  useEffect(() => {
    const canvasPixel = pixelRef.current;
    const contextPixel = canvasPixel.getContext('2d');

    loadImage();
    drawPixel(contextPixel, canvasPixel);

  },[])

  const mathima = () => {
    let people = 10;
    people += 5;
    setNumber(people);
  }
  return (
    <>
      <nav>Anime Guesser
      <button onClick={() => mathima()}>
        number: {number}
      </button>

      </nav>
      <div className="guessImageContainer">
        <canvas ref={imageRef} id="image"></canvas>
        <canvas ref={pixelRef} id="pixel1"></canvas>
      </div>

    </>
  )
}

export default App
