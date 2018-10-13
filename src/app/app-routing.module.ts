import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AdminComponent } from './modules/admin/admin.component';
import { TournamentResolver } from './shared/services/tournament-resolver';
import { HomeComponent } from './modules/home/home/home.component';
import { MatchResolver } from './shared/services/match-resolver';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: {
            tournament: TournamentResolver
        }
    },
    {
        path: 'match/:name',
        component: DashboardComponent,
        resolve: {
            match: MatchResolver
        }
    },
    {
        path: 'admin',
        component: AdminComponent,
        resolve: {
            tournament: TournamentResolver
        }
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
