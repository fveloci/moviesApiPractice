import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-practice';

  handleTitleUpdate(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.title = inputElement.value ?? '';
  }
}
