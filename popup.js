document.addEventListener('DOMContentLoaded', function() {

	// make variable for the input field and the start button
	var input = document.getElementById('input');
	var start = document.getElementById('start');
	var isInputVisible = false;

	// initially hide the input field
	input.style.visibility = 'hidden';



	// listener when the start button is selected
	start.addEventListener('click', function() {
		/*if (isInputVisible == false) {

			// shows input
			input.style.visibility = 'visible';
			input.focus();
			input.placeholder = "Enter topic here...";

			// sets the input to be visible
			isInputVisible = true;
		}
		else {
		    var url = 'http://semantic-link.com/#/' + input.value;
            var req = new XMLHttpRequest();
            req.open('GET', url, false);
            req.send(null);
            if(req.status = 200) {
                dump(req.responseText);
            }

		}*/
		chrome.tabs.getSelected(null, function(tab) {
			d = document;
			if (isInputVisible == false) {

				// shows input
				input.style.visibility = 'visible';
				input.focus();
				input.placeholder = "Enter topic here...";

				// sets the input to be visible
				isInputVisible = true;
			}
			else {
			    var url = 'http://semantic-link.com/#/' + input.value;
				var f = d.createElement('form');
				f.action = url;
				f.method = 'post';
				var i = d.createElement('input');
				i.type = 'hidden';
				i.name = 'url';
				i.value = tab.url;
				f.appendChild(i);
				d.body.appendChild(f);
				f.submit();
			}
		});
	}, false);
}, false);