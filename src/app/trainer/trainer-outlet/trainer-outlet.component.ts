import {
  Component,
} from '@angular/core';
import {Router} from '@angular/router';
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

  private _notSaved: boolean = false;

  constructor(private _storageService: StorageService,
              private _router: Router) {
  }

  public saveInFile() {

  }

  public saveTemporary() {
    this._notSaved = false;
    this._storageService.setData(this.dataRecords);
    alert('Dane zostały zapisane');
  }

  public saveData(data: ITransferData) {
    this._notSaved = true;
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

  public goToTester() {
    if (this._notSaved) {
      const agree: boolean = confirm('Dane uczące nie zostały zapisane. Jesteś pewien że chcesz wyjść z Trenera?');
      if (agree === false) {
        return;
      }
    }

    this._router.navigate(['/tester']).then();
  }
}
