import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { CamelizePipe } from 'ngx-pipes';

import { MapService } from './map.service';


@NgModule({
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'pk.eyJ1IjoiYWRlZWxiYXJraSIsImEiOiJjanh1cGhzZzkxN20wM2JxbTdrNzRqMTBqIn0.gpclIl2OVMyCwIZdAuKxGg'
    }),
    CommonModule
  ],
  providers: [
    MapService,
    CamelizePipe
  ]
})
export class MapModule { }
