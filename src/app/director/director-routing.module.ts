import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchComponent } from './match/match.component';
import { MatchResolver } from '../shared/services/match-resolver';
import { DirectorComponent } from './director.component';


const routes: Routes = [
    {
        path: '',
        component: DirectorComponent,
        children: [
            {
                path: 'match/:name',
                component: MatchComponent,
                resolve: {
                    match: MatchResolver
                }
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectorRoutingModule { }
