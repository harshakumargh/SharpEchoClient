import { Component, OnInit } from '@angular/core';
import { MatchserviceService } from '../matchservice.service';
import { MatchUps } from 'src/models/matchup';
import { Team } from 'src/models/team';

@Component({
  selector: 'app-matchups',
  templateUrl: './matchups.component.html',
  styleUrls: ['./matchups.component.scss']
})
export class MatchupsComponent implements OnInit {

  constructor(private service: MatchserviceService) { }

  errorMessage: string = "";

  matchups: MatchUps = {team1:0,team2:0};
  teams: Team[]=[];
  team1 :string= "";
  team2 :string ="";
  team1Wins : number = 0;
  team2Wins :number = 0;
  isSubmit:boolean=false;


  ngOnInit(): void {
    this.getTeams();
  }

  changeTeam1(input: any) {
    let value = parseInt(input.value);
    if(value==0){
      alert("Select team to continue.")
    }
    else if( value!=0 && this.matchups.team2 == value){
      alert("Same team already selected in other dropdown, select other team.")
    }
    else{
      this.matchups.team1 = value;
    }
  }

  changeTeam2(input: any) {
    let value = parseInt(input.value);
    if(value==0){
      alert("Select team to continue.")
    }
    else if( value!=0 && this.matchups.team1 == value){
      alert("Same team already selected in other dropdown, select other team.")
    }
    else{
      this.matchups.team2 = value;
    }
  }

  getTeams(){
    this.service.getTeams().subscribe(
      data => {
        this.teams = data;
      }
    )
  }

  validateMatchUpRequest():boolean{
    if(this.matchups.team1 == this.matchups.team2){
      return false;
    }
    return true;
  }

  getMatchUps(){
    if(this.validateMatchUpRequest()){
      this.isSubmit=true;
      this.team1 = this.teams.filter(x=>x.id==this.matchups.team1)[0].name;
      this.team2 = this.teams.filter(x=>x.id==this.matchups.team2)[0].name;
        this.service.getMatchUps(this.matchups).subscribe(
          (data:MatchUps) => {
            this.team1Wins= data.team1;
            this.team2Wins =data.team2;
          }
        )
    }
    else{
      alert("Same team selected in both dropdowns.")
    }
  }
}
