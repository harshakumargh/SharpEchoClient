import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map} from 'rxjs/operators';
import { MatchDetails, MatchUps } from 'src/models/matchup';
@Injectable({
  providedIn: 'root'
})
export class MatchserviceService {

  BaseURL: string = "https://sharpechoapi.azurewebsites.net/api/Teams/"
  //BaseURL: string = "https://localhost:5001/api/Teams/"
  constructor(private http: HttpClient) {

  }

  getMatchUps(data:MatchUps):Observable<any>{
    return this.http.get(this.BaseURL + 'GetMatchUps?team1='+ data.team1 +'&team2='+ data.team2)
    .pipe(retry(1),catchError(this.handleError));
  }

  addMatch(matchDetails: MatchDetails):Observable<any>{
   return this.http.post(this.BaseURL + 'AddMatch',matchDetails)
   .pipe(retry(1),catchError(this.handleError));
  }

  getTeams():Observable<any>{
    return this.http.get(this.BaseURL)
    .pipe(retry(1),catchError(this.handleError));
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
