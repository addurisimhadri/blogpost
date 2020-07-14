import { Injectable } from '@angular/core';

import { HttpClient, HttpEventType,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import {PostMsg} from './postservice.service'
export class ApiResponse {

  status: number;
  message: string;
  result: any;
}
@Injectable({
  providedIn: 'root'
})
export class LikedService {
  web_url : any =sessionStorage.getItem('web_url');
  constructor(private httpClient: HttpClient) { }

  likes(postMsg) : Observable<ApiResponse>{
    var userId  =sessionStorage.getItem('userId'); 
    return this.httpClient.post<ApiResponse>(this.web_url+'/cmsapi/postmsg/'+postMsg.id+'/'+userId+'/liked','');
  }

}
