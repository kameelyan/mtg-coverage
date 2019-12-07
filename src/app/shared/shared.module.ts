import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailablePipe } from './pipes/available.pipe';
import { DisplayOrderPipe } from './pipes/display-order.pipe';
import { Top8Pipe } from './pipes/top8.pipe';
import { MainboardPipe } from './pipes/mainboard.pipe';
import { PilesPipe } from './pipes/piles.pipe';
import { SideboardPipe } from './pipes/sideboard.pipe';

@NgModule({
    declarations: [
        AvailablePipe,
        DisplayOrderPipe,
        Top8Pipe,
        MainboardPipe,
        PilesPipe,
        SideboardPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AvailablePipe,
        DisplayOrderPipe,
        Top8Pipe,
        MainboardPipe,
        PilesPipe,
        SideboardPipe
    ]
})
export class SharedModule { }
