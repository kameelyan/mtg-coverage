import { Component, OnInit, HostBinding, ViewChild, ViewContainerRef } from '@angular/core';
import { TournamentService } from '../../shared/services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { Tournament, Match, Player, PlayerDeck, PlayerToWatch } from '../../shared/classes/tournament';
import { FAIcons } from '../../shared/classes/fa-icons';
import { NgForm } from '@angular/forms';
import { Message } from '../../shared/classes/message';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ScryfallService } from '../../shared/services/scryfall.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    @HostBinding('class') class = 'd-flex flex-column flex-fill';
    @ViewChild('form') form: NgForm;
    tournament: Tournament;
    dataChanged: boolean = false;
    showSideboard: boolean = false;
    faIcons = new FAIcons();
    newMessages = 0;
    activeTab: any;
    cardNames: string[];
    selectedCard: string;
    selectedImage: any;
    parsedDeck: any;
    visualDeck: any;

    constructor(
        private tournamentService: TournamentService,
        private route: ActivatedRoute,
        private scryFall: ScryfallService
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

    toggleSideboards() {
        this.showSideboard = !this.showSideboard;
    }

    updateValue(player: Player, value: number) {
        player.life += value;
        this.form.control.markAsDirty();
    }

    setWinner(from: PlayerDeck, to: PlayerDeck) {
        to.deck = from.deck;
        to.name = from.name;
        this.dataChanged = true;
    }

    clearTop8(round: string) {
        switch (round) {
            case 'quarters':
                this.tournament.top8.clearRound('quarters');
            case 'semis':
                this.tournament.top8.clearRound('semis');
            case 'finals':
                this.tournament.top8.clearRound('finals');
                break;
        }
        this.dataChanged = true;
    }

    movePlayerToWatch(playersToWatch: PlayerToWatch[], index) {
        if (index !== 0) {
            const player = new PlayerToWatch(playersToWatch[index - 1]);
            playersToWatch[index - 1].name = playersToWatch[index].name;
            playersToWatch[index - 1].record = playersToWatch[index].record;
            playersToWatch[index - 1].standing = playersToWatch[index].standing;

            playersToWatch[index].name = player.name;
            playersToWatch[index].record = player.record;
            playersToWatch[index].standing = player.standing;
            this.dataChanged = true;
        }
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
        this.tournamentService.sendTournament(this.tournament);
    }

    searchCards = (query: Observable<string>) => {
        return query.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(term => {
                return term.length < 2 ? [] : this.cardNames.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
            })
        );
    };

    getCardImage() {
        this.scryFall.getCardByName(this.selectedCard).subscribe(
            (data) => {
                console.log(data);
                const request = {
                    url: data['image_uris'].normal,
                    id: data['id'],
                    size: 'normal'
                };

                this.scryFall.getCardImage(request).subscribe(
                    (data) => {
                        this.selectedImage = data['src'];
                    }
                );
            }
        );
    }

    getVisualDeck() {
        const expression = /^(\d{1,2})x? (.*)$/;
        const list = this.visualDeck.trim().split('\n').map(line => {
            let name: string = line.replace(expression, '$2');
            if (/(\/{1})/.test(name)) {
                name = name.replace('/', '//');
            }
            return {
                number: line.replace(expression, '$1'),
                name: name
            };
        });
        let reduced: string[] = [];
        list.forEach(card => {
            if (card.name.length > 0) {
                if (!reduced.includes(card.name)) {
                    reduced.push(card.name);
                }
            }
        });
        const identifiers = reduced.map(card => {
            return { name: card };
        });
        this.scryFall.getListOfCards(identifiers).subscribe(
            (data) => {
                let merged = reduced.map((name, index) => {
                    return {
                        query: name,
                        result: data['data'][index]
                    };
                });
                let final = list.map(card => {
                    let data = {
                        number: card.number,
                        name: card.name,
                        image: null,
                        size: 'small',
                        id: null,
                        url: null
                    };
                    if (card.name.length > 0) {
                        let scryCard = merged.filter(data => {
                            return data.query === card.name;
                        }).shift();
                        data.id = scryCard.result['id'];
                        data.url = scryCard.result['image_uris'].small;
                    }
                    return data;
                });
                final.forEach(card => {
                    if (card.name.length > 0) {
                        this.scryFall.getCardImage(card).subscribe(
                            (data) => {
                                card.image = data['src'];
                            }
                        );
                    }
                });
                this.parsedDeck = final;
            }
        );

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

        this.scryFall.getCardNames().subscribe(
            (data) => {
                this.cardNames = data['data'];
            }
        );
    }
}
