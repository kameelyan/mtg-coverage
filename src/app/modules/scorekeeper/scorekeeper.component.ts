import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { Tournament, Match } from '../../shared/classes/tournament';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TournamentService } from '../../shared/services/tournament.service';
import { FAIcons } from '../../shared/classes/fa-icons';

@Component({
    selector: 'app-scorekeeper',
    templateUrl: './scorekeeper.component.html',
    styleUrls: ['./scorekeeper.component.scss']
})
export class ScorekeeperComponent implements OnInit {
    @HostBinding('class') class = 'd-flex flex-column flex-fill';
    @ViewChild('form') form: NgForm;
    tournament: Tournament;
    newMessages = 0;
    activeTab: any;
    faIcons = new FAIcons();

    constructor(
        private tournamentService: TournamentService,
        private route: ActivatedRoute
    ) { }

    tabChange(event) {
        this.activeTab = event['nextId'];
        if (this.activeTab == 'chat') {
            this.newMessages = 0;
        }
    }

    newChatMessage(message) {
        if (this.activeTab !== 'chat') {
            this.newMessages++;
        }
    }

    onUpdate() {
        this.form.control.markAsPristine();
        this.tournamentService.sendTournament(this.tournament);
    }

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

        this.tournamentService.tournamentUpdate().subscribe(
            (data) => {
                this.tournament = new Tournament(data);
            }
        );

        this.route.data.subscribe((data: { tournament: Tournament }) => {
            this.tournament = new Tournament(data.tournament);
            console.log(this.tournament);
        });
    }

}
