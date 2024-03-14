import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent implements OnInit{
  model: ClienteModel = {};
status: string = "";
  constructor(private clienteService: ClienteService,
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
    let resposta = this.clienteService.retornarPorId(id);

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
      resposta = this.clienteService.atualizar(id, this.model);
    } else {
      resposta = this.clienteService.adicionar(this.model);
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

