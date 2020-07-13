import { Component, OnInit,Input ,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  //@Input() childMessage: string;
 // message = 'Hola Mundo!';
  constructor() { }


  message: string = "Hola Mundo!"
  @Output() messageEvent = new EventEmitter<string>();

  sendMessage() {
    this.messageEvent.emit(this.message)
  }
  ngOnInit(): void {
  }

}
