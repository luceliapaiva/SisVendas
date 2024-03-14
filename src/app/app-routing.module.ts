import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { ProdutoListComponent } from './produto/produto-list/produto-list.component';
import { ProdutoFormComponent } from './produto/produto-form/produto-form.component';
import { PedidoListComponent } from './pedido/pedido-list/pedido-list.component';
import { PedidoFormComponent } from './pedido/pedido-form/pedido-form.component';

const routes: Routes = [{
  path: 'clientes',
  children: [
    { path: '', component: ClienteListComponent },
    { path: 'incluir', component: ClienteFormComponent },
    { path: ':id', component: ClienteFormComponent }

  ]
}, {
  path: 'produtos',
  children: [
    { path: '', component: ProdutoListComponent},
    { path: 'incluir', component: ProdutoFormComponent },
    { path: ':id', component: ProdutoFormComponent }

  ]
}, {
  path: 'pedidos',
  children: [
    { path: '', component: PedidoListComponent},
    { path: 'incluir', component: PedidoFormComponent },
    { path: ':id', component: PedidoFormComponent }

  ]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
