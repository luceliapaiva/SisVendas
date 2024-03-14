import { Injectable } from "@angular/core";
import { PedidoModel } from "../models/pedido.model";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PedidoService extends BaseService<PedidoModel> {
    protected override modulo = "pedidos";
    
    constructor(httpClient : HttpClient) {
        super(httpClient);
    }
}