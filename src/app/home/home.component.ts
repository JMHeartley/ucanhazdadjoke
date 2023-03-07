import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { map } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  jokeOftheDay = {
    "id": "",
    "joke": "",
    "date": ""
  };

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getJoke();
  }

  getJoke() {
    this.httpClient.get('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json'
      }
    })
      .pipe(map((data: any) => {
        return {
          id: data.id,
          joke: data.joke,
          date: new Date().toDateString()
        };
      }))
      .subscribe((data: any) => {
        this.jokeOftheDay = data;
      });
  }
}
