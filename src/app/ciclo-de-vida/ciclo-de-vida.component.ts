import { RatingComponent } from './../utils/rating/rating.component';
import { AfterViewInit, ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ciclo-de-vida',
  standalone: true,
  imports: [RatingComponent],
  templateUrl: './ciclo-de-vida.component.html',
  styleUrl: './ciclo-de-vida.component.scss'
})
export class CicloDeVidaComponent implements OnInit, OnChanges, OnDestroy, DoCheck, AfterViewInit {
  @Input() title: string = '';

  constructor(private changeDetectorRef: ChangeDetectorRef) {

  }

  @ViewChild(RatingComponent) ratingComponent: RatingComponent = new RatingComponent();

  timer: ReturnType<typeof setInterval> | undefined;
  
  ngOnInit(): void {
    console.log('On Init')
    this.timer = setInterval(() => console.log(new Date()), 1000)
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('On changes')
    console.log(changes)
  }
  ngOnDestroy(): void {
    console.log('On destroy')
    clearInterval(this.timer)
  }
  ngDoCheck(): void {
    console.log('do check')
  }
  ngAfterViewInit(): void {
    console.log('after view init')
    this.ratingComponent.selectedRating = 3
    this.changeDetectorRef.detectChanges();
  }

}
