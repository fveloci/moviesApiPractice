import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModuleModule } from '../../material-module/material-module.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-markdown',
  standalone: true,
  imports: [MaterialModuleModule, FormsModule],
  templateUrl: './input-markdown.component.html',
  styleUrl: './input-markdown.component.scss'
})
export class InputMarkdownComponent {
  @Input()
  markdownContent = '';

  @Input()
  placeholderTextarea: string = 'Texto';
  
  @Output()
  markdownChange: EventEmitter<string> = new EventEmitter<string>();

  emitText(event: Event) {
    const value = (event.target as HTMLInputElement)?.value;
    this.markdownContent = value
    this.markdownChange.emit(value)
  }
}
