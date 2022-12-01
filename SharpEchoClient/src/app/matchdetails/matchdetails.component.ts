import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatchDetails } from 'src/models/matchup';
import { Team } from 'src/models/team';
import { MatchserviceService } from '../matchservice.service';

@Component({
  selector: 'app-matchdetails',
  templateUrl: './matchdetails.component.html',
  styleUrls: ['./matchdetails.component.scss']
})
export class MatchdetailsComponent implements OnInit {

  constructor(private service: MatchserviceService) { }

  matchDetails : MatchDetails = {id:0, team1 : 0, team2 :0, winner :0, date : new Date().toJSON().split('T')[0]} ;
  teams: Team[] = [];

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams(){
    this.service.getTeams().subscribe(
      data => {
        this.teams = data;
      }
    )
  }

  changeTeam1(input: any) {
    let value = parseInt(input.value);
    if(value==0){
      alert("Select team to continue.")
    }
    else if( value!=0 && this.matchDetails.team2 == value){
      alert("Same team already selected in other dropdown, select other team.")
    }
      this.matchDetails.team1 = value;
  }

  changeTeam2(input: any) {
    let value = parseInt(input.value);
    if(value==0){
      alert("Select team to continue.")
    }
   if( value!=0 && this.matchDetails.team1 == value){
      alert("Same team already selected in other dropdown, select other team.")
    }
      this.matchDetails.team2 = value;
  }

  winner(input: any) {
    debugger;
    let value = parseInt(input.value);
    if(value==0){
      alert("Select team to continue.")
    }
   if( value!=0 && this.matchDetails.team1 != value && this.matchDetails.team2 != value ){
      alert("Invalid winner selected.")
    }
    if(this.matchDetails.team1 == this.matchDetails.team2 ){
      alert("Same teams selected.")
    }
      this.matchDetails.winner = value;
  }

  validateRequest():boolean{
    if(this.matchDetails.team1 == this.matchDetails.team2 ){
      return false;
    }
    if(this.matchDetails.team1 != this.matchDetails.winner && this.matchDetails.team2 != this.matchDetails.winner){
      return false;
    }
    if(this.matchDetails.date == ""){
      return false;
    }
    return true;
  }

  saveMatchDetails(){
    if(this.validateRequest()){
      this.service.addMatch(this.matchDetails).subscribe(
        (data:MatchDetails) => {
          if(data.id > 0){
            alert("Successfully added.");
          }
        }
      )
    }
    else{
      alert("Same team selected or Invalid winner selected or Invalid date selected.")
    }
  }

  selectDate(input:any){
    this.matchDetails.date = input.value;
  }
}
