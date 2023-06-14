
//----------------------------move ichharat------------------------------
var i = 0; 			
var images = [];	
var time = 3000;	
	 
images[0] = "product/header/header1.jpg";
images[1] = "product/header/header4.jpg" ;
images[2] = "product/header/header2.jpg" ;
images[3] = "product/header/header5.jpg";
images[4] = "product/header/header3.jpg" ;
images[5] = "product/header/header6.jpg" ;

 function changeImg(){
 	document.slide.src = images[i];

 	//  Check If Index Is Under Max
 	if(i < images.length - 1){
 	  i++; 
 	} else { 
 		i = 0;
 	}
 	setTimeout("changeImg()", time);
 }
//   Run function when page loads
 window.onload=changeImg;


