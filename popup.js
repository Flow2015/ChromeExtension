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
		else { // once the input it visible, take its values when pressed again and do...

		}
	}, false);
}, false);