/* SWITCH FONTS
function getCss( element, property ) {
    return window.getComputedStyle( element, null ).getPropertyValue( property );
}
function getFonts() {
  var fonts = document.getElementsByClassName("font-test");
  for (var i=0; i < fonts.length; i++) {
    fonts[i].addEventListener('click', changeFont, false );
  }    
}
function changeFont() {
    var fonts = [   "Bolby One",
                    "Poller One",
                    "Bolby One SC",
                    "Jacques Francois Shadow",
                    "Open Sans",
                    "Oswald",
                    "Montserrat",
                    "PT Sans Narrow",
                    "Josefin Sans",
                    "Archivo Narrow",
                    "Merriweather Sans",
                    "News Cycle",
                    "Archivo Black" ];
    var currentFont = getCss(this, "font-family");
    var currentIndex = fonts.indexOf(currentFont);
    var nextIndex = currentIndex + 1;
    var nextFont = fonts[nextIndex];
    this.style.setProperty("font-family", nextFont, null);
    return;
}
*/

/* MAKE BOLD */
function siteTitle() {
    var sitetitle = document.getElementById("site-title");
        sitetitle.addEventListener('click', changeWeight, false );
     
}
function changeWeight() {
    this.classList.toggle("bold");

    return;
}


/* EXPAND TABS */
function getExpandTabs() {
  var expandTabs = document.getElementsByClassName("expand-tab");
  for (var i=0; i < expandTabs.length; i++) {
    expandTabs[i].addEventListener('click', toggleExpand, false );
  }
}
function toggleExpand() {
  this.classList.toggle("hide");
  this.nextElementSibling.classList.toggle("visible");
}

/* SIMPLE SLIDER */
function getSliders() {
    var sliders = document.getElementsByClassName("slider");
    console.log(sliders);
    for (var i=0; i < sliders.length; i++) {
        //sliders[i].addEventListener('click', sliderFunctionality, false );
        sliderFunctionality(sliders[i]);
    }
}
function nextSlide() {
    //alert(this.classList + " = nextSlide this.classList");
    var parent = this.parentElement;
    //alert(parent + " = nextSlide parentElement");
    var image = parent.getElementsByTagName("img");
    image = image[0];
    //alert(image.src + " = nextSlide image src");
    var source = image.src;
    var nextImage = getNextImage(source);
    image.src = nextImage;
    
    //var string = source.charAt(35);
    //var number = parseInt(string);
    //number++;
    //image.src="images/staff-" + number + ".png";
}
function getNextImage(string) {
    /*	/[/][\w+][-][\d+][.][\w+]$/	*/
    //alert(string);
    var start = string.search(/(?:\d+)[?:.](?:\w+)$/);
    start = parseInt(start);
    //alert(start);
    var end = string.search(/[?:.](?:\w+)$/);
    end = parseInt(end);
    //alert(end);
    var fileType = string.substr(end);
    //alert(fileType);
    var number = string.slice(start, end);
    number = parseInt(number);
    if (number == 3) {
        number = 1;
    } else {
        number++;
    }
    //alert(number);
    var woo = string.replace(/(?:\d+)[?:.](?:\w+)$/, number + fileType);
    //alert(woo);
    return woo;
}
function previousSlide() {
    var parent = this.parentElement;
    var image = parent.getElementsByTagName("img");
    image = image[0];
    var source = image.src;
    var previousImage = getPreviousImage(source);
    image.src = previousImage;
}
function getPreviousImage(string) {
    var start = string.search(/(\d+)[.](?:\w+)$/);
    start = parseInt(start);
    var end = string.search(/[.](?:\w+)$/);
    end = parseInt(end);
    var fileType = string.substr(end);
    var number = string.slice(start, end);
    number = parseInt(number);
    if (number == 1) {
        number = 3;
    } else {
        number--;
    }
    var woo = string.replace(/(\d+)[.](?:\w+)$/, number + fileType);
    return woo;
}
function sliderFunctionality(element) {
    //alert(element.classList);
    var image = element.querySelectorAll('.slider-image')
    image = image[0];
    var nextControl = element.querySelectorAll('.next-control');
    //var nextControl = element.getElementsByClassName("next-control");
    nextControl = nextControl[0];
    //alert(nextControl.classList + " functionality nextControl class");
    //alert(image.src + " functionality image.src");
    nextControl.addEventListener('click', nextSlide, false );
    //nextControl.bind("click", nextSlide);
    
    var previousControl = element.querySelectorAll('.previous-control');
    previousControl = previousControl[0];
    previousControl.addEventListener('click', previousSlide, false );
    
    /*var previousControl = getPreviousControl();
     * previousControl.addEventListener('click', previousSlide(this), false );*/
}

