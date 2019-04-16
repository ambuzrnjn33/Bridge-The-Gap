
/*var calController=require('./controllers/controller.js');

// leaving the static part right now
//app.use(express.static(./public));
calController(app);*/



const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const $ = require('jquery');
const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Mongo URI
const mongoURI = 'mongodb://group:ayuayuamb3@ds125616.mlab.com:25616/signs';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  console.log('database connected');
gfs = Grid(conn.db, mongoose.mongo);
 gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
var upload = multer({ storage : storage }).array('file',26);

// @route GET /
// @desc Loads form

app.post('/upload',function(req,res){
    upload(req,res,function(err) {
        //console.log(req.body);
        //console.log(req.files);
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
          res.redirect('/');
          next();
    });
});
app.get('/',function(req,res){
  gfs.files.find().toArray((err, files) => {
  // Check if files
  if (!files || files.length === 0) {
    res.render('index', { files: false });
  } else {
    files.map(file => {
      if (
        file.contentType === 'image/jpeg' ||
        file.contentType === 'image/png'
      ) {
        file.isImage = true;
      } else {
        file.isImage = false;
      }
    });
    res.render('index', { files: files });
  }
});
});
app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});
app.get('/message/:ch',(req,res)=>
{

    var ch=req.params.ch;

      var fname=ch+".jpg";
      gfs.files.findOne({ filename:fname }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
          return res.status(404).json({
            err: 'No file exists'
          });
        }

        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
          // Read output to browser
          const readstream = gfs.createReadStream(file.filename);
          readstream.pipe(res);
        } else {
          res.status(404).json({
            err: 'Not an image'
          });
        }
      });

});
const port = 5000;
/*var calController=require('./controllers/controller.js');

// leaving the static part right now
//app.use(express.static(./public));
calController(app);*/
app.listen(port, () => console.log(`Server started on port ${port}`));
