import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { EditableComponent } from '../editable.component';

@Component({
  selector: 'app-editable-input',
  templateUrl: './editable-input.component.html',
  styleUrls: ['./editable-input.component.scss']
})
export class EditableInputComponent extends EditableComponent implements OnChanges {

  @Input() type = 'text';

  @Input() transformView = value => value;
}
