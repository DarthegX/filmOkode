import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  movie;

  constructor(
    private route: ActivatedRoute, 
    private router: Router
  ) {
    this.route.queryParams.subscribe( params => {
      if (params) {
        this.movie = JSON.parse(params.details);
        console.log("movie", this.movie)
      }
    })
   }

  ngOnInit() {
  }

}
