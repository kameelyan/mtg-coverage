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

    updateCardImages() {
        this.dataLoaded = false;
        let allImages = [];
        this.cardList.forEach(card => {
            let length = allImages.filter(existing => { return card.id === existing.id }).length;
            if (length === 0) {
                allImages.push({
                    id: card.id,
                    url: card.url,
                    size: 'normal'
                });
            }
        });
        const getImages = [];
        allImages.forEach(image => {
            getImages.push(this.scryFall.getCardImage(image));
        });
        forkJoin(getImages).subscribe(
            (images) => {
                this.cardList.forEach(card => {
                    let image = images.filter(image => image['id'] === card.id).shift();
                    card.image = 'data:image/jpeg;base64,' + image['src'];
                });
                this.dataLoaded = true;
            }
        );
    }

    ngOnInit() {
        this.tournamentService.visualListUpdate().subscribe(
            (data: Card[]) => {
                this.cardList = [];
                data.forEach(card => this.cardList.push(new Card(card)));
                this.updateCardImages();
            }
        );

        this.route.data.subscribe((data: { decklist: Card[] }) => {
            this.cardList = [];
            data.decklist.forEach(card => this.cardList.push(new Card(card)));
            this.updateCardImages();
        });
    }

}
