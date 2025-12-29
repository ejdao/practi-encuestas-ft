import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TsdTextFieldComponent } from './text-field/component';
import { TsdAutocompleteFieldComponent } from './autocomplete-field/component';
import { TsdRemoteAutocompleteFieldComponent } from './remote-autocomplete-field/component';
import { TsdSelectFieldComponent } from './select-field/component';
import { TsdDateFieldComponent } from './date-field/component';

const components = [
  FormsModule,
  ReactiveFormsModule,
  TsdTextFieldComponent,
  TsdAutocompleteFieldComponent,
  TsdRemoteAutocompleteFieldComponent,
  TsdSelectFieldComponent,
  TsdDateFieldComponent,
];

@NgModule({
  imports: components,
  exports: components,
})
export class TsdFieldsModule {}
