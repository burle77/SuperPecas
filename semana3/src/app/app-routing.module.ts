import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarrosComponent } from './carros/carros.component';
import { PecasComponent } from './pecas/pecas.component';
import { CarroFormComponent } from './carro-form/carro-form.component'; // Importe o novo componente

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'carros', component: CarrosComponent },
  { path: 'carros/add', component: CarroFormComponent }, // Rota para adicionar carro
  { path: 'carros/edit/:id', component: CarroFormComponent }, // Rota para editar carro
  { path: 'pecas', component: PecasComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
