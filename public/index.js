function startDictation() {
      
  if (window.hasOwnProperty('webkitSpeechRecognition')) {

    var recognition = new webkitSpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function(e) {
      document.getElementById('write').innerHTML = e.results[0][0].transcript;
      recognition.stop();
    };

    recognition.onerror = function(e) {
      recognition.stop();
    }

  }
}

 function hear(str){ 
   var msg=document.getElementById("write").innerHTML;
         var voicelist = responsiveVoice.getVoices();
         var vselect = $("#voiceselection");
         vselect.append($("<option />").val(this.name).text(this.name));
         $.each(voicelist, function() {
          
          vselect.append($("<option />").val(this.name).text(this.name));
         });
         responsiveVoice.speak(str,$('#voiceselection').val());
        }

        function hear1(){ 
          var msg=document.getElementById("write").innerHTML;
                var voicelist = responsiveVoice.getVoices();
                var vselect = $("#voiceselection");
                vselect.append($("<option />").val(this.name).text(this.name));
                $.each(voicelist, function() {
                 
                 vselect.append($("<option />").val(this.name).text(this.name));
                });
                responsiveVoice.speak(msg,$('#voiceselection').val());
               }