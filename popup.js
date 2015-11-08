document.addEventListener('DOMContentLoaded', function() {
	// make variable for the input field and the start button
	var input = document.getElementById('input');
	var start = document.getElementById('start');
	var isInputVisible = false;
	var keywords; //the array of keywords
	var count = 0;
	// var isAlreadyClicked = false;

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
				// console.log(keywords.length);
				// console.log(keywords[0].v);
				// console.log(keywords[1].v);
			}
			else {
				keywords = new Array(1);
				keywords[0] = input.value;
				// console.log(keywords[0]);
				// console.log(keywords.length);
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
			count = 0;
			var text = xhr.responseText;
			text = text.toLowerCase();
			//check input.value first, then iterate through keywords
			//if any keywords are found in the text, break the loop
			//console.log(text);
			if (text.indexOf(input.value) != -1) {
				count++;
			}
			if (keywords.length > 0) {
				var i;
				for (i = 0; i < keywords.length; i++) {
					//word found, break loop, else keep going
					if (text.indexOf(" " + keywords[i].v) != -1) {
						console.log(keywords[i].v);
						count++;
					}
				}
			}
			console.log(count);
		};

		xhr.onerror = function() {
			alert('Woops, there was an error making the request.');
		};

		xhr.send();
	} 



	// listener when the start button is selected
	start.addEventListener('click', function() {
		// if (isAlreadyClicked == false) {
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
					//Removes http:// or https://
					var tmp = url_2.replace("http://", "");
					tmp = url_2.replace("https://", "");
					var tmp2 = "http://cors.io/?u=http://www.textise.net/showText.aspx?strURL=http%253A//" + tmp;
					console.log(tmp2);
					makeCorsRequest();
					makeCorsRequest2(tmp2);
					// isAlreadyClicked = true;
				}
			});
		// }
	}, false);
}, false);