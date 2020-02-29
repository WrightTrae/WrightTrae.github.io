import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group,
  animateChild,
  query
} from '@angular/animations';


@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.scss'],
animations:[
    trigger('isLoaded', [
      // ...
      state('loaded', style({
        height: '25px',
        opacity: 1
      })),
      state('notLoaded', style({
        height: '0px',
        opacity: 0
      })),
      transition('notLoaded => loaded', [
	  	group([
	    	query('@rightArrow', animateChild()),
	    	query('@leftArrow', animateChild()),
	    	animate('500ms')
	  	]),
	  ]),
    ]),
    trigger('rightArrow', [
      state('down', style({
      	transform: 'translate(5px, 0px) rotate(-45deg) '
      })),
      state('up', style({
      	transform: 'translate(-12px, 0px) rotate(45deg) '
      })),
      transition('* <=> *', [
        animate('250ms')
      ]),
    ]),
    trigger('leftArrow', [
      state('down', style({
        transform: 'translate(-5px, 0px) rotate(45deg)'
      })),
      state('up', style({
      	transform: 'translate(12px, 0px) rotate(-45deg) '
      })),
      transition('* <=> *', [
        animate('250ms')
      ]),
    ])
  ]
})
//

export class AppComponent implements OnInit, AfterViewInit {
	title = 'WrightPortfolio';
	isLoaded;
	arrowDirection;
	elemRef;

	constructor(elemRef: ElementRef){
		this.elemRef = elemRef;
	}

	ngOnInit() {
		this.elemRef.nativeElement.ownerDocument.body.style.backgroundColor = '#007BBF';
		window.onscroll = function() {
			var currentScrollPos = window.pageYOffset;
			if(currentScrollPos < 100){
				this.arrowDirection = "down"; 
			}else{
				this.arrowDirection = "up";
			}
			// if(currentScrollPos < 25){
			// document.getElementById("toolbar").style.top = "0";
			// this.prevScrollpos = currentScrollPos;
		}.bind(this);
	}

	ngAfterViewInit(){
  		setTimeout(
  		()=>{ 
  			this.isLoaded = true;
  			this.arrowDirection = "down" 
  		}, 250);
	}
}
