document.addEventListener('DOMContentLoaded', function() {

	// make variable for the input field and the start button
	var input = document.getElementById('input');
	var start = document.getElementById('start');
	var isInputVisible = false;
	var keywords; //the array of keywords

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

		keywords  = JSON.parse(text);
		if (keywords.length >= 5) {
			console.log(keywords.length);
			console.log(keywords[1].v);
			console.log(keywords[2].v);
		}
		else {
			keywords = new Array(1);
			keywords[0] = input.value;
			console.log(keywords[0]);
			console.log(keywords.length);
		}
		};

		xhr.onerror = function() {
			alert('Woops, there was an error making the request.');
		};

		xhr.send();
	}

	function makeCorsRequest2(url) {
		var xhr = createCORSRequest('GET', url);
		if (!xhr) {
			alert('CORS not supported');
			return;
		}
		xhr.onload = function() {
		var text = xhr.responseText;
		console.log("TEST " + text);
		//SOMETHING SOMETHING SOMETHING
		};

		xhr.onerror = function() {
			alert('Woops, there was an error making the request.');
		};

		xhr.send();
	} 

	// listener when the start button is selected
	start.addEventListener('click', function() {
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			if (isInputVisible == false) {
				// shows input
				input.style.visibility = 'visible';
				input.focus();
				input.placeholder = "Enter topic here...";

				// sets the input to be visible
				isInputVisible = true;
			}
			else {
				var url_2 = tabs[0].url;
				var tmp = url_2.replace("http://", "");
				var tmp2 = "http://www.textise.net/showText.aspx?strURL=http%253A//" + tmp;
				makeCorsRequest();
				makeCorsRequest2(tmp2);
			}
		});
	}, false);
}, false);