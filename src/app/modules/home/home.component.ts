import { Component, OnInit, HostBinding } from '@angular/core';
import { Tournament } from '../../shared/classes/tournament';
import { ActivatedRoute, Router } from '@angular/router';
import { AvailablePipe } from '../../shared/pipes/available.pipe';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @HostBinding('class') class = 'd-flex flex-column flex-fill';
    tournament: Tournament;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { tournament: Tournament }) => {
            this.tournament = new Tournament(data.tournament);
            console.log(this.tournament);

            const availableMatches = new AvailablePipe().transform(this.tournament.matches);
            if (availableMatches.length === 1) {
                this.router.navigate(['/match', availableMatches[0].name]);
            }
        });
    }

}
