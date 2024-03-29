import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

export class EditableComponent implements OnChanges {

  @Input() entity: any;

  @Input() set field(entityField: string) {
    this.entityField = entityField;
    this.setOriginValue();
  }
  @Input() className: string;

  @Input() style: any;

  @Output() entityUpdated = new EventEmitter();

  isActiveInput = false;

  public entityField: string;

  public originalEntityValue: any;

  constructor() { }

  ngOnChanges() {
    this.setOriginValue();
    this.isActiveInput = false;
  }

  updateEntity() {
    const entityValue = this.entity[this.entityField];
    if (entityValue !== this.originalEntityValue) {
      this.entityUpdated.emit({[this.entityField]: this.entity[this.entityField]});
      this.setOriginValue();
    }
    this.isActiveInput = false;
  }

  cancelUpdate() {
    this.isActiveInput = false;
    this.entity[this.entityField] = this.originalEntityValue;
  }

  setOriginValue() {
    this.originalEntityValue = this.entity[this.entityField];
  }
}
