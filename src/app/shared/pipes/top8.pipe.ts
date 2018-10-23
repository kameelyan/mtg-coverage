import { Pipe, PipeTransform } from '@angular/core';
import { PlayerDeck } from '../classes/tournament';

@Pipe({
    name: 'top8',
    pure: false
})
export class Top8Pipe implements PipeTransform {

    transform(players: PlayerDeck[], indexA: number, indexB: number): any {
        return players.filter((player, index) => {
            return (index === indexA || index === indexB);
        });
    }

}
