import { Component, OnInit } from '@angular/core';
import { EditableComponent } from '../editable.component';

@Component({
  selector: 'app-editable-image',
  templateUrl: './editable-image.component.html',
  styleUrls: ['./editable-image.component.scss']
})
export class EditableImageComponent extends EditableComponent {

  handleImageUpload(imageUrl: string) {
    this.entity[this.entityField] =  imageUrl;
    this.updateEntity();
  }

  handleImageToContainer() {
    this.isActiveInput = true;
  }

  handleImageError() {
    this.cancelUpdate();
  }
}
