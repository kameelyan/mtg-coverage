import { Component, OnInit, HostBinding } from '@angular/core';
import { ScryfallService } from '../../shared/services/scryfall.service';
import { Card, ScryFallIdentifier } from '../../shared/classes/cards';
import { Observable, forkJoin } from 'rxjs';
import { TournamentService } from '../../shared/services/tournament.service';

@Component({
    selector: 'app-visual-deck',
    templateUrl: './visual-deck.component.html',
    styleUrls: ['./visual-deck.component.scss']
})
export class VisualDeckComponent implements OnInit {
    @HostBinding('class') class = 'd-flex flex-column flex-fill';
    decklist: string;
    deckname: string;
    cardNames: string[];
    cardList: Array<Card> = [];
    dataLoaded = false;

    constructor(
        private scryFall: ScryfallService,
        private tournamentService: TournamentService
    ) { }

    getIdentifiers(cards: Card[]): ScryFallIdentifier[] {
        let results: ScryFallIdentifier[] = [];
        cards.forEach(card => {
            let length = results.filter(existing => { return card.name === existing.name }).length;
            if (length === 0) {
                results.push(new ScryFallIdentifier({ name: card.name }));
            }
        });
        return results;
    }

    getVisualDeck() {
        this.cardList = [];
        this.dataLoaded = false;
        const cardLine = /^(\d{1,2})x? (.*)$/;
        let mainboard = true;
        this.decklist.trim().split('\n').forEach(line => {
            let number: number = parseInt(line.replace(cardLine, '$1'), 10);
            let name: string = line.replace(cardLine, '$2');
            if (/(\/{1})/.test(name)) { name = name.replace('/', '//'); }
            if (name.length > 0) {
                for (let i = 1; i <= number; i++) {
                    this.cardList.push(new Card({
                        name: name,
                        mainboard: mainboard
                    }));
                }
            } else {
                mainboard = false;
            }
        });
        const indentifiers = this.getIdentifiers(this.cardList);
        this.scryFall.getListOfCards(indentifiers).subscribe(
            (data) => {
                if (data['not_found'].length === 0) {
                    this.cardList.forEach(card => {
                        let index = indentifiers.findIndex(identifier => identifier.name === card.name);
                        let scryfall = data['data'][index];
                        card.type = scryfall['type_line'];
                        card.cmc = scryfall['cmc'];
                        card.id = scryfall['id'];
                        if (scryfall['card_faces'] && scryfall['card_faces'].length > 0 && (scryfall['layout'] == 'transform')) {
                            card.url = scryfall['card_faces'][0]['image_uris']['normal'];
                        } else {
                            card.url = scryfall['image_uris']['normal'];
                        }
                    });
                    this.dataLoaded = true;
                    this.tournamentService.saveVisualList(this.cardList, this.deckname).subscribe();
                }
            }
        );
    }

    ngOnInit() {

    }

}
