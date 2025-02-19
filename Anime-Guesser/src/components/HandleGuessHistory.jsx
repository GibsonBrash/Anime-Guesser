import '../App.css';

import StudioLogos from './StudioLogos.jsx';
import GenreLogos from './GenreLogos.jsx';
import "./GenreLogos.css"

function HandleGuessHistory({guessNum, guessDataHistory, dailyAnimeInfo, relatedAnimeHint, hintsDisplay}){

    const handleGenres = (guessNum) => {
        if(guessDataHistory[guessNum].genres){
          return guessDataHistory[guessNum].genres.map((item, index) => {
            for(let x = 0; x < dailyAnimeInfo.genres.length; x++){
              if(dailyAnimeInfo.genres[x].id === item.id){
                return(<div className="" style={{marginLeft: "10px"}} key={index}><GenreLogos genre={item}/></div>);
              }
            }
          });
        }
    }
    
    const handleStudios = (guessNum) => {
        if(guessDataHistory[guessNum].studios){
          return guessDataHistory[guessNum].studios.map((item, index) => {
            for(let x = 0; x < dailyAnimeInfo.studios.length; x++){
              if(dailyAnimeInfo.studios[x].id === item.id){
                return(<div style={{marginLeft: "10px"}} key={index}><StudioLogos studio={item}/></div>);
              }
            }
          });
        }
    }

    return(
        <>
            <div key={guessNum} className='guessInfo' >
                <div className='guess' style={relatedAnimeHint[guessNum] ? {backgroundColor: "rgb(220, 184, 38)", borderColor: "rgb(172, 143, 29)", boxShadow:"-1px 1px rgb(172, 143, 29), -2px 2px rgb(172, 143, 29), -3px 3px rgb(172, 143, 29)"} : {}}>
                    {guessDataHistory[guessNum] === "Skip" ? (guessDataHistory[guessNum]) : (guessDataHistory[guessNum].alternative_titles.en.length > 18 ? guessDataHistory[guessNum].alternative_titles.en.slice(0,18) + "..." : guessDataHistory[guessNum].alternative_titles.en )}
                    <span className="tooltiptext">{guessDataHistory[guessNum] === "Skip" ? guessDataHistory[guessNum] : guessDataHistory[guessNum].alternative_titles.en}</span>
                </div>
                <span className='hints' style={(hintsDisplay[guessNum].genre === "none" && hintsDisplay[guessNum].studio === "none" ? {display:"none"} : (relatedAnimeHint[guessNum] ? {backgroundColor: "rgb(220, 184, 38)", display: "flex", borderColor: "rgb(172, 143, 29)", boxShadow:"-1px 1px rgb(172, 143, 29), -2px 2px rgb(172, 143, 29), -3px 3px rgb(172, 143, 29)"} : {display: "flex"}))}>
                    <div className='genres' style={{display:hintsDisplay[guessNum].genre}}>{handleGenres(guessNum)}</div>
                    <div className='studios' style={relatedAnimeHint[guessNum] ? {display:hintsDisplay[guessNum].studio, borderLeft: "1.5px dashed #a958a5"} : {display:hintsDisplay[guessNum].studio}}>{handleStudios(guessNum)}</div>
                </span>
            </div>
        </>
    );
}

export default HandleGuessHistory;