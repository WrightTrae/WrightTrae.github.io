import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParallaxDirective } from './parallax.directive';
import { TypewriterDirective } from './typewriter.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule} from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    ParallaxDirective,
    TypewriterDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatRippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
