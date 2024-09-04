import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-errors',
  standalone: true,
  imports: [],
  templateUrl: './show-errors.component.html',
  styleUrl: './show-errors.component.scss'
})
export class ShowErrorsComponent {

  @Input()
  errors: string[] = []
}
