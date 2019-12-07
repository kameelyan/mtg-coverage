import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectorRoutingModule } from './director-routing.module';
import { DirectorComponent } from './director.component';
import { MatchComponent } from './match/match.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
    declarations: [DirectorComponent, MatchComponent],
    imports: [
        CommonModule,
        DirectorRoutingModule,
        FormsModule,
        SharedModule,
        FontAwesomeModule
    ]
})
export class DirectorModule { }
