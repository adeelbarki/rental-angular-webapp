import { Component, EventEmitter, Output } from '@angular/core';
import { ImageUploadService } from './image-upload.service';

import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';


class FileSnippet {

  static readonly IMAGE_SIZE = {width: 950, height: 720};

  pending = false;
  status = 'INIT';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

  @Output() imageUploaded = new EventEmitter();
  @Output() imageError = new EventEmitter();
  @Output() imageLoadedToContainer = new EventEmitter();
  @Output() croppingCancelled = new EventEmitter();

  selectedFile: FileSnippet;
  imageChangedEvent: any;

  constructor(private imageService: ImageUploadService,
              private toastr: ToastrService) { }

  private onSuccess(imageUrl: string) {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'OK';
    this.imageChangedEvent = null;
    this.imageUploaded.emit(imageUrl);
  }

  private onFailure() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'FAIL';
    this.imageChangedEvent = null;
    this.imageError.emit('');
  }

  imageCropped(file: File): FileSnippet | File {
    if (this.selectedFile) {
      return this.selectedFile.file = file;
    }

    return this.selectedFile = new FileSnippet('', file);
  }

  imageLoaded() {
    this.imageLoadedToContainer.emit();
  }

  cancelCropping() {
    this.imageChangedEvent = null;
    this.croppingCancelled.emit();
  }

  processFile(event: any) {
    this.selectedFile = undefined;

    const URL = window.URL;
    let file: any;
    let img: any;

    if ((file = event.target.files[0]) && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      img = new Image();

      const self = this;

      img.onload = function() {
        if (this.width > FileSnippet.IMAGE_SIZE.width && this.height > FileSnippet.IMAGE_SIZE.height) {
          self.imageChangedEvent = event;
        } else {
          self.toastr.error(`Min width is ${FileSnippet.IMAGE_SIZE.width} and min length is ${FileSnippet.IMAGE_SIZE.height}`, 'Error!');
        }
      };

      img.src = URL.createObjectURL(file);
    } else {
      this.toastr.error('Unsupported File type. Use only jpeg or png', 'Error!');
    }
  }

  uploadImage() {

    if (this.selectedFile) {
      const reader = new FileReader();

      reader.addEventListener('load', (event: any) => {
        this.selectedFile.src = event.target.result;
        this.selectedFile.pending = true;

        this.imageService.uploadImage(this.selectedFile.file)
          .subscribe((imageUrl: string) => {
            this.onSuccess(imageUrl);
          }, (errorResponse: HttpErrorResponse) => {
            this.toastr.error(errorResponse.error.errors[0].detail, 'Error!');
            this.onFailure();
          });
      });
      reader.readAsDataURL(this.selectedFile.file);
    }
  }
}
