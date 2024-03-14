import { BaseModel } from "./base.model";

export class ClienteModel extends BaseModel {
    public nome?: string;
    public telefone?: string;
    public endereco?: string;
}