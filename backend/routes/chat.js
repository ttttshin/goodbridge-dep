const express = require("express");
const router = express.Router();
const http = require("http");
const socketIo = require("socket.io");
const ChatMessage = require("../db/ChatMessage");

// Create a WebSocket server
const server = http.createServer();
const io = socketIo(server);

// Map to store room sockets
const roomSockets = new Map();

// Listen for connection events
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for joining room events
  socket.on("joinRoom", (room) => {
    console.log(`Client joined room: ${room}`);
    socket.join(room);
    roomSockets.set(socket.id, room);
  });

  // Listen for leaving room events
  socket.on("leaveRoom", () => {
    const room = roomSockets.get(socket.id);
    console.log(`Client left room: ${room}`);
    if (room) {
      socket.leave(room);
      roomSockets.delete(socket.id);
    }
  });

  // Listen for messages from clients
  socket.on("sendMessage", async (data) => {
    try {
      // Check if receiver, content, and room are provided
      if (!data.receiver || !data.message || !data.room) {
        console.log("Receiver, message, or room is missing");
        return; // Exit early if any required data is missing
      }

      // Create a new message instance
      const newMessage = new ChatMessage({
        receiver: data.receiver,
        message: data.message,
        room: data.room,
      });
      
      // Save the message to the database
      const savedMessage = await newMessage.save();

      // Broadcast to all clients in the room
      io.to(data.room).emit("receiveMessage", savedMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  // Listen for disconnect events
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    // Remove socket from roomSockets map upon disconnect
    roomSockets.delete(socket.id);
  });
});

module.exports = router;
