const express = require('express');
const zod = require('zod')
const {User} = require('../db')
const JWT_SECRET = require('../config')
const jwt = require('jsonwebtoken')
const {Account} = require('../db');
const authMiddleware = require('../middleware');
const userRouter = express.Router();

const signupValidation = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(6)
})


userRouter.post('/signup',async (req,res) => {
    const { success } = signupValidation.safeParse(req.body)
    if(!success) {
        return res.status(411).json({
            message: "Incocrrect input"
        })
    }
    const {
        username,
        firstName,
        lastName,
        password
    } = req.body;

    
    const user = await User.findOne({ username });

    if(user) {
        return res.json({
            msg: "user already exists please try with another username"
        });
    }


    const newUser = await User.create({
        username,
        firstName,
        lastName,
        password
    })
    const userId = newUser._id;

    await Account.create({
        userId,
        balance: 1+Math.random() * 10000
    })


    const token = jwt.sign({
        userId
    },JWT_SECRET) 


    return res.json({
        message: "user created successfully",
        token: token,
        userId: newUser._id
    })
})
const signinBody = zod.object({
    username: zod.string(),
	password: zod.string()
})



userRouter.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

userRouter.get('/bulk',authMiddleware,async (req,res) => {
    const filter = req.query.filter ;
    const users = await User.find({
        $or: [
            {
                firstName: {
                    "$regex": filter,
                    "$options": "i" // Case-insensitive search
                }
            },
            {
                lastName: {
                    "$regex": filter,
                    "$options": "i" // Case-insensitive search
                }
            }
        ]
    });

    console.log('Found users:', users);

    return res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });


})





module.exports =  userRouter;