import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss'],
})
export class AddButtonComponent implements OnInit {

  @Input() enableBtn: Boolean = false;
  @Output() pressed: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  add(): void {
    this.pressed.emit();
  }

}
