import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appTypewriter]'
})
export class TypewriterDirective implements AfterViewInit {

	loopNum = 0;
	txt = "";
	isDeleting = false;
	elementRef;
	subString = "";
	subMatch = false;
  @Input('rotatedWords') rotatedWords;
  @Input('period') period;

  constructor(private eleRef : ElementRef) { 
  	this.elementRef = eleRef;
  }

 	ngAfterViewInit(){
 		// if (this.rotatedWords.length >= 2) {
 		// 	this.doStartTheSame(this.rotatedWords[0], this.rotatedWords[1]);
 		// }
 		this.typeW();

    // Inject css for cursor at end of line
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
	}

	// This is ran for every character in the words that were passed in eg- E Ex Exa Exam Examp Exampl Example ...
  typeW(inSubString?: string, index?: number){
		var i = this.loopNum % this.rotatedWords.length;
    var matchingSubString = inSubString;
    var newMatch = false;
    var oldMatch = matchingSubString && matchingSubString != '';
    var fullTxt = this.rotatedWords[i];

    if(!this.isDeleting && oldMatch){
    	fullTxt = fullTxt.substring(matchingSubString.length, fullTxt.length);
    }

    if (this.isDeleting) {
    	const subOldWord = fullTxt.substring(0, this.txt.length - 1);
    	const nextWord = this.rotatedWords[i+1] || this.rotatedWords[0];
			const subNextWord = nextWord.substring(0, this.txt.length - 1);

			// Compare current word against next word to see if we can skip deleting the rest.
			if(subOldWord === subNextWord){
				matchingSubString = subNextWord;
				newMatch = true;
			}
    	this.txt = subOldWord;
    } else {
	    this.txt = ((matchingSubString || "")+fullTxt).substring(0, this.txt.length+1);
    }

  	// Replace the text
  	this.elementRef.nativeElement.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    // How long before it starts 'typing' again
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { 
    	delta /= 2; 
    }
    if (!this.isDeleting && this.txt === (oldMatch ? matchingSubString + fullTxt : fullTxt)) {
	    delta = this.period;
	    this.isDeleting = true;
    } else if ((this.isDeleting && this.txt === '')||newMatch) {
    	// The word is done being deleted, get ready for next word
    	if(!newMatch){
    		matchingSubString = '';
    	}
	    this.isDeleting = false;
	    this.loopNum++;
	    delta = 500;
    }

    setTimeout(
    	() => {
    		that.typeW(matchingSubString);
    }, delta);
	}


/* ALTERNATIVE
//////////////
		  // type one text in the typwriter
  // keeps calling itself until the text is finished
  typeWriter(text, i, fnCallback) {
    // chekc if text isn't finished yet
    if (i < (text.length)) {
      // add next character to h1
     document.querySelector("h1").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';

      // wait for a while and call this function again for next character
      setTimeout(
      () => {
        this.typeWriter(text, i + 1, fnCallback)
      }, 100);
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == 'function') {
      // call callback after timeout
      setTimeout(fnCallback, 700);
    }
  }

    // start a typewriter animation for a text in the dataText array
   startTextAnimation(i) {
     if (typeof this.dataText[i] == 'undefined'){
        setTimeout(
        () => {
          this.startTextAnimation(0);
        }, 20000);
     }
     // check if dataText[i] exists
    if (i < this.dataText[i].length) {
      // text exists! start typewriter animation
     this.typeWriter(this.dataText[i], 0, () => {
       // after callback (and whole text has been animated), start next text
       this.startTextAnimation(i + 1);
     });
    }
  }
  */

}
