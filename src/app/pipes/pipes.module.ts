import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReverseTabPipe } from './reverse-tab.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ ReverseTabPipe ],
  exports: [ ReverseTabPipe ]
})
export class PipesModule { }
