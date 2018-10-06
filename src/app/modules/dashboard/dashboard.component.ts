import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from '../../shared/services/tournament.service';
import { Tournament } from '../../shared/classes/tournament';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    @HostBinding('class') class = 'd-flex flex-column flex-fill';
    tournament: Tournament = null;

    constructor(
        private route: ActivatedRoute,
        private tournamentService: TournamentService
    ) { }

    onSave() {
        this.tournament.info[0].value = "Brad Brown";

        this.tournamentService.saveTournament(this.tournament).subscribe(
            (data) => {
                console.log(data);
            },
            (err) => {
                console.log(err);
            }
        );
    }

    ngOnInit() {
        console.log(this.route.data);
        this.route.data.subscribe((data: { tournament: Tournament }) => {
            this.tournament = new Tournament(data.tournament);
            console.log(this.tournament);
        });
    }
}
