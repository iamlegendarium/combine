const path = require('path')
const dotenv = require('dotenv')
dotenv.config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../model/user.model')
const secret = process.env.SECRET
const nodemailer = require('nodemailer')

const getRegister = (req,res) =>{
    res.sendFile(path.join(__dirname, '../../client/index.html'))
}

const postRegister = async(req,res) => {
    try {
        const {firstName, lastName, DOB, Sex, address, email, password } = req.body
        const user = new userModel({firstName:firstName, lastName:lastName, DOB:DOB, Sex:Sex, address:address, email:email, password:password})
        await user.save()
        console.log(user);
        res.redirect('/login')

    }
    catch(error){
        console.log('Email already existed');
        console.log(error);
        res.sendFile(path.join(__dirname, '../../client/index.html'))
    }
    
}

const getLogin = (req,res) =>{
    res.sendFile(path.join(__dirname, '../../client/form/login.html'))
}

// const postLogin = async (req,res) =>{
//           const {email, password} = req.body
//           userModel.findOne({email:email})
//           .then((users)=>{
//           if(users){
//             res.redirect('/dashboard')
//             console.log("You're logged in");


//             }

//           else {
//             res.sendFile(path.join(__dirname, '../../client/form/login.html'))
//             console.log("Invalid credentials");
    
//             }
//           })
           
//      }

const postLogin = async(req,res) =>{
    const {email, password} = req.body
    let users;
    try {
        users = await userModel.findOne({email:email})
    } catch (error) {
        return new Error
    }
    if(!users){
        res.status(404).json({
            Message: 'User not found, please sign up'
        })
        console.log('User not found');
    }

    const correctPassword = bcrypt.compareSync(password, users.password)
    if(!correctPassword){
        res.status(401).json({
            Message: 'Wrong credentials'
        })
        console.log('Wrong credentials');
    }
    else{
        const token = jwt.sign({users:users._id}, secret, {expiresIn: "1h"})

        res.status(200).json({
            Message: 'Signed in successfully',
            status: true,
            token: token,
            
        })
        // res.redirect('/dashboard')
        console.log('Signed in successfully');
    }


    // console.log(token);

}


 


// const getDashboard = (req,res) =>{
//     res.sendFile(path.join(__dirname, '../../client/form/dashboard.html'))
// }

// const getUser = (req,res) => {
//     res.sendFile(path.join(__dirname, '../../client/form/user.html'))
// }

const getDashboard = (req,res) => {
    userModel.find().then((data)=>{
        res.send({ data: data})
    })
    .catch((err)=>{
        console.log(err);
    })
}


const verified = (req,res) => {
    // res.send(req.headers.authorization)
    // console.log(req.headers.authorization.split(" ")[1]);
    const token  = req.headers.authorization.split(" ")[1]
  
    jwt.verify(token, secret, (err, result)=>{
       if (err) {
        console.log(err);
       }else{
        console.log(result);
        res.send({message:"user ckecked", status:true, user:result})
       }
    })
   
}

const sendMail = async(req,res) =>{
    // res.send('sending mail')
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    let emailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admission Letter</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header img {
            max-width: 150px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            margin: 20px 0;
        }
        .content p {
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://edu.sqi.ng/wp-content/uploads/2019/01/co.jpg" alt="SQI College Logo">
            <h1>Admission Letter</h1>
        </div>
        <div class="content">
            <p>Dear [Student's Name],</p>
            <p>Congratulations! We are pleased to inform you that you have been admitted to SQI College for the [Program Name] program for the academic year [Year].</p>
            <p>At SQI College, we are committed to providing quality education and training that will prepare you for a successful career in your chosen field. Our experienced faculty, state-of-the-art facilities, and industry-relevant curriculum will ensure that you gain the knowledge and skills necessary to excel in your studies and future career.</p>
            <p>Your admission details are as follows:</p>
            <ul>
                <li><strong>Program:</strong> [Program Name]</li>
                <li><strong>Academic Year:</strong> [Year]</li>
                <li><strong>Start Date:</strong> [Start Date]</li>
            </ul>
            <p>Please complete the following steps to confirm your admission:</p>
            <ol>
                <li>Submit the acceptance form.</li>
                <li>Pay the admission fee.</li>
                <li>Attend the orientation program.</li>
            </ol>
            <p>We look forward to welcoming you to SQI College. If you have any questions or need further assistance, please do not hesitate to contact our admissions office at [Contact Information].</p>
            <p>Sincerely,</p>
            <p>[Your Name]<br>Admissions Office<br>SQI College</p>
        </div>
        <div class="footer">
            <p>&copy; [Year] SQI College. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`

    let mailOptions = {
        from: process.env.EMAIL,
        to: "iamlegendarium@gmail.com, samsonaderonmu2021@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: emailTemplate, // html body
    }
    transporter.sendMail(mailOptions).then((info)=>{
        console.log(info);
        res.send({message: 'email sent successfully', status: true})
    })
    .catch((error)=>{
        console.log(error);
        res.send({message: 'email not send', status: false})
    })
}



module.exports = {getRegister, postRegister, getLogin, postLogin, getDashboard, verified, sendMail}