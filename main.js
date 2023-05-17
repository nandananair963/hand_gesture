Webcam.set({
    image_format:"png",
    png_quality:90
 });
 
 camera=document.getElementById("camera");
 Webcam.attach(camera);
 
 function take_snapshot(){
     Webcam.snap(function(data_uri){
         document.getElementById("result").innerHTML='<img id="captured_img" src="'+ data_uri +'"/>';
 
     });
 }
 
 console.log('ml5 version',ml5.version);
 
 classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/iv8PiJyJ7/model.json',modelLoaded);
 
 function modelLoaded(){
     console.log('modelLoaded');
 }

 function speak(){
    var synth=window.speechSynthesis;
    speak_data="This is the" + prediction_1 + "hand gesture";
    var utter=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter);
}

function check(){
    img=document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
    if (error){
        console.error(error);
    }

    else{
        console.log(results);
        document.getElementById("emoji_name").innerHTML=results[0].label;
        prediction_1=results[0].label;
        speak();

        if (results[0].label== "Amazing")
        {
            document.getElementById("emoji").innerHTML=" &#128076;";
        }

        if (results[0].label== "Thumbs up")
        {
            document.getElementById("emoji").innerHTML="&#128077;";
        }

        if (results[0].label== "Victory")
        {
            document.getElementById("emoji").innerHTML=" &#9996;";
        }
      
               
    }


}