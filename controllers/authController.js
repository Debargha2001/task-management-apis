const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {promisify} = require("util")
const User = require("../model/userSchema");

const createToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 864000
    });
    return token;
}

const signup = async (req, res) => {
    try{
        const userData = {
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 8),
    }
    const user = await User.create(userData);
    const token = createToken({email: user.email});
    return res.status(201).json({
        error: false,
        data: {
            user,
            token
        }
    })
    }catch(err){
        return res.status(500).json({
          error: true,
          message: err.message ?? "internal server error",
        });
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
    const user = await  User.findOne({email: email});
    if(!user){
        return res.status(404).json({
            error: true,
            message: "user not found"
        })
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if(!isPasswordCorrect){
        return res.status(400).json({
          error: true,
          message: "password is not correct",
        });
    }
    const token = createToken({ email: user.email });
    return res.status(201).json({
      error: false,
      data: {
        user,
        token,
      },
    });
    
    }catch(err){
        return res.status(500).json({
          error: true,
          message: err.message ?? "internal server error",
        });
    }
}

const authMiddleware = async (req, res, next) => {
    try {
        if(req.headers && req.headers.token){
          const decoded =  await promisify(jwt.verify)(req.headers.token, process.env.JWT_SECRET);
          const user = await User.findOne({email: decoded.email}).select("-password");
          if(!user){
            return res.status(400).json({
                error: true,
                message: "token is not valid. user not found"
            });
          }
          req.user = user;
          next();
        }else{
            return res.status(400).json({
              error: true,
              message: "no token found",
            });
        }
    } catch (err) {
      return res.status(500).json({
        error: true,
        message: err.message ?? "internal server error",
      });
    }
}

module.exports = {
    signup, login, authMiddleware
}