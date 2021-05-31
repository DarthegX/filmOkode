import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { FilmApiService } from '../services/api.service';

import { HomePage } from './home.page';

describe('Heroes Component', () => {
  let fixture: ComponentFixture<HomePage>;
  let mockApiService;
  let movieList;
     beforeEach(() =>{
      mockApiService = jasmine.createSpyObj(['getMovieByTitleFromTmdb']);
      movieList = [
        {
          Awards: 8.2,
          Language: "en",
          Plot: "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.",
          Released: "1977-05-25",
          Title: "Star Wars"},
        {
          Awards: 6,
          Language: "en",
          Plot: "Set between Episode II and III, The Clone Wars is the first computer animated Star Wars film. Anakin and Obi Wan must find out who kidnapped Jabba the Hutt's son and return him safely. The Seperatists will try anything to stop them and ruin any chance of a diplomatic agreement between the Hutts and the Republic.",
          Released: "2008-08-05",
          Title: "Star Wars: The Clone Wars"
        },
        {
          Awards: 6.5,
          Language: "en",
          Plot: "Anakin Skywalker, a young slave strong with the Force, is discovered on Tatooine. Meanwhile, the evil Sith have returned, enacting their plot for revenge against the Jedi.",
          Released: "1999-05-19",
          Title: "Star Wars: Episode I - The Phantom Menace"
        }
      ]
      TestBed.configureTestingModule({
          declarations: [HomePage],
          providers: [
              { provide: FilmApiService, useValue: mockApiService }
          ]           
      })
      fixture = TestBed.createComponent(HomePage);
  })
  it('should set films correctly from the api service', () => {
      mockApiService.getMovieByTitleFromTmdb.and.returnValue((movieList));
      fixture.detectChanges();
      expect(fixture.componentInstance.movieList.length).toBe(3);
  })

  it('should create one ion-item for each film', () => {
    mockApiService.getMovieByTitleFromTmdb.and.returnValue((movieList));
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('ion-list')).length).toBe(3);
})
})

