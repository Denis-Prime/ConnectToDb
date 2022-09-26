const jwt = require("jsonwebtoken")
const { ConnectToDb } = require("../DB/database")


const SignupHandler = async (req, res) => {
    console.log("call")
    let db = ConnectToDb()
    let newUSer = {
        name: req.body.name,
        username: req.body.username,
        age: req.body.age,
        sex: req.body.sex,
        email: req.body.email,
        password: req.body.password
    }
    newUSer.token = jwt.sign({
        Username: newUSer.name,
        password:newUSer.password
    },process.env.PRIVATE_KEY,{
        expiresIn: 60*5
    })
    let check = await db.findOne({ $or: [{ "username": newUSer.username }, { "email": newUSer.email }] })
    if(check){
        res.status(403).send("User has been created, pls login")
    }else{
        db.insertOne(newUSer)
        console.log(newUSer.token)
        res.status(200).send("Created")
    }
}

const LoginHandler = (req, res) => {
    console.log(req.headers);
    jwt.verify(req.headers.authorization.split(" ")[1],process.env.PRIVATE_KEY,(err,decode)=>{
        if(err){
            res.status(401).send(err.message)
        }else{
            console.log(decode)
            res.status(200).send(decode)
        }
    })
}
module.exports = {SignupHandler,LoginHandler}