import {
  Component
} from '@angular/core';
import {ITransferData} from '../../interfaces/transfer-data.interface';
import {Subject} from 'rxjs/Subject';
import {StorageService} from '../../services/storage.service';
import * as synaptic from 'synaptic';
import {EMOTIONS} from "../../types/emotions.types";

@Component({
  selector: 'app-tester-outlet',
  templateUrl: './tester-outlet.component.html',
  styleUrls: ['./tester-outlet.component.scss']
})

export class TesterOutletComponent {

  public triggerClear: Subject<boolean> = new Subject<boolean>();
  public triggerSave: Subject<boolean> = new Subject<boolean>();
  public dataRecords: ITransferData = null;
  public currentEmoticon: number = null;
  public notReadData: boolean = true;
  public noLearned: boolean = true;
  public learningData: ITransferData[] = [];
  public isTraining: boolean = false;

  private _perceptron: any = null;

  constructor(private _storageService: StorageService) {
    this._perceptron = new synaptic.Architect.Perceptron(10000, 3, 1);
  }

  public processData(data: ITransferData) {
    this.check(data);
  }

  public emitSave() {
    this.triggerSave.next(true);
  }

  public clearCanvas() {
    this.triggerClear.next(true);
  }

  public readTemporary() {
    this.learningData = this._storageService.getData();
    this.notReadData = false;
  }

  public train() {
    this.isTraining = true;

    setTimeout(() => {
      for (let iteration = 0; iteration < 100; iteration++) {
        for (const record of this.learningData) {
          console.log('iteration: ', this._perceptron.activate(record.binarySet.split('')));
          this._perceptron.propagate(0.3, [record.value]);
        }
      }
    }, 1000);


    setTimeout(() => {
      this.noLearned = false;
      this.isTraining = false;
    }, 1000);
  }

  public check(record: ITransferData) {
    const result = this._perceptron.activate(record.binarySet.split(''))[0];
    console.log('result: ', result);

    if (result <= EMOTIONS.smile.value + 0.125) {
      this.currentEmoticon = EMOTIONS.smile.name;
      return;
    }

    if (result <= EMOTIONS.sad.value + 0.125) {
      this.currentEmoticon = EMOTIONS.sad.name;
      return;
    }

    if (result <= EMOTIONS.sceptic.value + 0.125) {
      this.currentEmoticon = EMOTIONS.sceptic.name;
      return;
    }

    if (result <= EMOTIONS.shocked.value) {
      this.currentEmoticon = EMOTIONS.shocked.name;
      return;
    }
  }
}
