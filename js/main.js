
var makeSS = function (el) {
    "use strict";
    // collection of all slides
    var $slideshows = document.querySelectorAll(el),
        
        $slideshow = {},
        
        Slideshow = {
            init: function (el) {
                
                // keep track of current slide
                this.counter = 0;
                
                this.el = el;
                
                // collection of all individual slides
                this.$items = el.querySelectorAll('figure');
                
                // total number of slides
                this.numItems = this.$items.length;
                
                // set class so first slide is visible
                this.$items[0].classList.add('show');
                
                this.injectControls(el);
                
                this.addEventListeners(el);
            
            },
            showCurrent: function (i) {
            
                if (i > 0) {
                    this.counter = (this.counter + 1 === this.numItems) ? 0 : this.counter + 1;
                } else {
                    this.counter = (this.counter - 1 < 0) ? this.numItems - 1 : this.counter - 1;
                }
                
                [].forEach.call(this.$items, function (el) {
                    el.classList.remove('show');
                });
                
                this.$items[this.counter].classList.add('show');
            
            },
            injectControls: function (el) {
                
                var spanPrev = document.createElement("span"),
                    spanNext = document.createElement("span"),
                    docFrag = document.createDocumentFragment();

                /* add classes */
                spanPrev.classList.add('prev');
                spanNext.classList.add('next');

                /* add contents */
                spanPrev.innerHTML = '&laquo;';
                spanNext.innerHTML = '&raquo;';

                /* append the new elements to a document fragment [1]
                   then append the fragment to the DOM */
                docFrag.appendChild(spanPrev);
                docFrag.appendChild(spanNext);
                el.appendChild(docFrag);
               
                
            },
            addEventListeners: function (el) {
                var that = this;
                
                el.querySelector('.next').addEventListener('click', function () {
                    that.showCurrent(1);
                }, false);
                
                el.querySelector('.prev').addEventListener('click', function () {
                    that.showCurrent(-1);
                }, false);
            }
        };
    
    [].forEach.call($slideshows, function (el) {
    
        $slideshow = Object.create(Slideshow);
        $slideshow.init(el);
    });

};

makeSS('.demo1');