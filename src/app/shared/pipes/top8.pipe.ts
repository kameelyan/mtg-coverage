import { Pipe, PipeTransform } from '@angular/core';
import { PlayerDeck } from '../classes/tournament';

@Pipe({
    name: 'top8',
    pure: false
})
export class Top8Pipe implements PipeTransform {

    transform(players: PlayerDeck[], indexA: number, indexB: number): any {
        let results: PlayerDeck[] = [];
        if (indexA < players.length && indexB < players.length) {
            results = results.concat(players[indexA], players[indexB]);
        }
        return results;
    }

}
