import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AbiFormDirective } from '../directives/abiform.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from 'src/services/data.service';
import { AbiWrapperComponent } from './abi-wrapper/abi-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    AbiFormDirective,
    AbiWrapperComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
