import { NgModule } from '@angular/core';
import { SortByStatusPipe } from './sort-by-status.pipe';
import { StatusToIconPipe } from './status-to-icon.pipe';
import { StatusToColorPipe } from './status-to-color.pipe';
import { StatusToInfotextPipe } from './status-to-infotext.pipe';


@NgModule({
  exports: [
    StatusToIconPipe,
    StatusToColorPipe,
    SortByStatusPipe,
    StatusToInfotextPipe
  ],
  declarations: [
    SortByStatusPipe,
    StatusToIconPipe,
    StatusToColorPipe,
    StatusToInfotextPipe
  ]
})
export class EventPipesModule {
}
