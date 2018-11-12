import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../shared/services/tournament.service';
import { Card } from '../../shared/classes/cards';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ScryfallService } from '../../shared/services/scryfall.service';

@Component({
    selector: 'app-visual-view',
    templateUrl: './visual-view.component.html',
    styleUrls: ['./visual-view.component.scss']
})
export class VisualViewComponent implements OnInit {
    cardList: Card[];
    dataLoaded = false;

    constructor(
        private scryFall: ScryfallService,
        private tournamentService: TournamentService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.tournamentService.visualListUpdate().subscribe(
            (data: Card[]) => {
                this.cardList = [];
                data.forEach(card => this.cardList.push(new Card(card)));
                this.dataLoaded = true;
            }
        );

        this.route.data.subscribe((data: { decklist: Card[] }) => {
            this.cardList = [];
            data.decklist.forEach(card => this.cardList.push(new Card(card)));
            this.dataLoaded = true;
        });
    }

}
