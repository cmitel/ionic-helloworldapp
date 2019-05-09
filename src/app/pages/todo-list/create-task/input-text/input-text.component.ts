import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent implements OnInit, OnChanges {

  @Output() typedTxt = new EventEmitter<String>();
  @Input() clear: Boolean = false;

  content: String = '';

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.clear !== undefined) {
      this.resetInput();
    }
  }

  onChange(): void  {
    this.typedTxt.emit(this.content);
  }

  resetInput(): void {
    this.content = '';
  }

}
