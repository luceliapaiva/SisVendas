import { BaseModel } from "./base.model";

export class ProdutoModel extends BaseModel {
    public descricao?: string;
    public unidade?: string;
    public preco?: number;
}