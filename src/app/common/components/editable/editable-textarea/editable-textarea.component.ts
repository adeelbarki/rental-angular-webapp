import { Component, OnChanges, Input } from '@angular/core';
import { EditableComponent } from '../editable.component';

@Component({
  selector: 'app-editable-textarea',
  templateUrl: './editable-textarea.component.html',
  styleUrls: ['./editable-textarea.component.scss']
})
export class EditableTextareaComponent extends EditableComponent implements OnChanges {

  @Input() rows: string;

  @Input() cols: string;
}
