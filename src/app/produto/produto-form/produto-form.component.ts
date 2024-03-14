import { Component, OnInit } from '@angular/core';
import { ProdutoModel } from '../../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ClienteModel } from '../../../models/cliente.model';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.css'
})
export class ProdutoFormComponent implements OnInit{
  model: ProdutoModel = {};
status: string = "";
  constructor(private produtoService: ProdutoService,
              private activeRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe({
      next: parameters => {
        let id = Number(parameters.get('id'));
        this.obterModel(id);
      }
    })
  }

obterModel(id: number) {
  if (id > 0) {
    let resposta = this.produtoService.retornarPorId(id);

    resposta.subscribe({
      next: value => this.model = value,
      error: err => alert(err)
      });
    }
  }

  salvar() {
    let id = Number(this.model.id);
    let resposta : Observable<ClienteModel>;

    this.status = "Processando ...";
    if (id > 0) {
      resposta = this.produtoService.atualizar(id, this.model);
    } else {
      resposta = this.produtoService.adicionar(this.model);
    }

    resposta.subscribe({
      next: value => {
        this.obterModel(Number(value.id));
      this.status = "Salvo com sucesso";
      setTimeout(() => this.status = "", 5000);
      },
      error: err => alert(err)
    });
  }
}