/**
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
/**
* A self-contained modal library
*/
(function(window, document) {
    "use strict";
    /** Returns whether a value is a dom node */
    function isNode(value) {
        if ( typeof Node === "object" ) {
            return value instanceof Node;
        }
        else {
            return value &&
            typeof value === "object" &&
            typeof value.nodeType === "number";
        }
    }
    /** Returns whether a value is a string */
    function isString(value) {
        return typeof value === "string";
    }
    /**
     * Generates observable objects that can be watched and triggered
     */
    function observable() {
        var callbacks = [];
        return {
            watch: callbacks.push.bind(callbacks),
 trigger: function( modal ) {
     var unprevented = true;
     var event = {
         preventDefault: function preventDefault () {
             unprevented = false;
         }
     };
     for (var i = 0; i < callbacks.length; i++) {
         callbacks[i](modal, event);
     }
     return unprevented;
 }
        };
    }
    /**
     * A small interface for creating and managing a dom element
     */
    function Elem( elem ) {
        this.elem = elem;
    }
    /**
     * Creates a new div
     */
    Elem.div = function ( parent ) {
        var elem = document.createElement('div');
        (parent || document.body).appendChild(elem);
        return new Elem(elem);
    };
    Elem.prototype = {
        /** Creates a child of this node */
        child: function () {
            return Elem.div(this.elem);
        },
 /** Applies a set of styles to an element */
 stylize: function(styles) {
     styles = styles || {};
     if ( typeof styles.opacity !== "undefined" ) {
         styles.filter =
         "alpha(opacity=" + (styles.opacity * 100) + ")";
     }
     for (var prop in styles) {
         if (styles.hasOwnProperty(prop)) {
             this.elem.style[prop] = styles[prop];
         }
     }
     return this;
 },
 /** Adds a class name */
 clazz: function (clazz) {
     this.elem.className += " " + clazz;
     return this;
 },
 /** Sets the HTML */
 html: function (content) {
     if ( isNode(content) ) {
         this.elem.appendChild( content );
     }
     else {
         this.elem.innerHTML = content;
     }
     return this;
 },
 /** Adds a click handler to this element */
 onClick: function(callback) {
     this.elem.addEventListener('click', callback);
     return this;
 },
 /** Removes this element from the DOM */
 destroy: function() {
     document.body.removeChild(this.elem);
 },
 /** Hides this element */
 hide: function() {
     this.elem.style.display = "none";
 },
 /** Shows this element */
 show: function() {
     this.elem.style.display = "block";
 },
 /** Sets an attribute on this element */
 attr: function ( name, value ) {
     this.elem.setAttribute(name, value);
     return this;
 },
 /** Executes a callback on all the ancestors of an element */
 anyAncestor: function ( predicate ) {
     var elem = this.elem;
     while ( elem ) {
         if ( predicate( new Elem(elem) ) ) {
             return true;
         }
         else {
             elem = elem.parentNode;
         }
     }
     return false;
 }
    };
    /** Generates the grey-out effect */
    function buildOverlay( getOption, close ) {
        return Elem.div()
        .clazz("pico-overlay")
        .clazz( getOption("overlayClass", "") )
        .stylize({
            display: "block",
            position: "fixed",
            top: "0px",
            left: "0px",
            height: "100%",
            width: "100%",
            zIndex: 10000
        })
        .stylize(getOption('overlayStyles', {
            opacity: 0.5,
            background: "#000"
        }))
        .onClick(function () {
            if ( getOption('overlayClose', true) ) {
                close();
            }
        });
    }
    /** Builds the content of a modal */
    function buildModal( getOption, close ) {
        
        var width = getOption('width', 'auto');
        if ( typeof width === "number" ) {
            width = "" + width + "%"; //MODIFIED px -> %
        }
        var elem = Elem.div()
        .clazz("pico-content")
        .clazz( getOption("modalClass", "") )
        .stylize({
            display: 'block',
            position: 'absolute',
            zIndex: 10001,
            left: "50%",
            
            width: width,
            '-ms-transform': 'translateX(-50%)',
                 '-moz-transform': 'translateX(-50%)',
                 '-webkit-transform': 'translateX(-50%)',
                 '-o-transform': 'translateX(-50%)',
                 'transform': 'translateX(-50%)'
        })
        .stylize(getOption('modalStyles', {
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "5px"
        }))
        .html( getOption('content') )
        .attr("role", "dialog")
        .onClick(function (event) {
            var isCloseClick = new Elem(event.target)
            .anyAncestor(function (elem) {
                return /\bpico-close\b/.test(elem.elem.className);
            });
            if ( isCloseClick ) {
                close();
            }
        });
        return elem;
    }
    /** Builds the close button */
    function buildClose ( elem, getOption ) {
        if ( getOption('closeButton', true) ) {
            return elem.child()
            .html( getOption('closeHtml', "&#xD7;") )
            .clazz("pico-close")
            .clazz( getOption("closeClass") )
            .stylize( getOption('closeStyles', {
                borderRadius: "2px",
                cursor: "pointer",
                height: "15px",
                width: "15px",
                position: "absolute",
                top: "5px",
                right: "5px",
                fontSize: "16px",
                textAlign: "center",
                lineHeight: "15px",
                background: "#CCC"
            }) );
        }
    }
    /** Builds a method that calls a method and returns an element */
    function buildElemAccessor( builder ) {
        return function () {
            return builder().elem;
        };
    }
    /**
     * Displays a modal
     */
    function picoModal(options) {
        if ( isString(options) || isNode(options) ) {
            options = { content: options };
        }
        var afterCreateEvent = observable();
        var beforeShowEvent = observable();
        var afterShowEvent = observable();
        var beforeCloseEvent = observable();
        var afterCloseEvent = observable();
        /**
         * Returns a named option if it has been explicitly defined. Otherwise,
         * it returns the given default value
         */
        function getOption ( opt, defaultValue ) {
            var value = options[opt];
            if ( typeof value === "function" ) {
                value = value( defaultValue );
            }
            return value === undefined ? defaultValue : value;
        }
        /** Hides this modal */
        function forceClose () {
            shadowElem().hide();
            modalElem().hide();
            afterCloseEvent.trigger(iface);
        }
        /** Gracefully hides this modal */
        function close () {
            if ( beforeCloseEvent.trigger(iface) ) {
                forceClose();
            }
        }
        /** Wraps a method so it returns the modal interface */
        function returnIface ( callback ) {
            return function () {
                callback.apply(this, arguments);
                return iface;
            };
        }
        // The constructed dom nodes
        var built;
        /** Builds a method that calls a method and returns an element */
        function build ( name ) {
            if ( !built ) {
                var modal = buildModal(getOption, close);
                built = {
                    modal: modal,
                    overlay: buildOverlay(getOption, close),
                    close: buildClose(modal, getOption)
                };
                afterCreateEvent.trigger(iface);
            }
            return built[name];
        }
        var modalElem = build.bind(window, 'modal');
        var shadowElem = build.bind(window, 'overlay');
        var closeElem = build.bind(window, 'close');
        var iface = {
            /** Returns the wrapping modal element */
            modalElem: buildElemAccessor(modalElem),
 /** Returns the close button element */
 closeElem: buildElemAccessor(closeElem),
 /** Returns the overlay element */
 overlayElem: buildElemAccessor(shadowElem),
 /** Shows this modal */
 show: function () {
     if ( beforeShowEvent.trigger(iface) ) {
         shadowElem().show();
         closeElem();
         modalElem().show();
         afterShowEvent.trigger(iface);
     }
     return this;
 },
 /** Hides this modal */
 close: returnIface(close),
 /**
  * Force closes this modal. This will not call beforeClose
  * events and will just immediately hide the modal
  */
 forceClose: returnIface(forceClose),
     /** Destroys this modal */
     destroy: function () {
         modalElem = modalElem().destroy();
         shadowElem = shadowElem().destroy();
         closeElem = undefined;
     },
 /**
  * Updates the options for this modal. This will only let you
  * change options that are re-evaluted regularly, such as
  * `overlayClose`.
  */
 options: function ( opts ) {
     options = opts;
 },
 /** Executes after the DOM nodes are created */
 afterCreate: returnIface(afterCreateEvent.watch),
 /** Executes a callback before this modal is closed */
 beforeShow: returnIface(beforeShowEvent.watch),
 /** Executes a callback after this modal is shown */
 afterShow: returnIface(afterShowEvent.watch),
 /** Executes a callback before this modal is closed */
 beforeClose: returnIface(beforeCloseEvent.watch),
 /** Executes a callback after this modal is closed */
 afterClose: returnIface(afterCloseEvent.watch)
        };
        return iface;
    }
    if ( typeof window.define === "function" && window.define.amd ) {
        window.define(function () {
            return picoModal;
        });
    }
    else {
        window.picoModal = picoModal;
    }
}(window, document));

