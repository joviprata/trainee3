import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Estudo {
  id: string;
  conteudo: string;
  anotacoes: string;
  materia: string;
  professor?: string;
  dificuldade: number;
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

  getEstudo(id: string) {
    return this.http.get<Estudo>(`${ this.baseUrl }/estudos/${ id }`);
  }

  patchEstudo(id: string, dados: any) {
    return this.http.patch<Estudo>(`${ this.baseUrl }/estudos/${ id }`, dados);
  }

  deleteEstudo(id: string) {
    return this.http.delete<void>(`${ this.baseUrl }/estudos/${ id }`);
  }
}
