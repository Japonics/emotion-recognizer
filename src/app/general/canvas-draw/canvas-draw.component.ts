import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';
import {EMOTIONS} from '../../types/emotions.types';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {ITransferData} from '../../interfaces/transfer-data.interface';

@Component({
  selector: 'app-canvas-draw',
  templateUrl: './canvas-draw.component.html',
  styleUrls: ['./canvas-draw.component.scss']
})
export class CanvasDrawComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() clear: Subject<boolean> = new Subject<boolean>();
  @Input() save: Subject<boolean> = new Subject<boolean>();
  @Output() onSave: EventEmitter<ITransferData> = new EventEmitter<ITransferData>();

  public emotions: any = EMOTIONS;
  public currentEmotion: any = EMOTIONS.smile;

  private _subscriptions: Subscription[] = [];

  static _canvas: any;
  static _width: number;
  static _height: number;
  static _context: any;
  static _prevX: number;
  static _prevY: number;
  static _currX: number;
  static _currY: number;
  static _x: number;
  static _y: number;
  static _flag: boolean;
  static _dot_flag: boolean;
  static _pathWidth: number = 20;

  constructor() {
  }

  public ngOnInit() {
    this._subscriptions.push(this.clear.subscribe(() => {
      CanvasDrawComponent._erase();
    }));

    this._subscriptions.push(this.save.subscribe(() => {
      console.log('save');
      this._save();
    }));
  }

  public ngAfterViewInit() {
    CanvasDrawComponent._canvas = document.getElementById('canvas');
    CanvasDrawComponent._context = CanvasDrawComponent._canvas.getContext('2d');
    CanvasDrawComponent._width = CanvasDrawComponent._canvas.width;
    CanvasDrawComponent._height = CanvasDrawComponent._canvas.height;
    CanvasDrawComponent._context.fillStyle = 'white';
    CanvasDrawComponent._context.fillRect(0, 0, CanvasDrawComponent._canvas.width, CanvasDrawComponent._canvas.height);

    CanvasDrawComponent._canvas.addEventListener('mousemove', function (e) {
      CanvasDrawComponent._find('move', e);
    }, false);
    CanvasDrawComponent._canvas.addEventListener('mousedown', function (e) {
      CanvasDrawComponent._find('down', e);
    }, false);
    CanvasDrawComponent._canvas.addEventListener('mouseup', function (e) {
      CanvasDrawComponent._find('up', e);
    }, false);
    CanvasDrawComponent._canvas.addEventListener('mouseout', function (e) {
      CanvasDrawComponent._find('out', e);
    }, false);
  }

  public ngOnDestroy() {
    this._subscriptions.map(sub => sub.unsubscribe());
  }

  public selectEmotion(emotion) {
    this.currentEmotion = emotion;
  }

  private _save() {
    this.onSave.next({
      binary: 101,
      value: this.currentEmotion.value,
      name: this.currentEmotion.name
    });
  }

  static _draw() {
    CanvasDrawComponent._context.beginPath();
    CanvasDrawComponent._context.moveTo(CanvasDrawComponent._prevX, CanvasDrawComponent._prevY);
    CanvasDrawComponent._context.lineTo(CanvasDrawComponent._currX, CanvasDrawComponent._currY);
    CanvasDrawComponent._context.strokeStyle = CanvasDrawComponent._x;
    CanvasDrawComponent._context.lineWidth = CanvasDrawComponent._y;
    CanvasDrawComponent._context.stroke();
    CanvasDrawComponent._context.closePath();
    console.log('draw');
    // CanvasDrawComponent._context.beginPath();
    // CanvasDrawComponent._context.moveTo(CanvasDrawComponent._x, CanvasDrawComponent._y);
    // CanvasDrawComponent._context.fillStyle = 'black';
    // CanvasDrawComponent._context.arc(
    //   CanvasDrawComponent._x,
    //   CanvasDrawComponent._y,
    //   CanvasDrawComponent._pathWidth,
    //   0,
    //   360);
    // CanvasDrawComponent._context.stroke();
  }

  static _erase() {
    const m = confirm('Wyczyść płótno?');
    if (m) {
      CanvasDrawComponent._context.clearRect(0, 0, CanvasDrawComponent._width, CanvasDrawComponent._height);
      CanvasDrawComponent._context.fillStyle = 'white';
      CanvasDrawComponent._context.fillRect(0, 0, CanvasDrawComponent._canvas.width, CanvasDrawComponent._canvas.height);
    }
  }

  static _find(res, e) {
    if (res === 'down') {
      CanvasDrawComponent._prevX = CanvasDrawComponent._currX;
      CanvasDrawComponent._prevY = CanvasDrawComponent._currY;
      CanvasDrawComponent._currX = e.clientX - CanvasDrawComponent._canvas.offsetLeft;
      CanvasDrawComponent._currY = e.clientY - CanvasDrawComponent._canvas.offsetTop;

      CanvasDrawComponent._flag = true;
      CanvasDrawComponent._dot_flag = true;

      if (CanvasDrawComponent._dot_flag) {
        CanvasDrawComponent._context.beginPath();
        CanvasDrawComponent._context.lineWidth = CanvasDrawComponent._pathWidth;
        CanvasDrawComponent._context.fillStyle = CanvasDrawComponent._x;
        // CanvasDrawComponent._context.fillRect(
        //   CanvasDrawComponent._currX,
        //   CanvasDrawComponent._currY,
        //   CanvasDrawComponent._pathWidth,
        //   CanvasDrawComponent._pathWidth
        // );
        CanvasDrawComponent._context.arc(
          CanvasDrawComponent._currX,
          CanvasDrawComponent._currY,
          CanvasDrawComponent._pathWidth,
          0,
          360,
        );
        CanvasDrawComponent._context.closePath();
        CanvasDrawComponent._dot_flag = false;
      }
    }
    if (res === 'up' || res === 'out') {
      CanvasDrawComponent._flag = false;
    }

    if (res === 'move') {
      if (CanvasDrawComponent._flag) {
        CanvasDrawComponent._prevX = CanvasDrawComponent._currX;
        CanvasDrawComponent._prevY = CanvasDrawComponent._currY;
        CanvasDrawComponent._currX = e.clientX - CanvasDrawComponent._canvas.offsetLeft;
        CanvasDrawComponent._currY = e.clientY - CanvasDrawComponent._canvas.offsetTop;
        CanvasDrawComponent._draw();
      }
    }
  }
}