function showModal(content) {
    var scroll = $(document).scrollTop();
    console.log(scroll);
    var modal = picoModal({
        content: content,
        width: 80,
        closeHtml: "<span class='pure-u-1'>x</span>",
        modalStyles: {
            position: "absolute",
            left: "50%",
            top: 50 + scroll + "px",
            backgroundColor: "pink",
            color: "black",
            padding: "20px"
        },
        closeStyles: {
            position: "absolute", 
            top: "-5px", 
            right: "0px",
            color: "white",
            padding: "5px 10px", 
            cursor: "pointer",
        }
    }).show();
} 
function modalFunctionality() {
    var donate = "<div class='pure-u-1-1 opened-modal'><h3 style='text-align: center;'>DONATE!</h3><p>The Barn accepts new or like new quality items for resale. Books, clothing, furniture, jewelry, household and outdoor items, toys and furniture that has been gentry used and is in Ready-To-Sell Condition is welcomed. The items sold here make a difference in the local, national and global charities supported by the Barn's sales. Items unable to be sold are donated to other organizations at our expense.  If in doubt, please donate instead to your favorite local thrift organization; doing so will ensure the maximum dollar amount goes back into our community and world.</p></div>";
    var volunteer = "<div class='pure-u-1-1 opened-modal'><h3 style='text-align: center;'>VOLUNTEER!</h3><p>The Barn is not successful without VOLUNTEERS!  Volunteers help sort new inventory, help with pricing, organize the different sections in the barn, and much more. Volunteers are people who are not members of St. Thomas Church as well as parishioners here.  We work in the barn March through October on the following days:</p><ul><li>Tuesdays: 8-11am</li><li>Thursdays: 5-7pm<li><li>Saturdays: 8am-12pm</li></ul><p>If you are interested in volunteering at the Barn, please contact Katie Palopoli at st.thomasbarninfo@gmail.com, or complete the form below.</p><form action='http://stthomaswhitemarsh.org/wp-includes/process-barnsale-volunteer.php' method='POST'><input type='text' name='name' placeholder='Name'/><input type='tel' name='telephone' placeholder='Telephone'/><input type='email' name='email' placeholder='Email'/><textarea name='comments' placeholder='Message'></textarea><input type='submit' value='Send!' class='submit' /></form></div>";
    var contact = "<div class='pure-u-1-1 opened-modal'><h3 style='text-align: center;'>CONTACT!</h3><p>Your completed form will be sent to st.thomabarninfo@gmail.com<form><input type='text' name='name' placeholder='Name'/><input type='tel' name='telephone' placeholder='telephone'/><input type='email' name='email' placeholder='Email'/><textarea name='message' placeholder='Message'></textarea><input type='submit' value='Send!' class='submit' /></form></p></div>";
    
    var donateModal = document.getElementById("donate-modal");
    donateModal.addEventListener('click', function(e) { showModal(donate); }, false ); 
    
    var volunteerModal = document.getElementById("volunteer-modal");
    volunteerModal.addEventListener('click', function(e) { showModal(volunteer); }, false );
    
    var contactModal = document.getElementById("contact-modal");
    contactModal.addEventListener('click', function(e) { showModal(contact); }, false );   
}


function buttonAnimation() {
    
    $('.button').click(function() {

        $(this).animate({
            'top' : "+=10px" 
        });
    });
    
    $('.button').mouseenter(function() {
        console.log("button hovered");
        $(this).animate({
            'top' : "-=10px" 
        });
    });
    
    $('.button').mouseleave(function() {
        $(this).animate({
            'top' : "+=10px" 
        });
    });
    
}


/*INIT*/
function init() {
  modalFunctionality();  
  getExpandTabs();
  getSliders();
  siteTitle();
  buttonAnimation();
}
