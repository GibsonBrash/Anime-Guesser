
import Action from '../svg/Action.png'
import Adventure from '../svg/Adventure.png';
import Avant_Garde from '../svg/Avant_Garde.png';
import Award_Winning from '../svg/Award_Winning.png';
import Boy_Love from '../svg/Boy_Love.png';
import Comedy from '../svg/Comedy.png';
import Drama from '../svg/Drama.png';
import Fantasy from '../svg/Fantasy.png';
import Girl_Love from '../svg/Girl_Love.png';
import Gourmet from '../svg/Gourmet.png';
import Horror from '../svg/Horror.png';
import Mystery from '../svg/Mystery.png';
import Romance from '../svg/Romance.png';
import Sci_Fi from '../svg/Sci_Fi.png';
import Slice_of_Life from '../svg/Slice_of_Life.png';
import Sports from '../svg/Sports.png';
import Supernatural from '../svg/Supernatural.png';
import Suspense from '../svg/Suspense.png';
import Explicit from '../svg/Explicit.png';
import Adult_Cast from '../svg/Adult_Cast.png';
import Childcare from '../svg/Childcare.png';
import Anthropomorphic from '../svg/Anthropomorphic.png';
import CGDCT from '../svg/CGDCT.png';
import Combat_Sports from '../svg/Combat_Sports.png';
import Cross_Dressing from '../svg/Cross_Dressing.png';
import Delinquents from '../svg/Delinquents.png';
import Detective from '../svg/Detective.png';
import Educational from '../svg/Educational.png';
import Gag_Humor from '../svg/Gag_Humor.png';
import Gore from '../svg/Gore.png';
import Harem from '../svg/Harem.png';
import High_Stakes_Game from '../svg/High_Stakes_Game.png';
import Historical from '../svg/Historical.png';
import Idols_Male from '../svg/Idols_Male.png';
import Idols_Female from '../svg/Idols_Female.png';
import Iyashikei from '../svg/Iyashikei.png';
import Love_Polygon from '../svg/Love_Polygon.png';
import Love_Status_Quo from '../svg/Love_Status_Quo.png';
import Mahou_Shoujo from '../svg/Mahou_Shoujo.png';
import Martial_Arts from '../svg/Martial_Arts.png';
import Mecha from '../svg/Mecha.png';
import Medical from '../svg/Medical.png';
import Military from '../svg/Military.png';
import Music from '../svg/Music.png';
import Mythology from '../svg/Mythology.png';
import Organized_Crime from '../svg/Organized_Crime.png';
import Otaku_Culture from '../svg/Otaku_Culture.png';
import Parody from '../svg/Parody.png';
import Performing_Arts from '../svg/Performing_Arts.png';
import Pets from '../svg/Pets.png';
import Psychological from '../svg/Pyschological.png';
import Racing from '../svg/Racing.png';
import Reincarnation from '../svg/Reincarnation.png'
import Reverse_Harem from '../svg/Reverse_Harem.png';
import Samurai from '../svg/Samurai.png';
import School from '../svg/School.png';
import Showbiz from '../svg/Showbiz.png';
import Space from '../svg/Space.png';
import Strategy_Game from '../svg/Strategy_Game.png';
import Super_Power from '../svg/Super_Power.png';
import Survival from '../svg/Survival.png';
import Team_Sports from '../svg/Team_Sports.png';
import Time_Travel from '../svg/Time_Travel.png';
import Urban_Fantasy from '../svg/Urban_Fantasy.png';
import Vampire from '../svg/Vampire.png';
import Video_Game from '../svg/Video_Game.png';
import Villainess from '../svg/Villainess.png';
import Visual_Arts from '../svg/Visual_Arts.png';
import Workplace from '../svg/Workplace.png';
import Josei from '../svg/Josei.png';
import Kids from '../svg/Kids.png';
import Seinen from '../svg/Seinen.png';
import Shoujo from '../svg/Shoujo.png';
import Shounen from '../svg/Shounen.png';

import "./GenreLogos.css"

