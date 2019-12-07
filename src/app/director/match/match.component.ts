import { Component, OnInit, ViewChild } from '@angular/core';
import { Match, Tournament, Player } from 'src/app/shared/classes/tournament';
import { TournamentService } from 'src/app/shared/services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { FAIcons } from 'src/app/shared/classes/fa-icons';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-match',
    templateUrl: './match.component.html'
})
export class MatchComponent implements OnInit {
    @ViewChild('form', { static: false }) form: NgForm;
    tournament: Tournament;
    match: Match;
    dataChanged: boolean = false;
    showSideboard: boolean = false;
    faIcons = new FAIcons();

    constructor(
        private tournamentService: TournamentService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.tournamentService.matchUpdate().subscribe(
            (data) => {
                let newMatch: Match = new Match(data);
                this.tournament.matches = this.tournament.matches.map((match) => {
                    if (match.name === newMatch.name) {
                        return newMatch;
                    } else {
                        return match;
                    }
                });
            }
        );

        this.tournamentService.matchValuesUpdate().subscribe(
            (data) => {
                let newMatch: Match = new Match(data);
                this.tournament.matches = this.tournament.matches.map((match) => {
                    if (match.name === newMatch.name) {
                        match.leftPlayer.setValues(newMatch.leftPlayer);
                        match.rightPlayer.setValues(newMatch.rightPlayer);
                    }
                    return match;
                });
            }
        );

        this.tournamentService.tournamentUpdate().subscribe(
            (data) => {
                this.tournament = new Tournament(data);
            }
        );

        this.route.data.subscribe((data: { match: Match, tournament: Tournament }) => {
            this.tournament = new Tournament(data.tournament);
            this.match = new Match(data.match);
        });
    }

    toggleSideboards() {
        this.showSideboard = !this.showSideboard;
    }

    updateValue(player: Player, value: number) {
        player.life += value;
        this.form.control.markAsDirty();
    }

    swapPlayers(match: Match) {
        const leftPlayer: Player = new Player(match.leftPlayer);
        const rightPlayer: Player = new Player(match.rightPlayer);

        match.leftPlayer = rightPlayer;
        match.rightPlayer = leftPlayer;
        this.form.control.markAsDirty();
    }

    resetLife(match: Match) {
        match.leftPlayer.life = 20;
        match.rightPlayer.life = 20;
        match.leftPlayer.infect = 0;
        match.rightPlayer.infect = 0;
        this.form.control.markAsDirty();
    }

    onUpdate() {
        this.dataChanged = false;
        this.form.control.markAsPristine();
        this.tournamentService.sendMatch(this.match);
    }
}
