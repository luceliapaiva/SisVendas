import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoFormComponent } from './pedido-form/pedido-form.component';
import { PedidoListComponent } from './pedido-list/pedido-list.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PedidoFormComponent,
    PedidoListComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule
  ]
})
export class PedidoModule { }
