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
    match: Match = null;
    activeSection: string = 'life';
    mirrored: boolean = false;
    dataChanged: boolean = false;
    faIcons = new FAIcons();

    constructor(
        private tournamentService: TournamentService,
        private route: ActivatedRoute
    ) { }

    swapPlayers() {
        this.mirrored = !this.mirrored;
    }

    updateValue(side: string, value: number) {
        let player: Player;
        if (side === 'left') {
            player = this.mirrored ? this.match.players.rightPlayer : this.match.players.leftPlayer;
        } else {
            player = this.mirrored ? this.match.players.leftPlayer : this.match.players.rightPlayer;
        }
        player[this.activeSection] += value;
        this.dataChanged = true;
    }

    resetValues() {
        this.match.players.leftPlayer.life = 20;
        this.match.players.leftPlayer.infect = 0;
        this.match.players.leftPlayer.wins = 0;

        this.match.players.rightPlayer.life = 20;
        this.match.players.rightPlayer.infect = 0;
        this.match.players.rightPlayer.wins = 0;
    }

    onUpdate() {
        this.dataChanged = false;
        this.tournamentService.sendMatch(this.match);
    }

    ngOnInit() {

        this.tournamentService.matchUpdate().subscribe(
            (data) => {
                this.match = new Match(data);
            }
        );

        this.route.data.subscribe((data: { match: Match }) => {
            this.match = new Match(data.match);
            console.log(this.match);
        });
    }
}
