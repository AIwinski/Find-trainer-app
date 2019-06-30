const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const User = require("./models/User");
const Conversation = require("./models/Conversation");
const Message = require("./models/Message");

const userRoutes = require("./routes/users");
const chatRoutes = require("./routes/chat");
const profileRoutes = require("./routes/profiles");
// const postRoutes = require('./routes/posts');
// const commentRoutes = require('./routes/comments');
// const dropRoutes = require('./routes/drops');
// const messagesRoutes = require('./routes/messages');

app.use(bodyParser.json({ limit: "4mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(morgan("dev"));

mongoose.connect("mongodb://artur:abc123@ds121295.mlab.com:21295/massage-app", {
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); //uri that may access resources from my api
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     if(req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
//         return res.status(200).json({});
//     }
//     next();
// });

app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Hello from the server!"
    });
});

app.use("/users", userRoutes);
app.use("/chat", chatRoutes);
app.use("/profiles", profileRoutes);
// app.use('/comments', commentRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
});
