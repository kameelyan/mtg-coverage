import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tournament, Match, Player } from '../../shared/classes/tournament';
import { NgForm } from '@angular/forms';
import { FAIcons } from '../../shared/classes/fa-icons';
import { TournamentService } from '../../shared/services/tournament.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    @HostBinding('class') class = 'd-flex flex-column flex-fill';
    tournament: Tournament;
    match: Match = null;
    activeSection: string = 'life';
    mirrored: boolean = false;
    dataChanged: boolean = false;
    faIcons = new FAIcons();
    newMessages: number = 0;

    constructor(
        private tournamentService: TournamentService,
        private route: ActivatedRoute
    ) { }

    newChatMessage(message) {
        if (this.activeSection !== 'chat') {
            this.newMessages++;
        }
    }

    swapPlayers() {
        this.mirrored = !this.mirrored;
    }

    updateValue(side: string, value: number) {
        let player: Player;
        if (side === 'left') {
            player = this.mirrored ? this.match.rightPlayer : this.match.leftPlayer;
        } else {
            player = this.mirrored ? this.match.leftPlayer : this.match.rightPlayer;
        }
        player[this.activeSection] += value;
        this.dataChanged = true;
    }

    resetValues() {
        switch (this.activeSection) {
            case "life":
                this.match.leftPlayer.life = 20;
                this.match.rightPlayer.life = 20;
                break;
            case "infect":
                this.match.leftPlayer.infect = 0;
                this.match.rightPlayer.infect = 0;
                break;
            case "gamewins":
                this.match.leftPlayer.gamewins = 0;
                this.match.rightPlayer.gamewins = 0;
                break;
        }
        this.dataChanged = true;
    }

    onUpdate() {
        this.dataChanged = false;
        this.tournamentService.sendMatchValues(this.match);
    }

    ngOnInit() {

        this.tournamentService.matchUpdate().subscribe(
            (data) => {
                let newMatch: Match = new Match(data);
                if (this.match.name === newMatch.name) {
                    this.match = newMatch;
                }
            }
        );

        this.tournamentService.matchValuesUpdate().subscribe(
            (data) => {
                let newMatch: Match = new Match(data);
                this.match.leftPlayer.setValues(newMatch.leftPlayer);
                this.match.rightPlayer.setValues(newMatch.rightPlayer);
            }
        );

        this.tournamentService.tournamentUpdate().subscribe(
            (data) => {
                this.tournament = new Tournament(data);
                let newMatch = this.tournament.matches.filter((match) => {
                    return this.match.name === match.name;
                }).shift();
                if (newMatch !== undefined) {
                    this.match = newMatch;
                }
            }
        );

        this.route.data.subscribe((data: { match: Match, tournament: Tournament }) => {
            this.tournament = new Tournament(data.tournament);
            this.match = new Match(data.match);
        });
    }
}
