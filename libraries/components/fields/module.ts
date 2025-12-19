import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TsdTextFieldComponent } from './text-field/component';
import { TsdAutoCompleteFieldComponent } from './auto-complete-field/component';
import { TsdRemoteAutoCompleteFieldComponent } from './remote-auto-complete-field/component';
import { TsdSelectFieldComponent } from './select-field/component';

const components = [
  FormsModule,
  ReactiveFormsModule,
  TsdTextFieldComponent,
  TsdAutoCompleteFieldComponent,
  TsdRemoteAutoCompleteFieldComponent,
  TsdSelectFieldComponent,
];

@NgModule({
  imports: components,
  exports: components,
})
export class TsdFieldsModule {}
