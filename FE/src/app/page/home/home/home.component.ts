import { Component, OnInit } from '@angular/core';
import { ShowtimeService } from 'app/service/showtime.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private showtimeService: ShowtimeService
  ) { }

  ngOnInit() {
    this.showtimeService.today2().subscribe({
      next: res=>{
        console.log(res);
        
      },
      error: e=>{
        console.log(e);
        
      }
    })
  }

}