function GenreLogos({genre}){
    
    const genreDisplay = () => {
        switch(genre.id){
            case 1:
                return(<div className='Logo-Container'><img className='logo'  src={Action}/><span className="tooltiptext">{genre.name}</span></div>);
            case 2:
                return(<div className='Logo-Container'><img className='logo'  src={Adventure}/><span className="tooltiptext">{genre.name}</span></div>);
            case 5:
                return(<div className='Logo-Container'><img className='logo'  src={Avant_Garde}/><span className="tooltiptext">{genre.name}</span></div>);
            case 46:
                return(<div className='Logo-Container'><img className='logo'  src={Award_Winning}/><span className="tooltiptext">{genre.name}</span></div>);
            case 28:
                return(<div className='Logo-Container'><img className='logo'  src={Boy_Love}/><span className="tooltiptext">{genre.name}</span></div>);
            case 4:
                return(<div className='Logo-Container'><img className='logo'  src={Comedy}/><span className="tooltiptext">{genre.name}</span></div>);
            case 8:
                return(<div className='Logo-Container'><img className='logo'  src={Drama}/><span className="tooltiptext">{genre.name}</span></div>);
            case 10:
                return(<div className='Logo-Container'><img className='logo'  src={Fantasy}/><span className="tooltiptext">{genre.name}</span></div>);
            case 26:
                return(<div className='Logo-Container'><img className='logo'  src={Girl_Love}/><span className="tooltiptext">{genre.name}</span></div>);
            case 47:
                return(<div className='Logo-Container'><img className='logo'  src={Gourmet}/><span className="tooltiptext">{genre.name}</span></div>);
            case 14:
                return(<div className='Logo-Container'><img className='logo'  src={Horror}/><span className="tooltiptext">{genre.name}</span></div>);
            case 7:
                return(<div className='Logo-Container'><img className='logo'  src={Mystery}/><span className="tooltiptext">{genre.name}</span></div>);
            case 22:
                return(<div className='Logo-Container'><img className='logo'  src={Romance}/><span className="tooltiptext">{genre.name}</span></div>);
            case 24:
                return(<div className='Logo-Container'><img className='logo'  src={Sci_Fi}/><span className="tooltiptext">{genre.name}</span></div>);
            case 36://slice of life
                return(<div className='Logo-Container'><img className='logo'  src={Slice_of_Life}/><span className="tooltiptext">{genre.name}</span></div>);
            case 30://sports
                return(<div className='Logo-Container'><img className='logo'  src={Sports}/><span className="tooltiptext">{genre.name}</span></div>);
            case 37://supernatural
                return(<div className='Logo-Container'><img className='logo'  src={Supernatural}/><span className="tooltiptext">{genre.name}</span></div>);
            case 41://suspense
                return(<div className='Logo-Container'><img className='logo'  src={Suspense}/><span className="tooltiptext">{genre.name}</span></div>);
            case 9://ecchi
                return(<div className='Logo-Container'><img className='logo'  src={Explicit}/><span className="tooltiptext">{genre.name}</span></div>);
            case 49://erotica
                return(<div className='Logo-Container'><img className='logo'  src={Explicit}/><span className="tooltiptext">{genre.name}</span></div>);
            case 12://hentai
                return(<div className='Logo-Container'><img className='logo'  src={Explicit}/><span className="tooltiptext">{genre.name}</span></div>);
            case 50://Adult Cast
                return(<div className='Logo-Container'><img className='logo'  src={Adult_Cast}/><span className="tooltiptext">{genre.name}</span></div>);
            case 51://Anthropomorphic
                return(<div className='Logo-Container'><img className='logo'  src={Anthropomorphic}/><span className="tooltiptext">{genre.name}</span></div>);
            case 52://CGDCT
                return(<div className='Logo-Container'><img className='logo'  src={CGDCT}/><span className="tooltiptext">{genre.name}</span></div>);
            case 53://Childcare
                return(<div className='Logo-Container'><img className='logo'  src={Childcare}/><span className="tooltiptext">{genre.name}</span></div>);
            case 54://Combat Sports
                return(<div className='Logo-Container'><img className='logo'  src={Combat_Sports}/><span className="tooltiptext">{genre.name}</span></div>);
            case 81://Crossdressing
                return(<div className='Logo-Container'><img className='logo'  src={Cross_Dressing}/><span className="tooltiptext">{genre.name}</span></div>);
            case 55://Delinquents
                return(<div className='Logo-Container'><img className='logo'  src={Delinquents}/><span className="tooltiptext">{genre.name}</span></div>);
            case 39://Detective
                return(<div className='Logo-Container'><img className='logo'  src={Detective}/><span className="tooltiptext">{genre.name}</span></div>);
            case 56://Educational
                return(<div className='Logo-Container'><img className='logo'  src={Educational}/><span className="tooltiptext">{genre.name}</span></div>);
            case 57://Gag_Humor
                return(<div className='Logo-Container'><img className='logo'  src={Gag_Humor}/><span className="tooltiptext">{genre.name}</span></div>);
            case 58://Gore
                return(<div className='Logo-Container'><img className='logo'  src={Gore}/><span className="tooltiptext">{genre.name}</span></div>);
            case 35://Harem
                return(<div className='Logo-Container'><img className='logo'  src={Harem}/><span className="tooltiptext">{genre.name}</span></div>);
            case 59://High_Stakes_Game
                return(<div className='Logo-Container'><img className='logo'  src={High_Stakes_Game}/><span className="tooltiptext">{genre.name}</span></div>);
            case 13://Historical
                return(<div className='Logo-Container'><img className='logo'  src={Historical}/><span className="tooltiptext">{genre.name}</span></div>);
            case 60://Idols_Female
                return(<div className='Logo-Container'><img className='logo'  src={Idols_Female}/><span className="tooltiptext">{genre.name}</span></div>);
            case 61://Idols_Male
                return(<div className='Logo-Container'><img className='logo'  src={Idols_Male}/><span className="tooltiptext">{genre.name}</span></div>);
            case 62://Isekai
                return(<div className='Logo-Container'><img className='logo'  src={Harem}/><span className="tooltiptext">{genre.name}</span></div>);
            case 63://Iyashikei
                return(<div className='Logo-Container'><img className='logo'  src={Iyashikei}/><span className="tooltiptext">{genre.name}</span></div>);
            case 64://Love_Polygon
                return(<div className='Logo-Container'><img className='logo'  src={Love_Polygon}/><span className="tooltiptext">{genre.name}</span></div>);
            case 74://Love_Status_Quo
                return(<div className='Logo-Container'><img className='logo'  src={Love_Status_Quo}/><span className="tooltiptext">{genre.name}</span></div>);
            case 65://Magical_Sex_Shift
                return(<div className='Logo-Container'><img className='logo'  src={Cross_Dressing}/><span className="tooltiptext">{genre.name}</span></div>);
            case 66://Mahou Shoujo
                return(<div className='Logo-Container'><img className='logo'  src={Mahou_Shoujo}/><span className="tooltiptext">{genre.name}</span></div>);
            case 17://Martial_Arts
                return(<div className='Logo-Container'><img className='logo'  src={Martial_Arts}/><span className="tooltiptext">{genre.name}</span></div>);
            case 18://Mecha
                return(<div className='Logo-Container'><img className='logo'  src={Mecha}/><span className="tooltiptext">{genre.name}</span></div>);
            case 67://Medical
                return(<div className='Logo-Container'><img className='logo'  src={Medical}/><span className="tooltiptext">{genre.name}</span></div>);
            case 38://Military
                return(<div className='Logo-Container'><img className='logo'  src={Military}/><span className="tooltiptext">{genre.name}</span></div>);
            case 19://Music
                return(<div className='Logo-Container'><img className='logo'  src={Music}/><span className="tooltiptext">{genre.name}</span></div>);
            case 6://Mythology
                return(<div className='Logo-Container'><img className='logo'  src={Mythology}/><span className="tooltiptext">{genre.name}</span></div>);
            case 68://Organized_Crime
                return(<div className='Logo-Container'><img className='logo'  src={Organized_Crime}/><span className="tooltiptext">{genre.name}</span></div>);
            case 69://Otaku_Culture
                return(<div className='Logo-Container'><img className='logo'  src={Otaku_Culture}/><span className="tooltiptext">{genre.name}</span></div>);
            case 20://Parody
                return(<div className='Logo-Container'><img className='logo'  src={Parody}/><span className="tooltiptext">{genre.name}</span></div>);
            case 70://Performing_Arts
                return(<div className='Logo-Container'><img className='logo'  src={Performing_Arts}/><span className="tooltiptext">{genre.name}</span></div>);
            case 71://Pets
                return(<div className='Logo-Container'><img className='logo'  src={Pets}/><span className="tooltiptext">{genre.name}</span></div>);
            case 40://Psychological
                return(<div className='Logo-Container'><img className='logo'  src={Psychological}/><span className="tooltiptext">{genre.name}</span></div>);
            case 3://Racing
                return(<div className='Logo-Container'><img className='logo'  src={Racing}/><span className="tooltiptext">{genre.name}</span></div>);
            case 72://Reincarnation
                return(<div className='Logo-Container'><img className='logo'  src={Reincarnation}/><span className="tooltiptext">{genre.name}</span></div>);
            case 73://Reverse_Harem
                return(<div className='Logo-Container'><img className='logo'  src={Reverse_Harem}/><span className="tooltiptext">{genre.name}</span></div>);
            case 21://Samurai
                return(<div className='Logo-Container'><img className='logo'  src={Samurai}/><span className="tooltiptext">{genre.name}</span></div>);
            case 23://School
                return(<div className='Logo-Container'><img className='logo'  src={School}/><span className="tooltiptext">{genre.name}</span></div>);
            case 75://Showbiz
                return(<div className='Logo-Container'><img className='logo'  src={Showbiz}/><span className="tooltiptext">{genre.name}</span></div>);
            case 29://Space
                return(<div className='Logo-Container'><img className='logo'  src={Space}/><span className="tooltiptext">{genre.name}</span></div>);
            case 11://Strategy_Game
                return(<div className='Logo-Container'><img className='logo'  src={Strategy_Game}/><span className="tooltiptext">{genre.name}</span></div>);
            case 31://Super_Power
                return(<div className='Logo-Container'><img className='logo'  src={Super_Power}/><span className="tooltiptext">{genre.name}</span></div>);
            case 76://Survival
                return(<div className='Logo-Container'><img className='logo'  src={Survival}/><span className="tooltiptext">{genre.name}</span></div>);
            case 77://Team_Sports
                return(<div className='Logo-Container'><img className='logo'  src={Team_Sports}/><span className="tooltiptext">{genre.name}</span></div>);
            case 78://Time_Travel
                return(<div className='Logo-Container'><img className='logo'  src={Time_Travel}/><span className="tooltiptext">{genre.name}</span></div>);
            case 82://Urban_Fantasy
                return(<div className='Logo-Container'><img className='logo'  src={Urban_Fantasy}/><span className="tooltiptext">{genre.name}</span></div>);
            case 32://Vampire
                return(<div className='Logo-Container'><img className='logo'  src={Vampire}/><span className="tooltiptext">{genre.name}</span></div>);
            case 79://Video_Game
                return(<div className='Logo-Container'><img className='logo'  src={Video_Game}/><span className="tooltiptext">{genre.name}</span></div>);
            case 83://Villainess
                return(<div className='Logo-Container'><img className='logo'  src={Villainess}/><span className="tooltiptext">{genre.name}</span></div>);
            case 80://Visual_Arts
                return(<div className='Logo-Container'><img className='logo'  src={Visual_Arts}/><span className="tooltiptext">{genre.name}</span></div>);
            case 48://Workplace
                return(<div className='Logo-Container'><img className='logo'  src={Workplace}/><span className="tooltiptext">{genre.name}</span></div>);
            case 43://Josei
                return(<div className='Logo-Container'><img className='logo'  src={Josei}/><span className="tooltiptext">{genre.name}</span></div>);
            case 15://Kids
                return(<div className='Logo-Container'><img className='logo'  src={Kids}/><span className="tooltiptext">{genre.name}</span></div>);
            case 42://Seinen
                return(<div className='Logo-Container'><img className='logo'  src={Seinen}/><span className="tooltiptext">{genre.name}</span></div>);
            case 25://Shoujo
                return(<div className='Logo-Container'><img className='logo'  src={Shoujo}/><span className="tooltiptext">{genre.name}</span></div>);
            case 27://Shounen
                return(<div className='Logo-Container'><img className='logo'  src={Shounen}/><span className="tooltiptext">{genre.name}</span></div>);
            
            default:
                return(<div>{genre.name}</div>)
        }
    }

    return(
        <>
            {genreDisplay()}
        </>
    )
}

export default GenreLogos