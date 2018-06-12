import {
  Component,
  OnInit
} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ITransferData} from '../../interfaces/transfer-data.interface';

@Component({
  selector: 'app-trainer-outlet',
  templateUrl: './trainer-outlet.component.html',
  styleUrls: ['./trainer-outlet.component.scss']
})
export class TrainerOutletComponent implements OnInit {

  public triggerClear: Subject<boolean> = new Subject<boolean>();
  public triggerSave: Subject<boolean> = new Subject<boolean>();
  public dataRecords: ITransferData[] = [];

  constructor() {
  }

  public ngOnInit() {

  }

  public saveData(data: ITransferData) {
    this.dataRecords.push(data);
    console.log('data', data);
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
