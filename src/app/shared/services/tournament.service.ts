import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tournament } from '../classes/tournament';

@Injectable({
    providedIn: 'root'
})
export class TournamentService {
    private api: string = environment.api;

    constructor(private http: HttpClient) { }

    getTournament(): Observable<Tournament> {
        return this.http.get<Tournament>(this.api + '/tournament');
    }

    saveTournament(tournament: Tournament): Observable<Tournament> {
        console.log(tournament);
        return this.http.put<Tournament>(this.api + '/tournament', tournament);
    }
}
