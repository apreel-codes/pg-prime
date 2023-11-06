import express, { application } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { baseUrl, generateToken, isAdmin, isAuth, mailgun } from '../utils.js';
import expressAsyncHandler from "express-async-handler"
import nodemailer from 'nodemailer';


const userRouter = express.Router();

userRouter.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const users = await User.find({});
      res.send(users);
    })
  );
  
  userRouter.get(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'User Not Found' });
  }
})
);

userRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);
        const updatedUser = await user.save();
        res.send({ message: 'User Updated', user: updatedUser });
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  );
  
  userRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        if (user.email === 'admin@example.com') {
          res.status(400).send({ message: 'Can Not Delete Admin User' });
          return;
        }
        await user.deleteOne();
        res.send({ message: 'User Deleted' });
      } else {
        res.status(404).send({ message: 'User Not Found' });
  }
})
);

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });
            return;
        }
    }
    res.status(401).send({ message: 'Invalid email or password' });
}));



userRouter.post('/signup', expressAsyncHandler(async (req, res) => {
    const newUser = new User ({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
    });
}));

userRouter.put('/profile', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }

        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser),
        })
    } else {
        res.status(404).send({message: 'User Not Found'})
    }
}))


userRouter.post(
  '/forget-password',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '3h',
      });
      user.resetToken = token;
      await user.save();

      //reset link
      // console.log(`${baseUrl()}/reset-password/${token}`);
      console.log(`https://localhost:3000/reset-password/${token}`);

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'idrisopeyemi06@gmail.com',
          pass: 'ayecifqsrlyjqask'
        }
      });
      
      var mailOptions = {
        from: 'PGF Prime <me@mg.pgfprime.com>',
        to: `${user.name} <${user.email}>`,
        subject: `Reset Password`,
        // text: ` 
        //     Please Click the following link to reset your password:
        //     http://localhost:3000/reset-password/${token}`,
        text: ` 
            Please Click the following link to reset your password:
            https://pgfprime.com/reset-password/${token}`,
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.send({ message: 'We sent reset password link to your email.' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);


userRouter.post(
  '/reset-password/',
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body.token)
    jwt.verify(req.body.token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        const user = await User.findOne({ resetToken: req.body.token });
        if (user) {
          if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
            await user.save();
            res.send({
              message: 'Password updated successfully',
            });
          }
        } else {
          res.status(404).send({ message: 'User not found' });
        }
      }
    });
  })
);

export default userRouter;