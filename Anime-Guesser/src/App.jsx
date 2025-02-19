import { useState, useEffect, useRef, useCallback} from 'react';
import axios from "axios";
import './App.css';
import StudioLogos from './components/StudioLogos.jsx';

import LifeUsed from './svg/LifeUsed.png';
import LifeFull from './svg/LifeFull.png';
import ArchiveIcon from './svg/Archive.png';
import AboutIcon from './svg/About.png';

import Archive from './components/Archive.jsx';
import About from './components/About.jsx';
import HandleGuessHistory from './components/handleGuessHistory.jsx';

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
  const [showDailyAnimeInfo, setShowDailyAnimeInfo] =  useState("none");

  const [guessData, setGuessData] = useState(null);
  const [unveilAnime,  setUnveilAnime] = useState("grid");

  const [hintsDisplay, setHintsDisplay] = useState(Array(6).fill({genre:"flex", studio:"flex"}));
  const [relatedAnimeHint, setRelatedAnimeHint] = useState(Array(6).fill(false));

  //Archive State
  const [archiveDisplay, setArchiveDisplay] = useState(false);
  const [archiveData, setArchiveData] = useState(null);

  //About State
  const [aboutDisplay, setAboutDisplay] = useState(false);


  //Anime Pixelization Ref's
  const imageRef = useRef();
  const imageAverageColors = useRef(new Array());
  const pixelRefArray =  useRef(new Array());
  const canvasImage = useRef(null);
  const contextImage = useRef(null);
  

  const dropdownRef = useCallback(node => {
    if (!node) return;
      const resizeObserver = new ResizeObserver(() => {  
         if(node.clientHeight < 200 && node.clientHeight > 0){
            setDropDownHeight("fit-content");
          }else if(node.clientHeight >= 200){
            setDropDownHeight("200px");
          } 
      });
    
      resizeObserver.observe(node);
    
  }, []);

  

  const getArchiveGuessData = async (id, num) => {
    await axios.get("http://localhost:8001/getAnime", {
      params:{
        id:id
      },
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      handlePreviousStorageInfo(response.data.reverse(), num);
    }).catch((err) => {
      console.log("erryo: ", err);
    });
   
  }

  const handlePreviousStorageInfo = (data, num) => {

    setGuessDataHistory(array => [...array, ...data]);
    handlePreviousShowHint(data);
    handlePreviousRelatedAnimeHint(num, data);

    switch(num){
      case 5:
        setLife({life1:true, life2:true, life3:true, life4:true, life5:true, life6:true});
        break;
      case 4:
        setLife({...life, life2:true, life3:true, life4:true, life5:true, life6:true});
        break;
      case 3:
        setLife({...life, life3:true, life4:true, life5:true, life6:true});
        break;
      case 2:
        setLife({...life, life4:true, life5:true, life6:true});
        break;
      case 1:
        setLife({...life, life5:true, life6:true});
        break;
      case 0:
        setLife({...life, life6:true});
        break;
    }
    
  }

  const handleLocalStorageCheck = async (dailyData) => {
    if(dailyData){
      let check = localStorage.getItem(`DailyGuesses#${dailyData.dayNumber}`);
      
      if(check){
        const data = JSON.parse(check);
        const dataLength = Object.keys(data).length;
        
        switch(dataLength){
          case 1:
            getArchiveGuessData(data, 0);
            setReveal(handlePreviousSectionReveal(2));
            setLifeCounter(5);
            break;
          case 2:
            getArchiveGuessData(data, 1);
            setReveal(handlePreviousSectionReveal(3));
            setLifeCounter(4);
            break;
          case 3:
            getArchiveGuessData(data, 2);
            setReveal(handlePreviousSectionReveal(4));
            setLifeCounter(3);
            break;
          case 4:
            getArchiveGuessData(data, 3);
            setReveal(handlePreviousSectionReveal(5));
            setLifeCounter(2);
            break;
          case 5:
            getArchiveGuessData(data, 4);
            setReveal(handlePreviousSectionReveal(6));
            setLifeCounter(1);
          break;
          case 6:
            getArchiveGuessData(data, 5);
            setUnveilAnime("none");
            setShowDailyAnimeInfo("block");
            break;
        }
      }
    }
  }


  const handlePreviousSectionReveal = (guessNum) => {
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
              case 47:
                return !input;
              case 48:
                return !input;  
              default:
                return input;
            }
          }))
      case 6:
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
              case 47:
                return !input;
              case 48:
                return !input;
              case 23:
                return !input;
              case 24:
                return !input;
              case 25: 
                return !input;
              case 30: 
                return !input;
              case 31:
                return !input;
              case 32:
                return !input;
              case 37: 
                return !input;
              case 38:
                return !input;
              case 39:
                return !input;
              case 44:
                return !input;
              case 45:
                return !input;
              case 46:
                return !input;   
              default:
                return input;
            }
          }));
    }
  }

  const getArchive = async () => {
      await axios.get("http://localhost:8001/getArchive")
      .then((response) => {
          //console.log("response Archive: ", response);
          setArchiveDisplay(!archiveDisplay);
          setArchiveData(response.data);
      }).catch((err) => {
          console.log("err: ", err);
      });
  }

  useEffect(() => {
    if(dailyAnimeInfo != null){
      //console.log("ghiiasdf",guessDataHistory);
      handleLocalStorageCheck(dailyAnimeInfo);
      
    }
    
  },[dailyAnimeInfo])


  const handlePreviousRelatedAnimeHint = (num, info) =>{
    let tempArray = Array(6).fill(false);
   
    for(let y = 0; y <= num; y++){ 
      for(let x = 0; x < dailyAnimeInfo.related_anime.length; x++){
        if(info[y] !== "Skip"){
          if(dailyAnimeInfo.related_anime[x].node.id === info[y].id){ 
            tempArray[y] = true;
          }
        }
      }
      
    }
    
    //console.log("tepasdf: ", tempArray);
    setRelatedAnimeHint(tempArray);
  }

  const handlePreviousShowHint = (info) => {
    let tempArray = Array(6).fill({genre:"flex", studio:"flex"});
    //console.log("info.length: ", info);
    
    if(info){
      for(let j = 0; j < info.length; j++){
        if(info[j] !== "Skip"){
          let matchStudioCount = 0;
          let matchGenreCount = 0;
          info[j].studios.map((item) => {
            for(let x = 0; x < dailyAnimeInfo.studios.length; x++){
              if(dailyAnimeInfo.studios[x].id === item.id){
                matchStudioCount++;
              }
            }
          });
          info[j].genres.map((item) => {
            for(let x = 0; x < dailyAnimeInfo.genres.length; x++){
              if(dailyAnimeInfo.genres[x].id === item.id){
                matchGenreCount++;
              }
            }
          });
          
          if(matchGenreCount > 0 && matchStudioCount === 0){
            
            tempArray[j] = {
              studio: "none"
            }
            
          }else if(matchGenreCount === 0 && matchStudioCount > 0){
            
            tempArray[j] = {
              genre: "none",
            }
            
          }else if(matchGenreCount === 0 && matchStudioCount === 0){
        
            tempArray[j] = {
              genre: "none",
              studio: "none"
            }
            
          }
        }else{
   
          tempArray[j] = {
            genre: "none",
            studio: "none"
          }
          
        }
      }
      
      setHintsDisplay(tempArray);
    }
  }

  useEffect(() => {
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
    if(dailyAnimeInfo === null){
      //console.log("heasdfasdfasdfasdfasf");
      getDailyAnime();
    }
    
   
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
              case 47:
                return !input;
              case 48:
                return !input;  
              default:
                return input;
            }
          }))
      case 6:
        return(
          reveal.map((input, index) => {
            switch(index){
              case 23:
                return !input;
              case 24:
                return !input;
              case 25: 
                return !input;
              case 30: 
                return !input;
              case 31:
                return !input;
              case 32:
                return !input;
              case 37: 
                return !input;
              case 38:
                return !input;
              case 39:
                return !input;
              case 44:
                return !input;
              case 45:
                return !input;
              case 46:
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
        
        setUnveilAnime("none");
        setShowDailyAnimeInfo("block");
       
      }else{
        switch(lifeCounter){
          case 1:
            setUnveilAnime("none");
            setShowDailyAnimeInfo("block");
            setLife({...life, life1:true});
            setGuessDataHistory(array => [...array, guessData]);
            handleShowHint(5);
            handleRelatedAnimeHint(5);
            localStorage.setItem(`DailyGuesses#${dailyAnimeInfo.dayNumber}`, JSON.stringify({guessName6: guessData.id, ...JSON.parse(localStorage.getItem(`DailyGuesses#${dailyAnimeInfo.dayNumber}`))}));
            break;
          case 2:
            setReveal(handleSectionReveal(6));
            setLifeCounter(1);
            setLife({...life, life2:true});
            setGuessDataHistory(array => [...array, guessData]);
            handleShowHint(4);
            handleRelatedAnimeHint(4);
            localStorage.setItem(`DailyGuesses#${dailyAnimeInfo.dayNumber}`, JSON.stringify({guessName5: guessData.id, ...JSON.parse(localStorage.getItem(`DailyGuesses#${dailyAnimeInfo.dayNumber}`))}));
            break;  
          case 3:
            setReveal(handleSectionReveal(5));
            setLifeCounter(2);
            setLife({...life, life3:true});
            setGuessDataHistory(array => [...array, guessData]);
            handleShowHint(3);
            handleRelatedAnimeHint(3);
            localStorage.setItem(`DailyGuesses#${dailyAnimeInfo.dayNumber}`, JSON.stringify({guessName4: guessData.id, ...JSON.parse(localStorage.getItem(`DailyGuesses#${dailyAnimeInfo.dayNumber}`))}));
            break;
          case 4:
            setReveal(handleSectionReveal(4));
            setLifeCounter(3);
            setLife({...life, life4:true});
            setGuessDataHistory(array => [...array, guessData]);
            handleShowHint(2);
            handleRelatedAnimeHint(2);
            localStorage.setItem(`DailyGuesses#${dailyAnimeInfo.dayNumber}`, JSON.stringify({guessName3: guessData.id, ...JSON.parse(localStorage.getItem(`DailyGuesses#${dailyAnimeInfo.dayNumber}`))}));
            break;
          case 5:
            setReveal(handleSectionReveal(3));
            setLifeCounter(4);
            setLife({...life, life5:true});
            setGuessDataHistory(array => [...array, guessData]);
            handleShowHint(1);
            handleRelatedAnimeHint(1);
            localStorage.setItem(`DailyGuesses#${dailyAnimeInfo.dayNumber}`, JSON.stringify({guessName2: guessData.id, ...JSON.parse(localStorage.getItem(`DailyGuesses#${dailyAnimeInfo.dayNumber}`))}));
            break;
          case 6:
            setReveal(handleSectionReveal(2));
            setLifeCounter(5);
            setLife({...life, life6:true});
            setGuessDataHistory(array => [...array, guessData]);
            handleShowHint(0);
            handleRelatedAnimeHint(0);
            localStorage.setItem(`DailyGuesses#${dailyAnimeInfo.dayNumber}`, JSON.stringify({guessName1: guessData.id}));
        }
      }
    }
  }

  const handleRelatedAnimeHint = (num) => {
  
      let tempArray;
      for(let x = 0; x < dailyAnimeInfo.related_anime.length; x++){
        if(dailyAnimeInfo.related_anime[x].node.id === guessData.id){
          
          tempArray = relatedAnimeHint.map((hint, index) => {
            if(index === num){
              return true;
            }else{
              return hint;
            }
          });
          setRelatedAnimeHint(tempArray);
        }
      }
    
  }

  const handleShowHint = (i) => {
    let tempArray;
    let matchStudioCount = 0;
    let matchGenreCount = 0;
    
    if(guessData){
      
      guessData.studios.map((item) => {
        for(let x = 0; x < dailyAnimeInfo.studios.length; x++){
          if(dailyAnimeInfo.studios[x].id === item.id){
            matchStudioCount++;
          }
        }
      });
      guessData.genres.map((item) => {
        for(let x = 0; x < dailyAnimeInfo.genres.length; x++){
          if(dailyAnimeInfo.genres[x].id === item.id){
            matchGenreCount++;
          }
        }
      });
      
    
      console.log("matchrelatedAnime");
      if(matchGenreCount > 0 && matchStudioCount === 0){

        tempArray = hintsDisplay.map((hint, index) => {
          if(index === i){
            return {
              studio: "none"
            };
          }else{
            return hint;
          }
        });
        setHintsDisplay(tempArray);
      }else if(matchGenreCount === 0 && matchStudioCount > 0){
        
        tempArray = hintsDisplay.map((hint, index) => {
          if(index === i){
            return {
              genre: "none",
            };
          }else{
            return hint;
          }
        });
        setHintsDisplay(tempArray);
      }else if(matchGenreCount === 0 && matchStudioCount === 0){
     
        tempArray = hintsDisplay.map((hint, index) => {
          if(index === i){
            return {
              genre: "none",
              studio: "none"
            };
          }else{
            return hint;
          }
        });
        setHintsDisplay(tempArray);
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
        
        switch(lifeCounter){
          case 1:
            setShowDailyAnimeInfo("block");
            setUnveilAnime("none");
            setLife({...life, life1:true});
            setGuessDataHistory(array => [...array, "Skip"]);
            const tempArrayS1 = hintsDisplay.map((hint, index) => {
              if(index === 5){
                return {
                  genre: "none",
                  studio: "none"
                };
              }else{
                return hint;
              }
            });
            setHintsDisplay(tempArrayS1);
            localStorage.setItem(`DailyGuesses#${dailyAnimeInfo.dayNumber}`, JSON.stringify({guessName6: "Skip", ...JSON.parse(localStorage.getItem(`DailyGuesses#${dailyAnimeInfo.dayNumber}`))}));
            break;
          case 2:
            setLifeCounter(1);
            setLife({...life, life2:true});
            setGuessDataHistory(array => [...array, "Skip"]);
            setReveal(handleSectionReveal(6));
            const tempArrayS2 = hintsDisplay.map((hint, index) => {
              if(index === 4){
                return {
                  genre: "none",
                  studio: "none"
                };
              }else{
                return hint;
              }
            });
            setHintsDisplay(tempArrayS2);
            localStorage.setItem(`DailyGuesses#${dailyAnimeInfo.dayNumber}`, JSON.stringify({guessName5: "Skip", ...JSON.parse(localStorage.getItem(`DailyGuesses#${dailyAnimeInfo.dayNumber}`))}));
            break;  
          case 3:
            setLifeCounter(2);
            setLife({...life, life3:true});
            setGuessDataHistory(array => [...array, "Skip"]);
            setReveal(handleSectionReveal(5));
            const tempArrayS3 = hintsDisplay.map((hint, index) => {
              if(index === 3){
                return {
                  genre: "none",
                  studio: "none"
                };
              }else{
                return hint;
              }
            });
            setHintsDisplay(tempArrayS3);
            localStorage.setItem(`DailyGuesses#${dailyAnimeInfo.dayNumber}`, JSON.stringify({guessName4: "Skip", ...JSON.parse(localStorage.getItem(`DailyGuesses#${dailyAnimeInfo.dayNumber}`))}));
            break;
          case 4:
            setLifeCounter(3);
            setLife({...life, life4:true});
            setGuessDataHistory(array => [...array, "Skip"]);
            setReveal(handleSectionReveal(4));
            const tempArrayS4 = hintsDisplay.map((hint, index) => {
              if(index === 2){
                return {
                  genre: "none",
                  studio: "none"
                };
              }else{
                return hint;
              }
            });
            setHintsDisplay(tempArrayS4);
            localStorage.setItem(`DailyGuesses#${dailyAnimeInfo.dayNumber}`, JSON.stringify({guessName3: "Skip", ...JSON.parse(localStorage.getItem(`DailyGuesses#${dailyAnimeInfo.dayNumber}`))}));
            break;
          case 5:
            setLifeCounter(4);
            setLife({...life, life5:true});
            setGuessDataHistory(array => [...array, "Skip"]);
            setReveal(handleSectionReveal(3));
            const tempArrayS5 = hintsDisplay.map((hint, index) => {
              if(index === 1){
                return {
                  genre: "none",
                  studio: "none"
                };
              }else{
                return hint;
              }
            });
            setHintsDisplay(tempArrayS5);
            localStorage.setItem(`DailyGuesses#${dailyAnimeInfo.dayNumber}`, JSON.stringify({guessName2: "Skip", ...JSON.parse(localStorage.getItem(`DailyGuesses#${dailyAnimeInfo.dayNumber}`))}));
            break;
          case 6:
            setLifeCounter(5);
            setLife({...life, life6:true});
            setGuessDataHistory(array => [...array, "Skip"]);
            setReveal(handleSectionReveal(2));
            const tempArrayS6 = hintsDisplay.map((hint, index) => {
                if(index === 0){
                  return {
                    genre: "none",
                    studio: "none"
                  };
                }else{
                  return hint;
                }
            });
            setHintsDisplay(tempArrayS6);
            localStorage.setItem(`DailyGuesses#${dailyAnimeInfo.dayNumber}`, JSON.stringify({guessName1: "Skip"}));
            break;
            
        }
  }

 

  return (
    <>
      <div className='backgroundImage'></div>
      <nav className='navbar-Container'>
        <img src={ArchiveIcon} id="archive" onClick={() => getArchive()}/>
        <Archive archiveDisplay={archiveDisplay} setArchiveDisplay={setArchiveDisplay} archiveData={archiveData} setArchiveData={setArchiveData} />
        <div className='siteName'>AG</div>
        <img src={AboutIcon} id="about" onClick={() => setAboutDisplay(!aboutDisplay)}/>
        <About aboutDisplay={aboutDisplay} setAboutDisplay={setAboutDisplay}/>
      </nav>
      
      <div className='game-container'>
      {dailyAnimeInfo ? <i className='dayCount'>Day {dailyAnimeInfo.dayNumber}</i> : <></>}
      <div className='dailyAnime-Container' style={showDailyAnimeInfo === "block" ? {animation: "slide-left 3s ease"} : {}}>
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
        {dailyAnimeInfo ?
          <div className="dailyAnimeInfo-Container" style={showDailyAnimeInfo === "block" ? {animation: "slide 3s ease", display: "block"} : {display:"none"}} >
            <h3 className='dailyAnimeInfo-Title'>{dailyAnimeInfo.title}</h3>
            <div className='infoItem-Container'>
              <div className="label">Year:&nbsp;</div>
              <span>{dailyAnimeInfo.start_season.year}</span>
            </div>
            <div className='infoItem-Container'>
              <div className="label">Episodes:&nbsp;</div>
              <div>{dailyAnimeInfo.num_episodes}</div>
            </div>
            <div className='infoItem-Container'>
              <div className="label">Status:&nbsp;</div>
              <div>{dailyAnimeInfo.status === "finished_airing" ? "Finished Airing": dailyAnimeInfo.status}</div>
            </div>
            <div className='infoItem-Container'>
              <div className="label">MAL Score:&nbsp;</div>
              <div>{dailyAnimeInfo.mean}/10</div>
            </div>
            <div className='infoItem-Container'>
              <div className="label">MAL Rank:&nbsp;</div>
              <div>{dailyAnimeInfo.rank}</div>
            </div>
            <div className='infoItem-Container'>
              <div className="label">Rating:&nbsp;</div>
              <div>{dailyAnimeInfo.rating.toUpperCase()}</div>
            </div>
            <div className='infoItem-Container'>
              <div className="label">Type:&nbsp;</div>
              <div>{dailyAnimeInfo.media_type.toUpperCase()}</div>
            </div>
            &nbsp;&nbsp;
            <div>
              <div className="synopsis">Synopsis:&nbsp;</div>
              <div>{dailyAnimeInfo.synopsis}</div>
            </div>
            &nbsp;&nbsp;
            <div>
              <div className="label">Genres:&nbsp;</div>
              <ul className='infoList-Container'>
              {dailyAnimeInfo.genres.map((genre, index) => {
                  return(<li key={index}>{genre.name}</li>)
                })}
              </ul>
            </div>
            <div>
              <div className="label">Studios:&nbsp;</div> 
              <ul className='infoList-Container'>
                {dailyAnimeInfo.studios.map((studio, index) => {
                  
                  return(<StudioLogos studio={studio}/>)
                  /*
                  if(studio.name === "Bones"){
                    return(<Bones />)
                  }else{
                    return(<li key={index}>{studio.name}</li>)
                  }
                    */
                })}
              </ul>
            </div>
            <i className='altName-label'>Also Known as: </i>
            <i className='altName-label'>
              <div>{dailyAnimeInfo.alternative_titles.en}</div>
              <div>{dailyAnimeInfo.alternative_titles.ja}</div>
            {dailyAnimeInfo.alternative_titles.synonyms.map((synonyms, index) => {
              return(<div key={index}>{synonyms}</div>)
            })}</i>
            <div><a href={`https://myanimelist.net/anime/${dailyAnimeInfo.id}/`}>MyAnimeList Anime Page</a></div>
          </div>
          :
          <></>
        }
      </div>
      { (showDailyAnimeInfo === "block") ? <div>Winner</div> :
      <div className='guessField-Container'>
        <input className="guessField" autoComplete='off' onFocus={() => handleDropDownFocus()} onBlur={() => handleDropDownBlur()} onChange={(e) => {setGuessValue(e.target.value); setGuessData(null)}} placeholder='Search for an Anime' value={guessValue}/>
        <div className='dropDown' style={{display: showDropDown, height: dropDownHeight}}>
          {loadSpinner ? 
          <div>Loading...</div> :
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
      </div>}
      <div className='lifeCounter'>
        { life.life1 ? <img className='life' src={LifeUsed}/> : <img className='life' src={LifeFull}/> }
        { life.life2 ? <img className='life' src={LifeUsed}/> : <img className='life' src={LifeFull}/> }
        { life.life3 ? <img className='life' src={LifeUsed}/> : <img className='life' src={LifeFull}/> }
        { life.life4 ? <img className='life' src={LifeUsed}/> : <img className='life' src={LifeFull}/> }
        { life.life5 ? <img className='life' src={LifeUsed}/> : <img className='life' src={LifeFull}/> }
        { life.life6 ? <img className='life' src={LifeUsed}/> : <img className='life' src={LifeFull}/> }
      </div>
      <div className='guessHistory'>
        { life.life6 ? <HandleGuessHistory guessNum={0} guessDataHistory={guessDataHistory} dailyAnimeInfo={dailyAnimeInfo} relatedAnimeHint={relatedAnimeHint} hintsDisplay={hintsDisplay}/> : <></> }
        { life.life5 ? <HandleGuessHistory guessNum={1} guessDataHistory={guessDataHistory} dailyAnimeInfo={dailyAnimeInfo} relatedAnimeHint={relatedAnimeHint} hintsDisplay={hintsDisplay}/> : <></> }
        { life.life4 ? <HandleGuessHistory guessNum={2} guessDataHistory={guessDataHistory} dailyAnimeInfo={dailyAnimeInfo} relatedAnimeHint={relatedAnimeHint} hintsDisplay={hintsDisplay}/> : <></> }
        { life.life3 ? <HandleGuessHistory guessNum={3} guessDataHistory={guessDataHistory} dailyAnimeInfo={dailyAnimeInfo} relatedAnimeHint={relatedAnimeHint} hintsDisplay={hintsDisplay}/> : <></> }
        { life.life2 ? <HandleGuessHistory guessNum={4} guessDataHistory={guessDataHistory} dailyAnimeInfo={dailyAnimeInfo} relatedAnimeHint={relatedAnimeHint} hintsDisplay={hintsDisplay}/> : <></> }
        { life.life1 ? <HandleGuessHistory guessNum={5} guessDataHistory={guessDataHistory} dailyAnimeInfo={dailyAnimeInfo} relatedAnimeHint={relatedAnimeHint} hintsDisplay={hintsDisplay}/> : <></> }
      </div>
        
      </div>
    </>
  )
}


export default App
