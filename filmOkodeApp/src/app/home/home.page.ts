import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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
    console.log("TITLE", this.movieTitle)
    this.apiService
      .getMovieByTitleFromTmdb(this.movieTitle)
      .subscribe((res) => {
        console.log("RESULTS", res)
        if (!res) {
          this.movieList = [];
          return;
        }

        

        console.log("RESPUESTA", res)
        /*
        if (!results || !(results.length > 0)) {
          this.movieList = [];
          return;
        }

        this.movieList = results.map((movie) => {
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
        });*/
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
