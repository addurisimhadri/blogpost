import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
export class ApiResponse {

  status: number;
  message: string;
  result: any;
}

export class  ImageModel{
  userId :number;
  name: string;
  type: string;
  picByte: any;
}

@Injectable({
  providedIn: 'root'
})


export class ImageserviceService {
  web_url : any =sessionStorage.getItem('web_url');
  constructor(private httpClient: HttpClient) { }
  picByte: any;
  upload(uploadImageData,userId) :Observable<any>{
    //const params = request;
    //alert(postMsg.msg);
    return this.httpClient.post<any>(this.web_url+'/cmsapi/upload/user/'+userId, uploadImageData,{reportProgress: true,observe: 'events'})
    
  }
  getImage(userId) : Observable<ImageModel>{
    return this.httpClient.get<ImageModel>(this.web_url+'/cmsapi/upload/getImageM/' + userId);
    //alert(this.picByte);
    //return this.picByte;
  }
} 
