import {Injectable} from '@angular/core';
import {ITransferData} from '../interfaces/transfer-data.interface';

@Injectable()
export class StorageService {

  private _data: ITransferData[] = [];

  constructor() {
  }

  public setData(data: ITransferData[]) {
    this._data = data;
  }

  public getData(): ITransferData[] {
    return this._data;
  }
}
