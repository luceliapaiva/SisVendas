import { HttpClient } from "@angular/common/http";
import { BaseModel } from "../models/base.model";
import { Observable } from "rxjs";

export abstract class BaseService<T extends BaseModel> {
    private baseRoute = "http://localhost:8000";
    protected abstract modulo: string; //clientes, produtos, pedidos

    public get route() {
        return `${this.baseRoute}/${this.modulo}`;
    }

    constructor(private httpClient: HttpClient) {
     }

     public retornarTodos(): Observable<T[]> {
        let resposta = this.httpClient.get<T[]>(this.route);
        return resposta;
     }

     public retornarPorId(id: number): Observable<T> {
        //http://localhost:4200/clientes/1
        let resposta = this.httpClient.get<T>(`${this.route}/${id}`);
        return resposta;
     }

     public adicionar(model: T): Observable<T> {
        let resposta = this.httpClient.post<T>(this.route, model);
        return resposta;
     }

     public atualizar(id: number, model: T): Observable<T> {
        let resposta = this.httpClient.put<T>(`${this.route}/${id}`, model);
        return resposta;
     }

     public excluir(id: number): Observable<any> {
        let resposta = this.httpClient.delete<T>(`${this.route}/${id}`);
        return resposta;
     }
}