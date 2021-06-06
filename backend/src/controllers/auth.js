const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const user = require("../models/user")
const group = require("../models/group")
const report = require("../models/report")
const notification = require("../models/notification")
require("dotenv").config();

exports.signup = async(req , res , next) =>{
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const username = req.body.username;
    const aadhaar = req.body.aadhaar;
    const age = req.body.age;
    if(password != confirmPassword){
        throw Error("password and confirmPassword not equal")
    }
    //TODO sendgrid, they declined my email lmaooo
    //const token = jwt.sign({email: email} , process.env.jwt_secret_key, {algorithm: "HS256", expiresIn: process.env.access_token_life})
    const NewUser = new user({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        username: username,
        aadhaar: aadhaar,
        age: age
        //token: token
    })
    NewUser.save().then(
    (a)=>{
        //res.status(200).send({"Authorization" :"Bearer " + token})
        res.status(200).send({"Type" :"Success" })
    }
    ).catch((error) => {
        //TODO Better error
        res.status(401).send({"Type" : "Error" , "Message":"Signup Failed" + error})
    })
    console.log(req.body)
}

exports.login = async(req , res , next) =>{
    const username = req.body.username;
    const password = req.body.password;
    const token = jwt.sign({username: username} , process.env.jwt_secret_key, {algorithm: "HS256", expiresIn: process.env.access_token_life})
    const User = await user.findOne({"username" : username})
    User.token = token;
    const right = await bcrypt.compare(password , User.password)
    console.log(right)
    //right not working
    //right = true
    if(right){
        User.save().then((a)=>{
            res.status(200).send({"Type": "Success", "token" : token})
        }).catch((error)=>{
            res.status(401).send({"Type": "Error" , "Message" : error})
    })
    }else{
        res.status(401).send({"Type": "Error" , "Message" : "Wrong Password"})
    }
}

exports.notification_post = async(req , res, next) =>{
    try{
        const current_user = await user.findOne({username : req.user.username})
        const partner = await user.findOne({username : req.body.partner})
        const notif = new notification({issuer : current_user.username , issuee : partner.username})
        await notif.save()
        res.status(200).send({"Type":"Success"})
    }catch(err){
        res.status(401).send({"Type":"Error" , "Message":err})
    }
}

exports.notification_get = async(req , res , next) =>{
    try{
        const User = await user.findOne({username : req.user.username})
        const result = await notification.find({issuee : User.username})
        res.status(200).send(result)
    }catch(err){
        res.status(401).send({"Type":"Error" , "Message" : err})
    }
}

exports.group = async(req , res, next) =>{
    try{
        const current_user = await user.findOne({username : req.user.username})
        const partner = await user.findOne({username : req.body.partner})
        if(partner.guid == null){
            if(current_user.guid != null){
                partner.guid = current_user.guid
                await partner.save()
            }else{
                const newgroup = new group()
                partner.guid = newgroup._id
                current_user.guid = newgroup._id
                await partner.save()
                await current_user.save()
            }
            res.status(200).send({"Type" : "Success"})
        }else{
            res.status(401).send({"Type" : "Error" , "Message" : "Current user already part of group"})
        }
    }catch(err){
        res.status(401).send({"Type" : "Error" , "Message" : err})
    }
}

exports.leavegroup = async(req , res , next) =>{
    try{
        const current_user = await user.findOne({username : req.user.username})
        current_user.guid = null;
        await current_user.save()
        res.status(200).send({"Type" : "Success"})
    }catch(err){
        res.status(401).send({"Type" : "Error" , "Message" : err})
    }
}

exports.get_user_data = async(req , res, next) =>{
    try{
        //lol
        //var details = []
        const username = req.params.username;
        //const query_users = req.body.users
        //query_users.map((name)=>{
            //user.find({username : name}).then((record)=>{
                //details.push({
                    //username : record[0].username,
                    //emergency : record[0].emergency,
                    //destination: record[0].destination,
                    //vehicle: record[0].vehicle,
                    ////TODO
                    ////age: record[0].age
                //})
            //})
        //})
        user.findOne({username : username}).then((details)=>{
        res.status(200).send({"Type":"Success" , "data" : details})})
    }catch(err){
        res.status(401).send({"Type" : "Error" , "Message" : err})
    }
}

exports.my_group = async(req , res, next) =>{
    try{
        //lol 
        const current_user = await user.findOne({username : req.user.username})
        if(current_user.guid == null){
            res.status(200).send({"Type":"Success" , "users":[]})
        }else{
            const result = await user.find({guid : current_user.guid })
            res.status(200).send({"Type":"Success" , "users":result})
        }
    }catch(err){
        res.status(401).send({"Type" : "Error" , "Message" : err})
    }
}

exports.better_emergency = async(req , res, next)=>{
    try{
        const current_user = await user.findOne({username : req.user.username})
        current_user.emergency = req.body.emergency
        current_user.save().then(
            res.status(200).send({"Type":"Success"})
        ).catch((err)=>{
            res.status(401).send({"Type":"Error" , "Message":err})
        })

    }catch(err){
        res.status(401).send({"Type" : "Error" , "Message" : err})
    }
}

exports.report = async(req, res, next)=>{
    try{
        //
        const culprit = req.body.culprit
        const complaint = req.body.complaint
        const victim = req.user.username
        const rep = new report({issuer : victim , issuee : culprit , complaint : complaint })
        await rep.save()
        res.status(200).send({"Type": "Success"})
    }catch(err){
            res.status(401).send({"Type":"Error" , "Message":err})
    }
}
