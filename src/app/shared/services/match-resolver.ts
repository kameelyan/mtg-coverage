import { Injectable } from '@angular/core';
import { Tournament, Match } from '../classes/tournament';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TournamentService } from './tournament.service';
import { Observable, of } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MatchResolver implements Resolve<Match> {
    constructor(
        private tournamentService: TournamentService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Match> {
        const matchName = route.paramMap.get('name');

        return this.tournamentService.getMatch(matchName).pipe(
            catchError((err) => {
                this.router.navigate(['/']);
                return of(new Match());
            }),
            take(1),
            map((match) => {
                if (match) {
                    return match;
                } else {
                    this.router.navigate(['/']);
                }
            }),
            
        );
    }
}
