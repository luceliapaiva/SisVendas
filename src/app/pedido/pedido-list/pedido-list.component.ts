import { Component, OnInit } from '@angular/core';
import { PedidoModel } from '../../../models/pedido.model';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrl: './pedido-list.component.css'
})
export class PedidoListComponent implements OnInit {
  pedidos: PedidoModel[] = [];

  constructor(private pedidoService: PedidoService) {
  }

  ngOnInit(): void {
      let resposta = this.pedidoService.retornarTodos();

      resposta.subscribe({
        next: value => this.pedidos = value,
        error: err => alert(err)
      });
  }

  excluir(pedido: PedidoModel) {
    let confirma = confirm("Deseja realmente excluir?");
    let id = Number(pedido.id);

    if (confirma) {
      let resposta = this.pedidoService.excluir(id);

      resposta.subscribe({
        next: () => this.ngOnInit(),
        error: err => alert(err)
      })
    }
  }
}
