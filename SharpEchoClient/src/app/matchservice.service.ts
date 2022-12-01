import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MatchUps } from 'src/models/matchup';
@Injectable({
  providedIn: 'root'
})
export class MatchserviceService {

  constructor(private http: HttpClient) {
  }

  getMatchUps(data:MatchUps){
    return this.http.get('https://sharpechoapi.azurewebsites.net/api/Teams/GetMatchUps?team1='+ data.team1 +'&team2='+ data.team2)
    .pipe(retry(1),catchError(this.handleError));
  }

  addMatch(){
   // return this.http.post
  }

    // Error handling
    handleError(error: any) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(() => {
        return errorMessage;
      });
    }
}
