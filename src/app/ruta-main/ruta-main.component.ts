import { Component } from '@angular/core';
import { ListComponent } from '../movies/list/list.component';
import { MoviesService } from '../services/movies.service';
import { MovieView } from '../interfaces/movie';
import { AuthorizedComponent } from "../security/authorized/authorized.component";

@Component({
  selector: 'app-ruta-main',
  standalone: true,
  imports: [ListComponent, AuthorizedComponent],
  templateUrl: './ruta-main.component.html',
  styleUrl: './ruta-main.component.scss'
})
export class RutaMainComponent {
  onCinemaMovies: MovieView[] = [];
  comingSoonMovies: MovieView[] = [];
  ocult: boolean = false;

  constructor(private moviesService: MoviesService) {

  }

  ngOnInit() {
    this.loadData()
  }

  handleRated(vote: number) {
    alert(vote);
  }

  loadData() {
    this.moviesService.getLandingPage().subscribe(landingPage => {
      this.onCinemaMovies = landingPage.onCinemas
      this.comingSoonMovies = landingPage.comingSoon
    })
  }

  deleted() {
    this.loadData()
  }
}
