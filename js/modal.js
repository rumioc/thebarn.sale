/* MODAL */

function showModal() {
    var modal = picoModal({
    content: "<div class='pure-u-1-1'><h3 style='text-align: center;'>Guest Preacher:<br/>The Rev. Dr. J. Barrie Shepherd</h3><p>The former Senior Minister of the First Presyterian Church of New York, noted author and poet, the Rev. Dr. J. Barrie Shepherd has written extensively in the area of spirituality and religious studies. A native of Great Britain and a Royal Air Force veteran, Shepherd is a graduate of the University of Edinburgh (Scotland), Yale Divinity School, Yale Graduate School and The Hartford Theological Seminary.</p></div>",
    closeHtml: "<span class='pure-u-1'>x</span>",
    modalStyles: {
      position: "absolute",
      left: "50%",
      top: (50 + document.body.scrollTop) + "px",
      backgroundColor: "#f55353",
      color: "white",
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
    // for each iterates over a list and runs a function for each element
    var forEach = Array.prototype.forEach,
    // query selector all runs a CSS selector and returns a list of elements
    // matching the selector
    $$ = document.querySelectorAll.bind(document);

    // for each element in the list returned by the CSS selector    
    forEach.call($$('.modal'), function(v) {
    // add an event listener to the click event
    v.addEventListener('click', function(e) {
    // and run some event handling code.   
    showModal(); 
  }, false);
});