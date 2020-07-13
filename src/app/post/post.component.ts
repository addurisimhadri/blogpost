import { Component, OnInit } from '@angular/core';
import { PostserviceService ,PostMsg } from '../services/postservice.service';
import {Router} from "@angular/router";
import { PageEvent } from '@angular/material/paginator';
declare var jQuery: any;
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  postMsgs:PostMsg[]=[];
  
  postMsg:PostMsg = new PostMsg("","","","","");
  totalElements: number = 0;
  loading: boolean;
  parentMessage = "message from parent"
  constructor(private router: Router,private postserviceService:PostserviceService) {
   }

  ngOnInit(): void {
    var userId=sessionStorage.getItem('userId');
    this.postMsg.userId=userId;
    this.getAllPostMsgs({ page: "0", size: "5" });
    (function ($) {
      $('textarea').keyup(function() {
          var characterCount = $(this).val().length,
          current = $('#current'),
          maximum = $('#maximum'),
          theCount = $('#the-count');            
          current.text(characterCount);          
          /*This isn't entirely necessary, just playin around*/
          if (characterCount < 70) {
            current.css('color', '#666');
          }
          if (characterCount > 70 && characterCount < 90) {
            current.css('color', '#6d5555');
          }
          if (characterCount > 90 && characterCount < 100) {
            current.css('color', '#793535');
          }
          if (characterCount > 100 && characterCount < 120) {
            current.css('color', '#841c1c');
          }
          if (characterCount > 120 && characterCount < 139) {
            current.css('color', '#8f0001');
          }          
          if (characterCount >= 140) {
            maximum.css('color', '#8f0001');
            current.css('color', '#8f0001');
            theCount.css('font-weight','bold');
          } else {
            maximum.css('color','#666');
            theCount.css('font-weight','normal');
          }              
        });
        
    })(jQuery);
  }

  reset(): void {
    (function ($) {
      $("#current").text(0);        
    })(jQuery);
  };
 
  submit(){
    //alert(this.postMsg.userId);
    if(this.postMsg.msg!=""){
      this.postserviceService.createPostMsg(this.postMsg)
      .subscribe( data => {
        this.router.navigate(['posts'])
        //alert(data.message);
        this.getAllPostMsgs({ page: "0", size: "5" });
        this.postMsg.msg='';
      });
    }else{
      alert("Please Enter Post Message");
    }

  }
  getAllPostMsgs(request) : void{
    this.loading = true;
    this.postserviceService.getPostMsgs(request)
    .subscribe(
     response =>{
       this.postMsgs = response.result['content'];
       this.totalElements = response.result['totalElements'];
       this.loading = false;
      }, error => {
        this.loading = false;
      }
    );
  }
  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getAllPostMsgs(request);
  }
}
