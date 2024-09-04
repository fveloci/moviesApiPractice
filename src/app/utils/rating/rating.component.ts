import { MatIconModule } from '@angular/material/icon';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [MatIconModule, NgFor, NgClass],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {
  @Input() maxRating = 5;
  @Input() selectedRating = 0;

  @Output() rated: EventEmitter<number> = new EventEmitter<number>();

  maxRatingArray: any = []
  voted: boolean = false;
  beforeRate: number = 0;

  constructor(private securityService: SecurityService) {

  }

  ngOnInit(): void {
    this.maxRatingArray = Array(this.maxRating).fill(0)
  }

  handleMouseEnter(index: number): void {
    this.selectedRating = index + 1;
  }

  handleMouseLeave() {
    if(this.beforeRate !== 0) {
      this.selectedRating = this.beforeRate;
    } else {
      this.selectedRating = 0;
    }
  }

  rate(index: number): void {
    if(this.securityService.isLogged()) {
      this.selectedRating = index + 1;
      this.voted = true
      this.beforeRate = this.selectedRating;
      this.rated.emit(this.selectedRating)
    } else {
      alert("Para votar debe estar logueado")
    }    
  }
}
