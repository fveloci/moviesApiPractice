import { Routes } from '@angular/router';
import { RutaMainComponent } from './ruta-main/ruta-main.component';
import { RutaSecundariaComponent } from './ruta-secundaria/ruta-secundaria.component';
import { GenresIndexComponent } from './genres/genres-index/genres-index.component';
import { CreateGenderComponent } from './genres/create-gender/create-gender.component';
import { ActorsIndexComponent } from './actors/actors-index/actors-index.component';
import { CreateActorComponent } from './actors/create-actor/create-actor.component';
import { CinemaIndexComponent } from './cinemas/cinema-index/cinema-index.component';
import { CreateCinemaComponent } from './cinemas/create-cinema/create-cinema.component';
import { ListComponent } from './movies/list/list.component';
import { CreateMovieComponent } from './movies/create-movie/create-movie.component';
import { EditActorComponent } from './actors/edit-actor/edit-actor.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { EditCinemaComponent } from './cinemas/edit-cinema/edit-cinema.component';
import { EditGenreComponent } from './genres/edit-genre/edit-genre.component';
import { MoviesFilterComponent } from './movies/movies-filter/movies-filter.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { isAdminGuard } from './is-admin.guard';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { UsersIndexComponent } from './security/users-index/users-index.component';

export const routes: Routes = [
    { path: '', component: RutaMainComponent},
    {
        path: 'generos',
        canActivate: [isAdminGuard],
        children: [
          { path: '', component: GenresIndexComponent},
          { path: 'crear', component: CreateGenderComponent},
          { path: 'editar/:id', component: EditGenreComponent},
        ],
    },
    {
        path: 'actores',
        canActivate: [isAdminGuard],
        children: [
            { path: '', component: ActorsIndexComponent},
            { path: 'crear', component: CreateActorComponent},
            { path: 'editar/:id', component: EditActorComponent}
        ]
    },
    {
        path: 'cines',
        canActivate: [isAdminGuard],
        children: [
            { path: '', component: CinemaIndexComponent},
            { path: 'crear', component: CreateCinemaComponent},
            { path: 'editar/:id', component: EditCinemaComponent}
        ]
    },
    {
        path: 'peliculas',
        canActivate: [isAdminGuard],
        children: [
            { path: 'crear', component: CreateMovieComponent},
            { path: 'editar/:id', component: EditMovieComponent},
        ]
    },
    
    { path: 'peliculas/buscar', component: MoviesFilterComponent},
    { path: 'pelicula/:id', component: MovieDetailComponent },

    { path: 'login', component: LoginComponent },
    { path: 'registrar', component: RegisterComponent },
    { path: 'usuarios', component: UsersIndexComponent, canActivate: [isAdminGuard] },

    { path: '**', redirectTo: '/', pathMatch: 'full' }
];
