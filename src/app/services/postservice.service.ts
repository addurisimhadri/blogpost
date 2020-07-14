import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class PostMsg{
  constructor(
    public id:string,
    public msg:string,
    public userId:string,
    public likeCount:string,
    public createdAt:any ,
    public username: string,
    public imageModel :any,
    public liked :any
  ) {} 
   
}
export class ApiResponse {

  status: number;
  message: number;
  result: any;
}

@Injectable({
  providedIn: 'root'
})
export class PostserviceService {

  constructor(private httpClient:HttpClient) { }
  web_url : any =sessionStorage.getItem('web_url');

  getPostMsgs(request): Observable<any> {     
    var userId  =sessionStorage.getItem('userId');
    const params = request; 
    return this.httpClient.get<any>(this.web_url+"/cmsapi/post/getAll/"+userId,{params});
  }
  createPostMsg(postMsg) :Observable<ApiResponse>{
    //const params = request;
    //alert(postMsg.msg);
    return this.httpClient.post<ApiResponse>(this.web_url+"/cmsapi/post/add", postMsg);
  }
}
