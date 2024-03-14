import { Component, OnInit } from '@angular/core';
import { ProdutoModel } from '../../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrl: './produto-list.component.css'
})
export class ProdutoListComponent implements OnInit {
  produtos: ProdutoModel[] = [];

  constructor(private produtoService: ProdutoService) {
  }

  ngOnInit(): void {
      let resposta = this.produtoService.retornarTodos();

      resposta.subscribe({
        next: value => this.produtos = value,
        error: err => alert(err)
      });
  }

  excluir(cliente: ProdutoModel) {
    let confirma = confirm("Deseja realmente excluir?");
    let id = Number(cliente.id);

    if (confirma) {
      let resposta = this.produtoService.excluir(id);

      resposta.subscribe({
        next: () => this.ngOnInit(),
        error: err => alert(err)
      })
    }
  }
}
