import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface Espacio {
  _id: string;
  nombre: string;
  tipo: number;
}
export interface Response {
  espacios: Espacio[];
}


@Injectable({
  providedIn: 'root',
})
export class AllEspaciosGQL extends Query<Response> {
  document = gql`
  query listfilterEspacio($dataFilter:FilterEspacioIn!){
    listfilterEspacio(dataFilter:$dataFilter){
      _id
      nombre
      tipo
    }
  }
  `;
}