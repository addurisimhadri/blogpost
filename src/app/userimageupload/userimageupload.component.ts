import { Component, OnInit } from '@angular/core';
import { ImageserviceService } from '../services/imageservice.service';
import {Router} from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-userimageupload',
  templateUrl: './userimageupload.component.html',
  styleUrls: ['./userimageupload.component.css']
})
export class UserimageuploadComponent implements OnInit {

  form: FormGroup;
  progress: number = 0;

  selectedFile: File;
	retrievedImage: any;
	base64Data: any;
	retrieveResonse: any;
	message: string;
	imageName: any;
  constructor(private router: Router,private imageserviceService:ImageserviceService) { }
  ngOnInit(): void {
    this.getImage();
  }

  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }
  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    var userId=sessionStorage.getItem('userId');
    console.log(this.selectedFile);
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.imageserviceService.upload(uploadImageData,userId)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            this.router.navigate([''])    
          }
      }
      );
  }
  //Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
      var userId=sessionStorage.getItem('userId');
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.imageserviceService.getImage(userId)
      .subscribe(
        res => { 
          alert("=========================="+res.userId)
          if(res.userId>0){
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          }
        }, error => { 
          alert(console.error());
          alert(error.status+"=========="+error.message+"=========="+error.data);
        }
        
        
      ); 
  }

}
