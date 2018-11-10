import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { TournamentService } from './tournament.service';
import { Observable } from 'rxjs';
import { Card } from '../classes/cards';

@Injectable({
    providedIn: 'root'
})
export class VisualDecklistResolver implements Resolve<Card[]> {

    constructor(
        private tournamentService: TournamentService
    ) { }

    resolve(): Observable<Card[]> {
        return this.tournamentService.getVisualList();
    }
}
