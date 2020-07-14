import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ImageserviceService } from '../services/imageservice.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  retrievedImage: any;
	base64Data: any;
	retrieveResonse: any;
	message: string;
  imageName: any;
  userID : any;
  isImageNotexist: boolean = false;
  constructor(public authService: AuthenticationService,private imageserviceService:ImageserviceService) { 
    authService.getLoggedInUserId.subscribe(userID => {
      this.userID=userID;
      this.getImage();
    });

  }

  ngOnInit(): void {
    this.getImage();
  }
//Gets called when the user clicks on retieve image button to get the image from back end
getImage() {
  var userId  =sessionStorage.getItem('userId');
  if(userId==null){
    //alert("B============="+userId);
    userId=this.userID;
    //alert("A============="+userId);
  } 
//Make a call to Sprinf Boot to get the Image Bytes.
if(typeof userId !== 'undefined'){
  this.imageserviceService.getImage(userId)
    .subscribe(
      res => { 
        //alert("Res============="+res.userId);
        if(res.userId>0){
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;    
        }else{
          //alert("ELSE============="+res.userId);
          this.retrievedImage ='';
          this.isImageNotexist=true;
        }  
      }, error => { 
        alert(console.error());
        alert(error.status+"=========="+error.message+"=========="+error.data);
      }
    ); 
  }
}
}
