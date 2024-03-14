import { BaseModel } from "./base.model";
import { ClienteModel } from "./cliente.model";
import { PedidoProdutoModel } from "./pedido-produto.model";

export class PedidoModel extends BaseModel {
    public dataEmissao?: Date;
    public totalPedido?: number;
    public cliente?: ClienteModel;
    public pedidoProdutos?: PedidoProdutoModel[];
}