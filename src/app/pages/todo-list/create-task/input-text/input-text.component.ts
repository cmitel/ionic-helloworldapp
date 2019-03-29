import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent implements OnInit {

  @Output() typedTxt = new EventEmitter<String>();
  content: String = '';

  constructor() { }

  ngOnInit() {}

  onChange(): void  {
    this.typedTxt.emit(this.content);
  }

}
