import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AdminComponent } from './modules/admin/admin.component';
import { TournamentResolver } from './shared/services/tournament-resolver';
import { HomeComponent } from './modules/home/home.component';
import { MatchResolver } from './shared/services/match-resolver';
import { ScorekeeperComponent } from './modules/scorekeeper/scorekeeper.component';
import { VisualDeckComponent } from './modules/visual-deck/visual-deck.component';
import { VisualViewComponent } from './modules/visual-view/visual-view.component';
import { VisualDecklistResolver } from './shared/services/visual-decklist-resolver';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: {
            tournament: TournamentResolver
        }
    },
    {
        path: 'director',
        loadChildren: () => import('./director/director.module').then(m => m.DirectorModule),
        resolve: {
            tournament: TournamentResolver
        }
    },
    {
        path: 'match/:name',
        component: DashboardComponent,
        resolve: {
            match: MatchResolver,
            tournament: TournamentResolver
        }
    },
    {
        path: 'admin',
        component: AdminComponent,
        resolve: {
            tournament: TournamentResolver
        }
    },
    {
        path: 'scorekeeper',
        component: ScorekeeperComponent,
        resolve: {
            tournament: TournamentResolver
        }
    },
    {
        path: 'visualview',
        component: VisualViewComponent,
        resolve: {
            decklist: VisualDecklistResolver
        }
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
