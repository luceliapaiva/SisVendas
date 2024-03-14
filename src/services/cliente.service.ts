import { Injectable } from "@angular/core";
import { ClienteModel } from "../models/cliente.model";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ClienteService extends BaseService<ClienteModel> {
    protected override modulo = "clientes";

    constructor(httpClient : HttpClient) {
        super(httpClient);
    }
}