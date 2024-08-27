import express from "express";
import axios from "axios";
import cors from "cors";
import { nanoid } from "nanoid";
import cookieParser from "cookie-parser";
import crypto from "crypto";

const port = process.env.PORT || 8000;
const id = process.env.MYANIMELIST_ID;
const uri = process.env.MYANIMELIST_REDIRECT_URI;
const secret = process.env.MYANIMELIST_SECRET;
const app = express();

app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET))

app.get('/', (req, res) =>{
    res.send('hello world');
});

app.get('/search', (req, res) => {
    
    const { query } = req.query;
    console.log("req: ", query);
    axios.get(`https://api.myanimelist.net/v2/anime?q=${query}&limit=10`, {
        headers:{
            "X-MAL-CLIENT-ID":id
        }
    }).then((response) => {
        res.json(response.data);
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