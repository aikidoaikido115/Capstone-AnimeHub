//ไฟล์หลักของ backend

require('dotenv').config()
const port = process.env.PORT

const express = require("express")
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors');

const app = express()

app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["POST", "GET"],
  credentials: true
}));


app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Replace with your React app's domain
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next()
  });


app.use(cookieParser())

app.use(expressSession({
  secret: 'Misha Necron',
  cookie: {
    secure:false,
    //cookie นาน 3 ชั่วโมง
    maxAge:1000*60*60*3
  }
}));

//GET CONTROLLER
const imageDescriptionController = require('./controllers/AnimeInfo/imageDescriptionController')
const videoController = require('./controllers/AnimeInfo/videoController')
const fetchUserInfoController = require('./controllers/UserInfo/fetchUserInfoController')
const fetchSpecificUserInfoController = require('./controllers/UserInfo/fetchSpecificUserInfoController')
const homeController = require('./controllers/SystemAndAuth/homeController')
const logoutController = require('./controllers/SystemAndAuth/logoutController')

//POST CONTROLLER
const registerUserController = require('./controllers/SystemAndAuth/registerUserController')
const loginUserController = require('./controllers/SystemAndAuth/loginUserController')

//Middleware
const testMiddleware = require('./middleware/testMiddleware')
const LoginAuthMiddleware = require('./middleware/LoginAuthMiddleware')

//GET route
app.get("/api/basic_info", imageDescriptionController)
app.get("/api/video", testMiddleware, videoController)
app.get("/api/user_info", fetchUserInfoController)
app.get("/api/user_specific_info", fetchSpecificUserInfoController)
app.get("/", LoginAuthMiddleware, homeController)
app.get("/api/logout", logoutController)

//POST route
app.post("/api/user/register", registerUserController)
app.post("/api/user/login", loginUserController)




app.listen(port, () => console.log(`backend running on port ${port}`))