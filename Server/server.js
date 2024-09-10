import express from "express";
import axios from "axios";
import cors from "cors";
import { nanoid } from "nanoid";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import { MongoClient, ServerApiVersion }from "mongodb";


const port = process.env.PORT || 8000;
const id = process.env.MYANIMELIST_ID;
const uri = process.env.MYANIMELIST_REDIRECT_URI;
const secret = process.env.MYANIMELIST_SECRET;
const app = express();

app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));

const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      deprecationErrors: true,
    }
});

//setInterval(setDailyAnime,1000 * 60 * 60 * 24);

const setDailyAnime = async () => {
    try{
        try{
            await client.connect();
        }catch(err){
            console.log("error: ",  err);
            return;
        }

        const updateDoc = {
            $set: {
                usedForToday: false
            },
        };
        const updateDaily = {
            $set: {
                usedForDaily: true,
                usedForToday: true
            },
        };

        const findYesturday = await client.db('Anime-Guesser').collection('AnimeList').updateOne({usedForToday: true}, updateDoc);
        let findAnime = true;
        let buffer = []
        while(findAnime){
            const randomNumber= crypto.randomInt(1, 4001);
            if(!buffer.find((e) => e === randomNumber)){
                const findNew = await client.db('Anime-Guesser').collection('AnimeList').findOne({rank: randomNumber});
                if(findNew.usedForDaily !== true){
                    const setNew = await client.db('Anime-Guesser').collection('AnimeList').updateOne({rank: findNew.rank}, updateDaily);
                    console.log("setnew ", setNew);
                    findAnime = false;
                }
            }
        }
        
        console.log("find yesturday, ", findYesturday);
        //console.log("setnew ", setNew);
        
        
    }finally{
        await client.close();
    }
}




const getDailyAnime = async () => {
    let findDaily;
    try{
        try{
            await client.connect();
        }catch(err){
            console.log("error: ",  err);
            return;
        }
        findDaily = await client.db('Anime-Guesser').collection('AnimeList').findOne({usedForToday: true});
        if ((await client.db('Anime-Guesser').collection('AnimeList').countDocuments({usedForToday: true})) === 0) {
            console.log("reponse, ", response);
        }

        console.log("response, ", findDaily);
    }finally{
        console.log("*farts nasty big green stink bubble* finally ... peace at last");
        
    }
    return findDaily;
}



const addField = async () => {
    try{
        try{
            await client.connect();
        }catch(err){
            console.log("error: ",  err);
            return;
        }

        const updateDoc = {
            $set: {
                usedForToday: false
            },
        };
        
        const response = await client.db('Anime-Guesser').collection('AnimeList').updateMany({}, updateDoc);
        console.log("response ", response);
       
    }finally{
        await client.close();
    }
    
}

const addToDatabase = async (data) =>{
    try{
        try{
            await client.connect();
        }catch(err){
            console.log("error: ",  err);
            return;
        }
        const options = { ordered: true};
        const response = await client.db('Anime-Guesser').collection('AnimeList').insertMany(data, options);
        console.log("response ", response);
    }finally{
        await client.close();
    }
}

const filterAnime = (data) => {
    let buffer = [];
    for(let x = 0; x < data.length; x++){
        if(data[x].node.media_type !== "Music"){
            buffer.push(data[x].node);
        }
    }
    return buffer;
}

app.get('/', (req, res) =>{
    res.send('hello world');
});


app.get('/getDailyAnime', async (req, res) => {
    const daily = await getDailyAnime();
    res.json(daily);
});

app.get('/makeGuess', async (req, res) =>{
    const {guess} = req.query;

});

app.get('/search', async (req, res) => {
    
    const { query } = req.query;
    
    try{

        try{
            await client.connect();
        }catch(err){
            console.log("error: ",  err);
            return;
        }
        console.log("query: ", query );
      
        
        const filter = {
            $or:[
                {title:{$regex: `^${query}`, $options:"i"}},
                {"alternative_titles.en":{$regex: `^${query}`, $options:"i"}},
                {"alternative_titles.synonyms":{$in:[query]}}
            ]
        };

        
        
        const response = await client.db('Anime-Guesser').collection('AnimeList').find(filter).toArray();
        if ((await client.db('Anime-Guesser').collection('AnimeList').countDocuments(filter)) === 0) {
            console.log("reponse, ", response);
        }
        console.log(response);
        res.status(200).json(response);
      
    }catch(err){
        res.status(400).send(`didn't work:  ${err}`);
    }  
 
});


app.get('/fillDataBase', (req, res) => {
    axios.get(`https://api.myanimelist.net/v2/anime/ranking?ranking_type=all&limit=500&offset=4000&fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,media_type,status,genres,num_episodes,start_season,source,average_episode_duration,rating,pictures,background,studios`, {
        headers:{
            "X-MAL-CLIENT-ID":id
        }
    }).then((response) => {
        const anime = filterAnime(response.data.data);
        addToDatabase(anime);
        res.json(anime);
    }).catch((err) => res.status(500).json({ err: err.message }));
});


app.get('/login', (req, res) =>{

    const stateParam = nanoid();

    res.cookie("stateParam", stateParam, {
        maxAge:1000*60*5,
        signed:true
    });

    function base64URLEncode(str) {
        return str.toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    }

    let code_verifier = base64URLEncode(crypto.randomBytes(32));
    res.cookie("code_verifier", code_verifier, {
        maxAge:1000*60*5,
        signed:true
    });
      
    //code challenge accepted by myanimelist is "simple" thus code challenge and code verifier must be the same
    let code_challenge = code_verifier;

    const query = {
        response_type: "code",
        client_id: id,
        state: stateParam,
        redirect_uri: uri,
        code_challenge: code_challenge
    }
    const urlEncoded = new URLSearchParams(query).toString();

    res.redirect(`https://myanimelist.net/v1/oauth2/authorize?${urlEncoded}`);
});

app.get('/getToken', (req, res) =>{
    //Extracting code and state
    const { code, state } = req.query;
    
    //Extracting state parameter previously signed and stored in cookies
    const { stateParam, code_verifier } = req.signedCookies;
    
    
    //Comparing state parameters
    if (state !== stateParam) {
        //throwing unprocessable entity error
        res.status(422).send("Invalid State");
        return;
    }

    const body = {
        client_id: id,
        client_secret: secret,
        grant_type: process.env.MYANIMELIST_AUTHORIZATION_CODE,
        code: code,
        redirect_uri: uri,
        code_verifier: code_verifier
    };
    const opts = { 
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
         } 
    };

    axios.post("https://myanimelist.net/v1/oauth2/token", body, opts)
    .then((_res) => _res.data.access_token)
    .then((token) => {
        res.redirect(process.env.CLIENT_URL);
    })
    .catch((err) => res.status(500).json({ err: err.message }));
});

app.listen(port, () => console.log(`Server is running on port ${port}`));