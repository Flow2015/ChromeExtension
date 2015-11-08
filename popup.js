document.addEventListener('DOMContentLoaded', function() {

	// make variable for the input field and the start button
	var input = document.getElementById('input');
	var start = document.getElementById('start');
	var isInputVisible = false;

	// initially hide the input field
	input.style.visibility = 'hidden';

	// Create the XHR object.
	function createCORSRequest(method, url) {
	 var xhr = new XMLHttpRequest();
  	 if ("withCredentials" in xhr) {
   	  // XHR for Chrome/Firefox/Opera/Safari.
   	  xhr.open(method, url, true);
 	 } else if (typeof XDomainRequest != "undefined") {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open(method, url);
     } else {
      // CORS not supported.
      xhr = null;
     }
  	 return xhr;
	}

	// Helper method to parse the title tag from the response.
	function getTitle(text) {
  	 return text.match('<title>(.*)?</title>')[1];
	}

	// Make the actual CORS request.
function makeCorsRequest() {
  // All HTML5 Rocks properties support CORS.
  // var url = 'http://cors.io/?u=http://en.wikipedia.org/wiki/Volcano';
  var url = 'http://cors.io/?u=http://semantic-link.com/related.php?word=' + input.value;

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  // was onload

  xhr.onload = function() {
    var text = xhr.responseText;
    // var title = getTitle(text);
    // alert('Response from CORS request to ' + url + ': ' + title);
    // console.log('success' + text);

    var obj = JSON.parse(text);
    if (obj.length != 0) {
    	console.log(obj.length);
    	console.log(obj[1].v);
    	console.log(obj[2].v);
    }
    else {
    	obj = input.value;
    	console.log(obj);
    }
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}

	// listener when the start button is selected
	start.addEventListener('click', function() {
		if (isInputVisible == false) {

			// shows input
			input.style.visibility = 'visible';
			input.focus();
			input.placeholder = "Enter topic here...";

			// sets the input to be visible
			isInputVisible = true;
		}
		else {
		    // var url = 'http://semantic-link.com/#/' + input.value;
		    // console.log(input.value);
		    // $.ajax({
		    // 	type: "GET",
		    // 	url: url,
		    // 	async: false,
		    // 	cache: false,
		    // }).done(function(response){
		    // 	console.log(response);
		    // });
			makeCorsRequest();

            // var req = new XMLHttpRequest();
            // req.open('GET', url, false);
            // req.send(null);
            // if(req.status == 200) {
            //     dump(req.responseText);
            //     console.log(req);
            // }

   //          var ua = navigator.userAgent.toLowerCase();
			// if (!window.ActiveXObject)
  	// 			req = new XMLHttpRequest();
			// else if (ua.indexOf('msie 5') == -1)
  	// 			req = new ActiveXObject("Msxml2.XMLHTTP");
			// else
  	// 			req = new ActiveXObject("Microsoft.XMLHTTP");

		}
		// chrome.tabs.getSelected(null, function(tab) {
		// 	d = document;
		// 	if (isInputVisible == false) {

		// 		// shows input
		// 		input.style.visibility = 'visible';
		// 		input.focus();
		// 		input.placeholder = "Enter topic here...";

		// 		// sets the input to be visible
		// 		isInputVisible = true;
		// 	}
		// 	else {
		// 	    var url = 'http://semantic-link.com/#/' + input.value;
		// 		var f = d.createElement('form');
		// 		f.action = url;
		// 		f.method = 'post';
		// 		var i = d.createElement('input');
		// 		i.type = 'hidden';
		// 		i.name = 'url';
		// 		i.value = tab.url;
		// 		f.appendChild(i);
		// 		d.body.appendChild(f);
		// 		f.submit();


		// 	}
		// });
	}, false);
}, false);