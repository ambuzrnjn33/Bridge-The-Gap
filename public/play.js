
     function play(msg,x)
     {
        
   
        console.log(msg);
        var wlen=msg.length,k=x;
        var word="";
       
        while(k<wlen){
          if(msg.charAt(k)!=' ')
          {
            word+=msg.charAt(k);
            }
          if(msg.charAt(k)==' '||k==wlen-1){
            console.log(word);
            display(word,x);
    
              word="";
              
              break;
            }
        ++k;
          }
    
    }
    //play()close
    
    function display(word,x)
    {
    
    console.log(word);
    var fch = word.charAt(0);
    console.log(fch);
    var url = "https://www.handspeak.com/word/" + fch + "/" + word + ".mp4";
    console.log(url);
    UrlExists(url,word,x);
    
    }
    function UrlExists(url,word,x) 
    {
      console.log("in url exist function"+word)
    var len= word.length;
    var strLn=len+x;
       var http = new XMLHttpRequest();
       http.open('HEAD', url, false);
       http.send();
       console.log(http.status);
    
    
    
       if (http.status != 403)
           //  if the video is available
           {
    
             var video=document.createElement('video');
          var source=document.createElement('source');
          var vsrc = document.createAttribute("src");
              var sid = document.createAttribute("id");
               var type = document.createAttribute("type");
                  sid.value="sid";
                  type.value="video/mp4";
    
             vsrc.value=url;
          source.setAttributeNode(vsrc);
          source.setAttributeNode(type);
    source.setAttributeNode(sid);
             video.appendChild(source);
             var autoplay=document.createAttribute('autoplay');
             autoplay.value=true;
             video.setAttribute(autoplay)
             $('#conversation').append( video);
           play(strLn);
           
        }// http status checking if close
       else
    
    {
    //fingerspelling
    var promise= new Promise(function(resolve,report){
      var i=0,timeout=1200;
      var ch;
    
      var len=word.length;
    
    
    var intervalObject = setInterval(function () {
              ch=word.charAt(i);
              console.log(ch);
              if(ch!=" ")
              {
                          var image=document.createElement("img");
                          var id=document.createAttribute("id");
                          id.value="img";
                          var class1=document.createAttribute("class");
                          class1.value="myimg";
                            image.setAttributeNode(id);
                            image.setAttributeNode(class1);
                          var src = document.createAttribute("src");
                         /* var imgdiv=document.getElementById("imgdiv");
                          imgdiv.appendChild(image);
                          */
                         $('#conversation').append(image);
                                       //src.value = "/message/"+ch;
      src.value=ch+".png";
      console.log(src);
              image.setAttributeNode(src);
            }
      i++;
    
            if (i == len) {
                  console.log('exiting');
    
                  clearInterval(intervalObject);
                  resolve("done");
    
              }
    
          }, timeout);
    if(i>len){reject("yo");}
    });//promise close
    promise.then(function(successMessage) {
      imgdiv=document.getElementById('imgdiv');
     /* while(imgdiv.hasChildNodes()) {
    imgdiv.removeChild(imgdiv.childNodes[0]);
    }*/
                play(strLn+1);
    
            console.log(successMessage);
        }, function(errorMessage) {
           //error handler function is invoked
            console.log(errorMessage);
        }) ;
    }//else close
    
    
    
    }//urlExists  close
    
    
    
    
      function remove(){
    
        var img =document.getElementById("img");
        var video=document.getElementById("video");
        var source=document.getElementById("source");
        if(img){
        img.parentNode.removeChild(img);}
    
      }
    
    
    