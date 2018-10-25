import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tournament, Match } from '../classes/tournament';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Message } from '../classes/message';

@Injectable({
    providedIn: 'root'
})
export class TournamentService {
    private api: string = environment.api + '/api';

    constructor(
        private http: HttpClient,
        private socket: Socket
    ) { }

    getTournament(): Observable<Tournament> {
        return this.http.get<Tournament>(this.api + '/tournament');
    }

    saveTournament(tournament: Tournament): Observable<Tournament> {
        console.log(tournament);
        return this.http.put<Tournament>(this.api + '/tournament', tournament);
    }

    getMatch(matchName: string): Observable<Match> {
        return this.http.get<Match>(this.api + '/match/' + matchName);
    }

    saveMatch(match: Match): Observable<Match> {
        console.log(match);
        return this.http.put<Match>(this.api + '/match', match);
    }

    sendTournament(tournament: Tournament) {
        this.socket.emit('updateTournament', tournament);
    }

    tournamentUpdate() {
        return this.socket.fromEvent('updateTournament').pipe(
            map((data) => {
                return data;
            })
        )
    }

    sendMatch(match: Match) {
        this.socket.emit('updateMatch', match);
    }

    matchUpdate() {
        return this.socket.fromEvent('updateMatch').pipe(
            map((data) => {
                return data;
            })
        )
    }

    sendChatMessage(messageData: Message) {
        this.socket.emit('addToChat', messageData);
    }

    receiveChatMessage() {
        return this.socket.fromEvent('addToChat').pipe(
            map((data) => {
                return data;
            })
        )
    }
}
