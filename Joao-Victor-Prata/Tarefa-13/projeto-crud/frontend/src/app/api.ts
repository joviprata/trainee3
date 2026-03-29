import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Estudo {
  id: number;
  conteudo: string;
  anotacoes: string;
  materia: string;
  professor?: string;
  dificuldade: number;
  // datas_estudo: Array<Date>;
}

@Injectable({
  providedIn: 'root',
})

export class Api {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  postEstudo(dados: any) {
    return this.http.post<Estudo>(`${ this.baseUrl }/estudos`, dados);
  }

  getEstudos() {
    return this.http.get<Estudo[]>(`${ this.baseUrl }/estudos`);
  }

  getEstudo(id: number) {
    return this.http.get<Estudo>(`${ this.baseUrl }/estudos/${ id }`);
  }

  patchEstudo(id: number, dados: any) {
    return this.http.patch<Estudo>(`${ this.baseUrl }/estudos/${ id }`, dados);
  }

  deleteEstudo(id: number) {
    return this.http.delete<void>(`${ this.baseUrl }/estudos/${ id }`);
  }
}
