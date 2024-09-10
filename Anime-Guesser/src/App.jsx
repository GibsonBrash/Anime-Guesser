import { useState, useEffect, useRef, useCallback} from 'react';
import axios from "axios";
import './App.css';


function App() {
  
  const [reveal, setReveal] = useState(Array(70).fill(false));
  const [searchResults, setSearchResults] = useState();
  const [guessValue, setGuessValue] = useState('');
  const [loadSpinner, setLoadSpinner] = useState(false);
  const [showDropDown, setShowDropDown] = useState("none");
  const [dropDownHeight, setDropDownHeight] = useState("200px");
  const [dailyAnimeInfo, setDailyAnimeInfo] = useState(null);

  const [life, setLife] = useState({life1: null, life2: null, life3: null, life4: null, life5: null, life6: null});
  const [lifeCounter, setLifeCounter] = useState(6);
  const [guessDataHistory, setGuessDataHistory] = useState([]);

  const [guessData, setGuessData] = useState(null);
  const [unveilAnime,  setUnveilAnime] = useState("grid");

  const imageRef = useRef();
  const imageAverageColors = useRef(new Array());
  const pixelRefArray =  useRef(new Array());
  const canvasImage = useRef(null);
  const contextImage = useRef(null);
  

  const dropdownRef = useCallback(node => {
    if (!node) return;
      const resizeObserver = new ResizeObserver(() => { 
        console.log("node1, ", node.clientHeight);
        console.log("drop1, ", dropDownHeight);
         if(node.clientHeight < 200 && node.clientHeight > 0){
            console.log("node, ", node.clientHeight);
            console.log("drop, ", dropDownHeight);
            setDropDownHeight("fit-content");
          }else if(node.clientHeight >= 200){
            setDropDownHeight("200px");
          } 
      });
    
      resizeObserver.observe(node);
    
  }, []);

  




  useEffect( () => {
    async function getDailyAnime(){ 
      await axios.get("http://localhost:8001/getDailyAnime")
      .then((response) => {
        console.log("anime daily iamge, ", response.data);  
        loadImage(response.data);
        setDailyAnimeInfo(response.data);
        setReveal(handleSectionReveal(1));
      }).catch((err) => {
        console.log("error: ", err);
      });
    }
    getDailyAnime();
   
  },[])


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

       
    
    if(imageAverageColors.current.length === 0){
      for(let y = 0; y < height; y+=16){
        for(let x = 0; x < width-1; x+=16){
          const colors = getHandleImageData(contextImage.current.getImageData(x,y,16,16));
          
          
          
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

  const loadImage = (data) => {
    const newImage = new Image();
    newImage.src = data.main_picture.medium || "https://cdn.myanimelist.net/images/anime/1015/138006.jpg";
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

  

  const handlePixelRefArray = (e) => {
    if(pixelRefArray.current.length < 70){
      pixelRefArray.current.push(e);
    }
  }


  const handleSectionReveal = (guessNum) => {
    switch(guessNum){
      case 1:
        return (
          reveal.map((input, index) => {
            switch(index){
              case 5:
                return !input;
              case 6: 
                return !input;
              case 12:
                return !input;
              case 13:
                return !input;
              case 19:
                return !input;
              case 20:
                return !input;  
              default:
                return input;
            }
         }));
      case 2:
        return( 
          reveal.map((input, index) => {
            switch(index){
              case 21:
                return !input;
              case 22: 
                return !input;
              case 28:
                return !input;
              case 29:
                return !input;
              case 35:
                return !input;
              case 36:
                return !input;  
              default:
                return input;
            }
          }));
      case 3:
        return(
          reveal.map((input, index) => {
            switch(index){
              case 54:
                return !input;
              case 55: 
                return !input;
              case 61:
                return !input;
              case 62:
                return !input;
              case 68:
                return !input;
              case 69:
                return !input;  
              default:
                return input;
            }
          }));
      case 4:
        return(
          reveal.map((input, index) => {
            switch(index){
              case 52:
                return !input;
              case 53: 
                return !input;
              case 59:
                return !input;
              case 60:
                return !input;
              case 66:
                return !input;
              case 67:
                return !input;  
              default:
                return input;
            }
          }));
      case 5:
        return(
          reveal.map((input, index) => {
            switch(index){
              case 26:
                return !input;
              case 27: 
                return !input;
              case 33:
                return !input;
              case 34:
                return !input;
              case 40:
                return !input;
              case 41:
                return !input;  
              default:
                return input;
            }
          }))
      case 6:
        return(
          reveal.map((input, index) => {
            switch(index){
              case 26:
                return !input;
              case 27: 
                return !input;
              case 33:
                return !input;
              case 34:
                return !input;
              case 40:
                return !input;
              case 41:
                return !input;  
              default:
                return input;
            }
          }));
    }
  }

  const handleDisplay = () => {
  
    if(guessData){
      if(guessData.id === dailyAnimeInfo.id){
        console.log("LETS FUCKING GO ENGALADAND");
        setUnveilAnime("none");
      }else{
        switch(lifeCounter){
          case 1:
            setUnveilAnime("none");
            setLife({...life, life1:true});
            setGuessDataHistory(array => [...array, guessData]);
            break;
          case 2:
            setReveal(handleSectionReveal(6));
            setLifeCounter(1);
            setLife({...life, life2:true});
            setGuessDataHistory(array => [...array, guessData]);
            break;  
          case 3:
            setReveal(handleSectionReveal(5));
            setLifeCounter(2);
            setLife({...life, life3:true});
            setGuessDataHistory(array => [...array, guessData]);
            break;
          case 4:
            setReveal(handleSectionReveal(4));
            setLifeCounter(3);
            setLife({...life, life4:true});
            setGuessDataHistory(array => [...array, guessData]);
            break;
          case 5:
            setReveal(handleSectionReveal(3));
            setLifeCounter(4);
            setLife({...life, life5:true});
            setGuessDataHistory(array => [...array, guessData]);
            break;
          case 6:
            setReveal(handleSectionReveal(2));
            setLifeCounter(5);
            setLife({...life, life6:true});
            setGuessDataHistory(array => [...array, guessData]);
        }
      }
    }
  }

  const handleGuess = async () => {
    
      await axios.get(`http://localhost:8001/search`, {
        params:{
          query:guessValue
        },
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        console.log("response, ", response.data);
        
        setLoadSpinner(false);
        setSearchResults(response.data);
        setGuessData(null);
        
        
        
      }).catch((err) => {
        console.log("error: ", err);
      });
    
    
  }

  useEffect(() => {
    if(guessData === null){
      if(loadSpinner === false){
        setLoadSpinner(true);
      }
      
      if(guessValue.length > 0){
        if(showDropDown === "none"){
          setShowDropDown("block");
        }
        const delayDebounceFn = setTimeout(() => {
          handleGuess();
        }, 500);
      
        return () => clearTimeout(delayDebounceFn)
      }else{
        if(showDropDown === "block"){
          setShowDropDown("none");
        }
      }
    }
  }, [guessValue]);

  

  const handleItemGuess = (item) => {
    console.log("worky twerk");
    setShowDropDown("none");
    setGuessValue(item.alternative_titles.en);
    setGuessData(item);
    
  }

  const handleDropDownFocus = () =>{
    if(guessValue.length > 0){
      setShowDropDown("block");
    }
  }

  const handleDropDownBlur = () =>{
    setShowDropDown("none");
  }

  const handleSkip = () => {
        const revealUpdate = reveal.map((input, index) => {
          if(0 === index){
            return !input;
          }else{
            return input;
          }
        });
        setReveal(revealUpdate);
        switch(lifeCounter){
          case 1:
            setUnveilAnime("none");
            setLife({...life, life1:true});
            setGuessDataHistory(array => [...array, "Skip"]);
            break;
          case 2:
            setLifeCounter(1);
            setLife({...life, life2:true});
            setGuessDataHistory(array => [...array, "Skip"]);
            break;  
          case 3:
            setLifeCounter(2);
            setLife({...life, life3:true});
            setGuessDataHistory(array => [...array, "Skip"]);
            break;
          case 4:
            setLifeCounter(3);
            setLife({...life, life4:true});
            setGuessDataHistory(array => [...array, "Skip"]);
            break;
          case 5:
            setLifeCounter(4);
            setLife({...life, life5:true});
            setGuessDataHistory(array => [...array, "Skip"]);
            break;
          case 6:
            setLifeCounter(5);
            setLife({...life, life6:true});
            setGuessDataHistory(array => [...array, "Skip"]);
            
        }
  }


  const handleGuessHistory = (guessNum) =>{
    return(
      <div className='guessInfo'>
        <div className='guess'>
          {guessDataHistory[guessNum] === "Skip" ? (guessDataHistory[guessNum]) : (guessDataHistory[guessNum].alternative_titles.en.length > 18 ? guessDataHistory[guessNum].alternative_titles.en.slice(0,18) + "..." : guessDataHistory[guessNum].alternative_titles.en )}
          <span className="tooltiptext">{guessDataHistory[guessNum] === "Skip" ? guessDataHistory[guessNum] : guessDataHistory[guessNum].alternative_titles.en}</span>
        </div>
        <span className='hints'>
          <div className='genres'>{handleGenres(guessNum)}</div>
          <div className='studios'>{handleStudios(guessNum)}</div>
        </span>
      </div>
    );
  }

  const handleGenres = (guessNum) => {
    return guessDataHistory[guessNum].genres.map((item, index) => {
      for(let x = 0; x < dailyAnimeInfo.genres.length; x++){
        if(dailyAnimeInfo.genres[x].id === item.id){
          return(<div style={{marginLeft: "10px"}} key={index}>{item.name}</div>);
        }
      }
    });
    
  }

  const handleStudios = (guessNum) => {
    return guessDataHistory[guessNum].studios.map((item, index) => {
      for(let x = 0; x < dailyAnimeInfo.studios.length; x++){
        if(dailyAnimeInfo.studios[x].id === item.id){
          return(<div style={{marginLeft: "10px"}} key={index}>{item.name}</div>);
        }
      }
    });
  }

  return (
    <>
      <nav>
        Anime Guesser
      </nav>
      <div className="guessImageContainer">
        <canvas ref={imageRef} id="image"></canvas>
        <div id="pixel-container" style={{display: unveilAnime}}>
         {
          reveal.map((input, index) => {
            return(<canvas key={index} ref={(e) => handlePixelRefArray(e)} height="32px" width="32px" style={input ? {opacity: "0"} : {opacity: "1"}}></canvas>)
          })
         }
        </div>
      </div>
      <div className='guessField-Container'>
        <input className="guessField" autoComplete='off' onFocus={() => handleDropDownFocus()} onBlur={() => handleDropDownBlur()} onChange={(e) => {setGuessValue(e.target.value); setGuessData(null)}} placeholder='Search for an Anime' value={guessValue}/>
        <div className='dropDown' style={{display: showDropDown, height: dropDownHeight}}>
          {loadSpinner ? 
          <div>8===D</div> :
          <ul ref={dropdownRef} className='guessList'>
            {
              searchResults ? searchResults.map((item, index) =>{
                return(<li key={index} onMouseDown={(e) => e.preventDefault()} onClick={() => handleItemGuess(item)}>{item.alternative_titles.en}</li>)
              }) 
              :
              <></>
            }
          </ul>
          }
        </div>
        <div className='button-container'>
          <button className="skipButton" onClick={() => handleSkip()}>Skip</button>
          <button className="guessButton" onClick={() => handleDisplay()}>Guess</button>
        </div>
      </div>
      <div className='lifeCounter'>
        { life.life1 ? <div>X</div> : <div className='life'>Life 1</div> }
        { life.life2 ? <div>X</div> : <div className='life'>Life 2</div> }
        { life.life3 ? <div>X</div> : <div className='life'>Life 3</div> }
        { life.life4 ? <div>X</div> : <div className='life'>Life 4</div> }
        { life.life5 ? <div>X</div> : <div className='life'>Life 5</div> }
        { life.life6 ? <div>X</div> : <div className='life'>Life 6</div> }
      </div>
      <div className='guessHistory'>
        { life.life6 ? handleGuessHistory(0) : <></> }
        { life.life5 ? handleGuessHistory(1) : <></> }
        { life.life4 ? handleGuessHistory(2) : <></> }
        { life.life3 ? handleGuessHistory(3) : <></> }
        { life.life2 ? handleGuessHistory(4) : <></> }
        { life.life1 ? handleGuessHistory(5) : <></> }
      </div>
        
      
    </>
  )
}


export default App
