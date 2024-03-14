const express = require("express");
const app = express();
//const User = require("./db/User"); cause this is never used I disble it 
const cors = require("cors");
//const jwt = require("jsonwebtoken"); cause it's never used I disable it 
const http = require("http"); 
const { Server } = require("socket.io"); // Changing the introduction method

// Import Chat Routing
const chatMessageRouter = require("./routes/chat");
const ChatMessage = require("./db/ChatMessage"); 

const { deleteAccount } = require("./routes/account/deleteAccount.route");
const { getJobs } = require("./routes/account/getJobs.route");
const { getPersonalDetails } = require("./routes/account/getPersonalDetails.route");
const { getValues } = require("./routes/account/getValues.route");
const { getWantedValues } = require("./routes/account/getWantedValues.route")
const { newEmail } = require("./routes/account/newEmail.route");
const { setJobSkill } = require("./routes/account/setJobSkill.route");
const { setPersonalDetails } = require("./routes/account/setPersonalDetails.route");
const { setValue } = require("./routes/account/setValue.route");
const { setWantedValue } = require("./routes/account/setWantedValue.route")
const { updateEmail } = require("./routes/account/updateEmail.route");
const { updatePassword } = require("./routes/account/updatePassword.route");
const { changePassword } = require("./routes/auth/changePassword.route");
const { confirmation } = require("./routes/auth/confirmation.route");
const { confirmationPassword } = require("./routes/auth/confirmationPassword.route");
const { login } = require("./routes/auth/login.route");
const { resendEmailGet } = require("./routes/auth/resendEmail.route.get");
const { resendEmailPost } = require("./routes/auth/resendEmail.route.post");
const { signup } = require("./routes/auth/signup.route");
const { goodFriends } = require("./routes/match/goodFriends.route");
const { getPotentialMatches } = require("./routes/match/getPotentialMatches.route");
const { getMatched } = require("./routes/match/getMatched.route");
const { goodFriendsYes } = require("./routes/match/makeChoiceYes.route");
const { goodFriendsNo } = require("./routes/match/makeChoiceNo.route");
const { setBio } = require("./routes/account/setBio.route");
const { getBio } = require("./routes/account/getBio.route");
const { passwordEmail } = require("./routes/auth/sendPasswordEmail.route");
//now I add new route and corresponding function to it:
const { getUsers } = require("./routes/auth/getUsers");
const { deleteUser } = require("./routes/auth/deleteUser");
const { createUser } = require("./routes/auth/createUser");


require("./db/config");

app.use(express.json());
app.use(cors());

// Using Chat Routing
app.use("/", chatMessageRouter);



app.delete("/deleteAccount", deleteAccount);
app.get(`/getJobs/:id`, getJobs);
app.get(`/getPersonalDetails/:id`, getPersonalDetails);
app.get(`/getValues/:id`, getValues);
app.get("/getWantedValues/:id", getWantedValues)
app.get("/email/:newemail", newEmail);
app.post("/setJobSkill", setJobSkill);
app.post("/setPersonalDetails", setPersonalDetails);
app.post("/setValue", setValue);
app.post("/setWantedValue", setWantedValue)
app.put("/updateEmail", updateEmail);
app.put("/updatePassword", updatePassword);
app.post("/changePassword/:token", changePassword);
app.get("/confirmation/:token", confirmation);
app.get("/confirmationPassword/:token", confirmationPassword);
app.post("/login", login);
app.post("/ResendEmail", resendEmailPost);
app.get("/ResendEmail", resendEmailGet);
app.post("/signup", signup);
app.post("/GoodFriends", goodFriends);
app.get(`/getPotentialMatches/:id`, getPotentialMatches);
app.get(`/getMatched/:id`, getMatched);
app.post(`/makeChoiceYes/:id`, goodFriendsYes);
app.post(`/makeChoiceNo/:id`, goodFriendsNo);
app.post(`/setBio`, setBio);
app.get(`/getBio/:id`, getBio);
app.post(`/sendPasswordEmail`, passwordEmail);
//new path added for admin access authntication
app.get('/admin', getUsers);
app.delete('/admin/:id', deleteUser);
app.post('/admin', createUser);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"] // Allowed HTTP methods
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on("getHistoryMessage", async (data) => {
    try {
      // Check if receiver, content, and room are provided
      if (!data.sender || !data.receiver ) {
        console.log("Sender or receiver is missing");
        return; // Exit early if any required data is missing
      }
      let pageNo = parseInt(data.pageNo || 1) 
      let pageSize = parseInt(data.pageSize || 10) 
      let params = {
        sender:data.sender,
        receiver:data.receiver
      }
      const historyMessage = await ChatMessage
        .find(params)
        .limit(pageSize)
        .skip((pageNo -1) * pageSize)
      
      io.emit(data.sender, { type:'history',historyMessage:historyMessage,receiver:data.receiver});

    } catch (error) {
      console.error("Error get history message:", error);
    }
  })
  // Listen for messages from clients
  socket.on("sendMessage", async (data) => {
    try {
      console.log(data);
      // Check if receiver, content, and room are provided
      if (!data.sender || !data.receiver || !data.message) {
        console.log("Sender,receiver, or message is missing");
        return; // Exit early if any required data is missing
      }

      // Create a new message instance
      const newMessage = new ChatMessage({
        sender:data.sender,
        receiver: data.receiver,
        message: data.message,
      });
      
      // Save the message to the database
      const savedMessage = await newMessage.save();
      // Broadcast to all clients in the room
      io.emit(data.receiver, { type:'newMsg',message:savedMessage,receiver:data.sender});
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
