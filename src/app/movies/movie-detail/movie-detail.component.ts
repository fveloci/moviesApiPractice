import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieView } from '../../interfaces/movie';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Coordinate, CoordinateWithMessage } from '../../interfaces/coordinate';
import { MaterialModuleModule } from '../../material-module/material-module.module';
import { NgFor, NgIf } from '@angular/common';
import { MapComponent } from '../../utils/map/map.component';
import { RatingComponent } from "../../utils/rating/rating.component";
import { RatingService } from '../../services/rating.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [MaterialModuleModule, NgFor, RouterLink, NgIf, MapComponent, RatingComponent],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent implements OnInit {

    constructor(private movieService: MoviesService, private activatedRoute: ActivatedRoute,
      private sanitizer: DomSanitizer, private ratingService: RatingService
    ) {

    }

    movie: MovieView = {} as MovieView;
    releaseDate: Date = new Date();
    trailerURL: SafeResourceUrl = '';
    coordinates: CoordinateWithMessage[] = [];

    ngOnInit() {
      this.activatedRoute.params.subscribe(params => {
        this.movieService.getById(params['id']). subscribe(movie => {
          this.movie = movie
          this.releaseDate = new Date(this.movie.releaseDate)
          this.trailerURL = this.generateEmbedYoutubeURL(this.movie.trailer)
          this.coordinates = movie.cinemas.map(cinema => {
            return { longitude: cinema.longitude, latitude: cinema.latitude, message: cinema.name }
          })
        })
      })
    }

    generateEmbedYoutubeURL(url: any): SafeResourceUrl {
      if(!url) {
        return ''
      }
      let video_id = url.split('v=')[1]
      const ampersandPosition = video_id.indexOf('&')
      if(ampersandPosition !== -1) {
        video_id = video_id.subtring(0, ampersandPosition)
      }
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video_id}`)
    }

    rated(points: number) {
      this.ratingService.rate(this.movie.id, points)
        .subscribe({
          next: () => {
            alert("Voto exitoso")
          },
          error: (error) => {
            console.log(error)
          }
        })
    }
}
