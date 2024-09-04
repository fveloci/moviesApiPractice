import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { toBase64 } from '../../helpers/imageHelpers';
import { NgIf } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-image-input',
  standalone: true,
  imports: [MatButtonModule, NgIf],
  templateUrl: './image-input.component.html',
  styleUrl: './image-input.component.scss'
})
export class ImageInputComponent implements OnInit {
  ngOnInit(): void {
    
  }

  @Input() actualImgUrl: string = '';

  @Output() selectedFile: EventEmitter<File> = new EventEmitter<File>();

  base64Img: string = '';

  onChange(event: any) {
    if(event.target.files.length > 0) {
      const file: File = event.target.files[0]
      toBase64(file).then((value: any) => {
        this.base64Img = value
        this.selectedFile.emit(file)
      })
    }
  }
}
