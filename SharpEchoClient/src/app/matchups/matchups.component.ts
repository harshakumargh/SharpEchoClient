import { Component, OnInit } from '@angular/core';
import { MatchserviceService } from '../matchservice.service';
import { observable } from 'rxjs';
import { MatchUps } from 'src/models/matchup';
@Component({
  selector: 'app-matchups',
  templateUrl: './matchups.component.html',
  styleUrls: ['./matchups.component.scss']
})
export class MatchupsComponent implements OnInit {

  constructor(private service: MatchserviceService) { }

  ngOnInit(): void {
    this.getMatchUps();
  }

  getMatchUps(){
    let team1: number = 1;
    let team2: number = 2;
    var matchups : MatchUps= {team1 :team1, team2 : team2}

    this.service.getMatchUps(matchups).subscribe(
      data => {
        console.log(data);
      }
    )
  }
}
