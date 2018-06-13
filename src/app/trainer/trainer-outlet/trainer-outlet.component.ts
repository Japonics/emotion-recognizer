import {
  Component,
  OnInit
} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ITransferData} from '../../interfaces/transfer-data.interface';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-trainer-outlet',
  templateUrl: './trainer-outlet.component.html',
  styleUrls: ['./trainer-outlet.component.scss']
})
export class TrainerOutletComponent {

  public triggerClear: Subject<boolean> = new Subject<boolean>();
  public triggerSave: Subject<boolean> = new Subject<boolean>();
  public dataRecords: ITransferData[] = [];

  constructor(private _storageService: StorageService) {
  }

  public saveInFile() {

  }

  public saveTemporary() {
    this._storageService.setData(this.dataRecords);
    alert('Dane zostały zapisane');
  }

  public saveData(data: ITransferData) {
    this.dataRecords.push(data);
  }

  public emitSave() {
    this.triggerSave.next(true);
  }

  public clearCanvas() {
    this.triggerClear.next(true);
  }

  public deleteRecord(index: number) {
    this.dataRecords.splice(index, 1);
  }
}
