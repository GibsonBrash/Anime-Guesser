import { useState, useEffect, useRef} from 'react';
import axios from "axios";

import './Archive.css';

function Archive({archiveDisplay, setArchiveDisplay, archiveData, setArchiveData}) {

    //line up day number off anime with local storage day number in key
    //add game over and you win screen for respected out cum, make game over be "NANI?!?" and win be "omedetou"
    const parseLocalStorage = (day) => {
        let data = JSON.parse(localStorage.getItem(`DailyGuesses#${day.dayNumber}`))
        console.log("yo archive data: ", data);
        return(
            <>
                {data ? 
                    <>
                        {data.guessName1 ? <div>{data.guessName1 === day.id ? <>Y</>: <>X</>}</div> : <div>O</div>}
                        {data.guessName2 ? <div>{data.guessName2 === day.id ? <>Y</>: <>X</>}</div> : <div>O</div>}
                        {data.guessName3 ? <div>{data.guessName3 === day.id ? <>Y</>: <>X</>}</div> : <div>O</div>}
                        {data.guessName4 ? <div>{data.guessName4 === day.id ? <>Y</>: <>X</>}</div> : <div>O</div>}
                        {data.guessName5 ? <div>{data.guessName5 === day.id ? <>Y</>: <>X</>}</div> : <div>O</div>}
                        {data.guessName6 ? <div>{data.guessName6 === day.id ? <>Y</>: <>X</>}</div> : <div>O</div>}
                    </> :
                    <>
                        <div>O</div>
                        <div>O</div>
                        <div>O</div>
                        <div>O</div>
                        <div>O</div>
                        <div>O</div>
                        <div>Unplayed</div>
                    </>
                }
            </>
        )
    }
    
    return(
        <>
            <div className='Archive-BG' onClick={() => {setArchiveDisplay(!archiveDisplay)}} style={archiveDisplay ? {} : {display:"none"}}></div>
            <div className='Archive-Container' style={archiveDisplay ? {} : {display:"none"}}>
                <div className='Archive-Exit'  onClick={() => {setArchiveDisplay(!archiveDisplay)}}>x</div>
                <div className='Archive-Title'>Archive</div>
                <div className='Archive-Guesses'>
                    {
                    archiveData ? <>{archiveData.map((data, i) => {
                        return(
                            <div key={i} className='Day-Container'> 
                                <div>Day {data.dayNumber}</div>
                                <div className='Guess-Container'>{parseLocalStorage(data)}</div>
                            </div>
                        )
                    })}</> :
                    <>
                        <div>Day 1</div>
                        <div>guesses</div>
                    </>
                    }
                </div>
            </div>
        </>
    )
}

export default Archive