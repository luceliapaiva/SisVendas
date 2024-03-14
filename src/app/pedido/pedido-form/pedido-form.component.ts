import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { PedidoModel } from '../../../models/pedido.model';
import { PedidoService } from '../../../services/pedido.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from '../../../services/cliente.service';
import { ClienteModel } from '../../../models/cliente.model';
import { ProdutoService } from '../../../services/produto.service';
import { ProdutoModel } from '../../../models/produto.model';
import { PedidoProdutoModel } from '../../../models/pedido-produto.model';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrl: './pedido-form.component.css'
})
export class PedidoFormComponent implements OnInit{
  model: PedidoModel = {};
  listaClientes: ClienteModel[] = [];
  listaProdutos: ProdutoModel[] = [];
  produtoSelecionado?: ProdutoModel;
  quantidade: number = 0;
  status: string = "";
  private modalService = inject(NgbModal);
	closeResult = '';

  constructor(private pedidoService: PedidoService,
              private clienteService: ClienteService,
              private produtoService: ProdutoService,
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
    let resposta = this.pedidoService.retornarPorId(id);

    resposta.subscribe({
      next: value => this.model = value,
      error: err => alert(err)
      });
    }
  }

  salvar() {
    let id = Number(this.model.id);
    let resposta : Observable<PedidoModel>;
    this.model.dataEmissao = new Date();

    this.status = "Processando ...";
    if (id > 0) {
      resposta = this.pedidoService.atualizar(id, this.model);
    } else {
      resposta = this.pedidoService.adicionar(this.model);
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

  
	listarClientes(htmlModalCliente: TemplateRef<any>) {
		let resposta = this.clienteService.retornarTodos();

    resposta.subscribe({
      next: value => this.listaClientes = value
    });

    this.modalService.open(htmlModalCliente, { ariaLabelledBy: 'modal-basic-title', size: 'x1', scrollable:true }).result.then();
	}

  listarProdutos(htmlModalProduto: TemplateRef<any>) {
		let resposta = this.produtoService.retornarTodos();

    resposta.subscribe({
      next: value => this.listaProdutos = value
    });

    this.modalService.open(htmlModalProduto, { ariaLabelledBy: 'modal-basic-title', size: 'x1', scrollable:true }).result.then();
	}

  selecionarCliente(cliente: ClienteModel, btnFechar: HTMLButtonElement) {
    this.model.cliente = cliente;
    btnFechar.click();
  }

  selecionarProduto(produto: ProdutoModel, btnFechar: HTMLButtonElement) {
    this.produtoSelecionado = produto;
    btnFechar.click();
  }

  incluirProduto() {
    if (this.produtoSelecionado == undefined) {
      alert("Produto inválido!");
      return;
    }

    if (this.quantidade <= 0) {
      alert("Quantidade inválida!");
      return;
    }

    let pedidoProduto: PedidoProdutoModel = {
      produto: this.produtoSelecionado,
      quantidade: this.quantidade,
      totalItem: Number(this.produtoSelecionado?.preco) * this.quantidade
    }

    if (this.model.pedidoProdutos == undefined) {
      this.model.pedidoProdutos = [];
    }

    this.model.pedidoProdutos?.push(pedidoProduto);

    this.produtoSelecionado = undefined;
    this.quantidade = 0;

    this.calcularTotal();
  }

  excluirProduto(pedidoProduto: PedidoProdutoModel) {
    let indexOf = this.model.pedidoProdutos?.indexOf(pedidoProduto);
    let posicao = Number(indexOf);

    this.model.pedidoProdutos?.splice(posicao, 1);
    this.calcularTotal();
  }

  calcularTotal() {
    let totalPedido: number = 0;
    this.model.pedidoProdutos?.forEach(pedidoProduto => {
      totalPedido += Number(pedidoProduto.totalItem);
    });

    this.model.totalPedido = totalPedido;
  }
}
