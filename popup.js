document.addEventListener('DOMContentLoaded', function() {

	// make variable for the input field and the start button
	var input = document.getElementById('input');
	var start = document.getElementById('start');
	var isInputVisible = false;

	// initially hide the input field
	input.style.visibility = 'hidden';



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
		    var url = 'http://semantic-link.com/#/' + input.value;
            var req = new XMLHttpRequest();
            req.open('GET', url, false);
            req.send(null);
            if(req.status = 200) {
                dump(req.responseText);
            }

		}
	}, false);
}, false);