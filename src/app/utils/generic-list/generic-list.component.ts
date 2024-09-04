import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-list',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './generic-list.component.html',
  styleUrl: './generic-list.component.scss'
})
export class GenericListComponent {
  @Input() list: any = null;
}
