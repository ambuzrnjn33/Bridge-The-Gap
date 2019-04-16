/*var bodyParser= require('body-parser');
var mongoose= require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const path = require('path');
const methodOverride = require('method-override');


var urlencodedParser = bodyParser.urlencoded({ extended: false });


const mongoURI = 'mongodb://group:ayuayuamb3@ds125616.mlab.com:25616/signs';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);
let gfs;

conn.once('open',()=>{
  console.log('databse connected');
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
  console.log('gfs');
});
module.exports=function(app){
  app.get('/',(req,res)=>
{
  res.render('index');
});
app.get('/index/image', (req, res) => {
  var str=req.params.message;
  var len =str.length();
var intervalObject = setInterval(function () {
        count++;
        console.log(count, 'seconds passed');
        if (count == 5) {
            console.log('exiting');
            clearInterval(intervalObject);
        }
    }, 1000);

  gfs.files.findOne({ filename: req.params. }, (err, file) => {
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

}
*/
