


const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose= require('mongoose');
const methodOverride = require('method-override');
const $ = require('jquery');
var http=require('http');
const app = module.exports.app = express();
var server = http.createServer(app);
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
var io = require('socket.io').listen(server); 

var Schema = mongoose.Schema;
mongoose.connect("mongodb://Bridgethegap:ayu1720131998@ds035485.mlab.com:35485/chat");
var MyModel = mongoose.model('chatRoom', new Schema({ roomno: String }));
mongoose.connection.on('error', err => {
  logError(err);
});

   


// usernames which are currently connected to the chat
var usernames = {};

// rooms which are currently available in chat
var rooms ;

io.sockets.on('connection', function (socket) {

	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(username){
		// store the username in the socket session for this client
		socket.username = username;
		// store the room name in the socket session for this client
		socket.room = rooms;
		// add the client's username to the global list
		usernames[username] = username;
		// send client to room 1
		socket.join(rooms);
    // echo to client they've connected
    console.log(rooms);
    socket.emit("updateusers",usernames)
		socket.emit('connected', `${username}`, `you have connected to ${rooms}`);
		// echo to room 1 that a person has connected to their room
		socket.broadcast.to('rooms').emit('connected', 'SERVER', username + ' has connected to this room');
		socket.emit('updaterooms', rooms, 'room1');
	});

	// when the client emits 'sendchat', this listens and executes
	socket.on('sendchat', function (data) {
		// we tell the client to execute 'updatechat' with 2 parameters
		io.sockets.in(socket.room).emit('updatechat', socket.username, data);
	});

	socket.on('switchRoom', function(newroom){
		// leave the current room (stored in session)
		socket.leave(socket.room);
		// join new room, received as function parameter
		socket.join(newroom);
		socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
		// sent message to OLD room
		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
		// update socket session room title
		socket.room = newroom;
		socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
		socket.emit('updaterooms', rooms, newroom);
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
		// remove the username from global usernames list
		delete usernames[socket.username];
		// update list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);
		// echo globally that this client has left
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
		socket.leave(socket.room);
	});
});








app.get('/index',function(req,res){
  res.render('index');
});
app.get('/front',function(req,res)
{
  res.render('start');
});
let uid;
app.post('/chat/:room',urlencodedParser,async(req,res)=>{

console.log(req.body.name);
console.log(req.body.room);
console.log(req.params.room);
let userName=req.body.name; uid=userName;
let roomNo=req.params.room; 
let roomChoice=req.body.room;
 
let roomAvailable=[];
if(roomChoice==1)
{
  //create Room
  let ob= MyModel.find({roomno:roomNo},function(err,data){
    if(err)
    {console.log("error")}
    else
    if(data.length==0)
    {
      var myroom=new MyModel({roomno:roomNo});
      var newEv= myroom.save(function(err,data){
        if(err){ console.log(err);throw err;}
        console.log(data);

          })
    }
    else
    {
      res.render('start')
    }
  });
}
if(roomChoice==0)
{
  //checking availablity of room----may be for now through array
 let ob= MyModel.find({roomno:roomNo},function(err,data){
   if(err)
   console.log("error")
   else
   if(data.length==0)
   console.log("not av");
 })
 
}


});

app.get('/chat',function(req,res){

  res.render('chat',{
    user:uid
  });
})
app.get('/username',function(req,res)
{
  console.log("at username")

  res.send(uid)
})

const port = 5000;

server.listen(port, () => console.log(`Server started on port ${port}`));
