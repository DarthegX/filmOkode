import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { FilmApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  movieList;
  movieTitle;
  
  constructor(
    private apiService: FilmApiService,
    private router: Router 
  ) {
    this.movieList = [];
  }

  getMovieFromApi() {
    this.apiService
      .getMovieByTitleFromTmdb(this.movieTitle)
      .subscribe(async (res) => {
        if (!res) {
          this.movieList = [];
          return;
        }
        
        const result = await JSON.stringify(res);
        const jsonResult = JSON.parse(result);
        const films = jsonResult.results;

        
        if (!films || !(films.length > 0)) {
          this.movieList = [];
          return;
        }

        this.movieList = films.map((movie) => {
          const {
            original_title:Title,
            release_date: Released,
            original_language: Language,
            overview: Plot,
            vote_average: Awards,
          } = movie;
          return {
            Title,
            Released,
            Language,
            Plot,
            Awards,
          };
        });
      });
    
  }
  

  showMovieDetails(movie) {
    let navigationExtras:NavigationExtras = {
      queryParams: {
        details: JSON.stringify(movie)
      }
    }
    this.router.navigate(['details'], navigationExtras);
  }
}
