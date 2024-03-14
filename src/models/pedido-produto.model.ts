import { BaseModel } from "./base.model";
import { ProdutoModel } from "./produto.model";

export class PedidoProdutoModel extends BaseModel {
    public produto?: ProdutoModel;
    public quantidade?: number;
    public totalItem?: number;
}