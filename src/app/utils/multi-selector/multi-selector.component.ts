import { Component, Input } from '@angular/core';
import { MaterialModuleModule } from '../../material-module/material-module.module';
import { MultiSelector } from '../../interfaces/multi-selector';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-multi-selector',
  standalone: true,
  imports: [MaterialModuleModule, NgFor, NgIf],
  templateUrl: './multi-selector.component.html',
  styleUrl: './multi-selector.component.scss'
})
export class MultiSelectorComponent {


  @Input()
  selected: MultiSelector[] = []

  @Input()
  notSelected: MultiSelector[] = []

  selectAll() {
    this.selected.push(...this.notSelected)
    this.notSelected = []
  }

  deselectAll() {
    this.notSelected.push(...this.selected)
    this.selected = []
  }

  select(item: MultiSelector, index: number) {
    this.selected.push(item)
    this.notSelected.splice(index, 1)
  }

  unselect(item: MultiSelector, index: number) {
    this.notSelected.push(item)
    this.selected.splice(index, 1)
  }
}
