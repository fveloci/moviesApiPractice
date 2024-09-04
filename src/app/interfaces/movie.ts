import { ActorList, ActorMovie } from "./actor";
import { CinemaList } from "./cinema";
import { GenreList } from "./genre";

export interface MovieCreation {
    title: string;
    resume: string;
    onCinema: boolean;
    releaseDate: Date;
    trailer: string;
    poster: File;
    genreIds: number[];
    actors: ActorMovie[];
    cinemaIds: number[];
}

export interface MovieView {
    id: number;
    title: string;
    resume: string;
    onCinema: boolean;
    releaseDate: Date;
    trailer: string;
    poster: string;
    genres: GenreList[];
    actors: ActorMovie[];
    cinemas: CinemaList[];
    userVote: number;
    averageVote: number;
}

export interface MoviePostGet {
    genres: GenreList[];
    cinemas: CinemaList[];
}

export interface MoviePutGet {
    movie: MovieView;
    selectedGenres: GenreList[];
    notSelectedGenres: GenreList[];
    selectedCinemas: CinemaList[];
    notSelectedCinemas: CinemaList[];
    actors: ActorMovie[];
}

export interface LandingPage {
    onCinemas: MovieView[];
    comingSoon: MovieView[];
}