import Bones from "../svg/bones.jsx";
import Gonzo from "../svg/gonzo.jsx";
import Madhouse from "../svg/madhouse.jsx";

import './StudioLogos.css';

function StudioLogos({studio}){
    
    const studioDisplay = () => {
        switch(studio.id){
       
            default:
                return(<div className="Name">{studio.name}</div>)
        }
    }

    return(
        <>
            {studioDisplay()}
        </>
    )
}

export default StudioLogos