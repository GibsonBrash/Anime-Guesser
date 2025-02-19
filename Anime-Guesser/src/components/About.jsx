

import './About.css';

function Archive({aboutDisplay, setAboutDisplay}) {
    
    return(
        <>
            <div className='About-BG' onClick={() => {setAboutDisplay(!aboutDisplay)}} style={aboutDisplay ? {} : {display:"none"}}></div>
            <div className='About-Container' style={aboutDisplay ? {} : {display:"none"}}>
                <div className='About-Exit' onClick={() => {setAboutDisplay(!aboutDisplay)}}>x</div>
                <div className='About-Title'>About</div>
                <div className='About-Main'>
                    <div>Created by</div>
                    &nbsp;
                    <div>Jonas Wojtas</div>  
                    
                </div>
                &nbsp;
                <div className='About-Thanks'>Big Thanks to Gamedle for being my muse as you can probably tell</div>
                <a href="https://www.freepik.com/user/collection">Icon by Freepik</a>
                <a href="">Portfolio</a>
            </div>
        </>
    )
}

export default Archive