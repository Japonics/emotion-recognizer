import {
  Component
} from '@angular/core';
import {ITransferData} from '../../interfaces/transfer-data.interface';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-tester-outlet',
  templateUrl: './tester-outlet.component.html',
  styleUrls: ['./tester-outlet.component.scss']
})

export class TesterOutletComponent {

  public triggerClear: Subject<boolean> = new Subject<boolean>();
  public triggerSave: Subject<boolean> = new Subject<boolean>();
  public dataRecords: ITransferData = null;

  public saveData(data: ITransferData) {
    this.dataRecords = data;
  }

  public emitSave() {
    this.triggerSave.next(true);
  }

  public clearCanvas() {
    this.triggerClear.next(true);
  }
}
