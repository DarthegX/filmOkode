import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators'


export interface Movie {
  Title: string;
  Released: string;
  Language: string;
  Plot: string;
  Awards: string;
}

@Injectable({
  providedIn: 'root'
})

export class FilmApiService {

   corsBypass = 'cors-anywhere.herokuapp.com';

   api = 'www.omdbapi.com/?';
   apikeyOmdb = 'apikey=7536f32f';
   apikeyTmdb = '0c16d19855fa7e3771c9710816a31bbd';

   urlTmdb = 'https://api.themoviedb.org/3/';

  constructor(
    private http: HttpClient
  ) { }

  handleError(error) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ha ocurrido un error:', error.error.message);
    }
    return throwError('Algo ha pasado, prueba otra vez');
  }

  getMovieByTitleFromOmdb(title){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(headers);
    let urlOmdb = `https://${this.corsBypass}/${this.api}t=${title}&${this.apikeyOmdb}`;

    console.log("URL", urlOmdb)
    return this.http.get(urlOmdb, { headers }).pipe(map((response: any) => { return response.json() } ));;
  }

  getMovieByTitleFromTmdb(title){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(headers);
    let urlTmdb = ''.concat(this.urlTmdb, 'search/movie?api_key=', this.apikeyTmdb, '&query=', title, '&page=1');

    return this.http.get(urlTmdb, { headers });
  }
}