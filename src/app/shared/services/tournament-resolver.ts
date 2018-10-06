import { Injectable } from '@angular/core';
import { Tournament } from '../classes/tournament';
import { Resolve } from '@angular/router';
import { TournamentService } from './tournament.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TournamentResolver implements Resolve<Tournament> {

    constructor(
        private tournamentService: TournamentService
    ) { }

    resolve(): Observable<Tournament> {
        return this.tournamentService.getTournament();
    }
}
