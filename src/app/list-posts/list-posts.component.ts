import { Component, OnInit ,Input} from '@angular/core';
import { PostMsg } from '../services/postservice.service';
import {LikedService}  from '../services/liked.service'
@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {
  userID :any;
  constructor(private likedService :LikedService) { }
  @Input() postMsg: PostMsg; 
  ngOnInit(): void {
    var userId  =sessionStorage.getItem('userId');
    this.userID=userId;
  }
  liked(postMsg: PostMsg) :void {
    alert("=======");
    this.likedService.likes(postMsg).subscribe( data => {
      this.postMsg=data.result;
      alert(data.result.liked); 
        alert(data.message);         
      })
  }; 

}
