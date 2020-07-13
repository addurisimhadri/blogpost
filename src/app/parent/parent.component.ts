import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { ChildComponent } from '../child/child.component';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit,AfterViewInit  {
  @ViewChild(ChildComponent) child;
  //message:string;
  //parentMessage = "message from parent"
  constructor() { }

  ngOnInit(): void {
  }
 ngAfterViewInit() {
    //this.message = this.child.message
  }

  message:string;

  receiveMessage($event) {
    this.message = $event
  }
}
