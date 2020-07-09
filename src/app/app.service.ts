import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//componentes que obtém os dados de autenticação da plataforma
import { service, user } from '@seniorsistemas/senior-platform-data';
import { forkJoin, Observable, from } from 'rxjs';
import { mergeMap} from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) { }

  getDadosUsuario(): Observable<any> {
    return forkJoin(
      //busca a url base e o token para montagem do request.
      from(service.getRestUrl()),
      from(user.getAuthHeader()),
    ).pipe(mergeMap((values: any) => {
      const [bridgeUrl, authHeader] = values;
      let headers = new HttpHeaders({
        "Authorization": authHeader
      });
      return this.http.get<any>(`${bridgeUrl}usuarios/userManager/queries/obterMeusDados`, { headers });;
    }));
  }
}