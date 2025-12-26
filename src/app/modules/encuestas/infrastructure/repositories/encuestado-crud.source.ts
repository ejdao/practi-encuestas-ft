import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, map, tap } from 'rxjs';
import { FetchEncuestadosPayload } from '@encuestas/application/payloads';
import { ENCUESTAS_END_POINTS } from '@encuestas/end-points';
import { Encuestado } from '@encuestas/domain/entities';
import { dataToEncuestadoFactory } from '../factories';
import { DataStoredI } from '@common/models';
import { EncuestadoRes } from '../responses';

@Injectable()
export class EncuestadoCrudSource {
  protected _encuestados = new BehaviorSubject<DataStoredI<Encuestado>>(new DataStoredI([], null));
  protected _encuestados$ = this._encuestados.asObservable();

  constructor(private _http: HttpClient) {}

  public async fetch(payload: FetchEncuestadosPayload, refresh: boolean): Promise<Encuestado[]> {
    if (!refresh && this._encuestados.value.updatedAt) return this._encuestados.value.data;

    const params: any = {};

    if (payload.pattern) params.pattern = payload.pattern!;
    if (payload.parentezco) params.parentezcoCode = payload.parentezco?.getCode()!;
    if (payload.onlyCreatedByMe) params.onlyCreatedByMe = payload.onlyCreatedByMe!;
    if (payload.forComplement) params.forComplement = payload.forComplement!;

    return firstValueFrom(
      this._http.get<EncuestadoRes[]>(`${ENCUESTAS_END_POINTS.V1}/encuestados`, { params }).pipe(
        map((res) => res.map((r) => dataToEncuestadoFactory(r))),
        tap((enc) => this._encuestados.next(new DataStoredI(enc, new Date()))),
      ),
    );
  }

  public observable() {
    return this._encuestados$;
  }
}
