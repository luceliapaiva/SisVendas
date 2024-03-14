import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';
import { error } from 'jquery';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent implements OnInit {
  clientes: ClienteModel[] = [];

  constructor(private clienteService: ClienteService) {
  }

  ngOnInit(): void {
      let resposta = this.clienteService.retornarTodos();

      resposta.subscribe({
        next: value => this.clientes = value,
        error: err => alert(err)
      });
  }

  excluir(cliente: ClienteModel) {
    let confirma = confirm("Deseja realmente excluir?");
    let id = Number(cliente.id);

    if (confirma) {
      let resposta = this.clienteService.excluir(id);

      resposta.subscribe({
        next: () => this.ngOnInit(),
        error: err => alert(err)
      })
    }
  }
}
