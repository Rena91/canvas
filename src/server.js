const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json());
app.listen(3001);
let tokens = [];
const posts = [
    {
        userName: 'rev',
        title:'post 1'
    },
    { 
        userName:'Jim',
        title:'post 2'
    }
];
app.get('/posts',authenticateToken,(req,res) => res.json(posts.filter(post => post.userName === req.user.name)) );


app.post('/token',(req,res) => {
    const refreshToken = req.body.token;
    if(refreshToken == null) return res.sendStatus(401);
    if(!tokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN,(err,user)=> {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign({name:user.name},process.env.ACCESS_TOKEN,{expiresIn:'5s'});
        return res.json({accessToken:accessToken}); 
    })
})

app.post('/login',(req,res) => {
    const userName = req.body.username;
    const user = {
        name: userName
    }

const accessToken =  jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn:'5s'});
const refreshToken =  jwt.sign(user,process.env.REFRESH_TOKEN);
tokens.push(refreshToken);
res.json({accessToken:accessToken,refreshToken:refreshToken})
});

app.delete('/logout',(req,res) => {
    
        tokens = tokens.filter(token  => token !== req.body.token)
        res.sendStatus(204)
})

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader &&  authHeader.split(' ')[1];
    
    if(token == null) return res.sendStatus(401);

    jwt.verify(token,process.env.ACCESS_TOKEN,(err,user) => {
        if (err) return res.sendStatus(403)
        req.user = user;
        next() 
    })

}