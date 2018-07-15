var value1 = ''; 			// First number user entered
var value2 = ''; 			// Second number user entered
var SelectedFunc = null; 	// Function button user clicked
var display = document.getElementById('display');
var LastClicked = null;

display.innerHTML = 0;



// Wait for page to load before allowing user to click buttons
document.onreadystatechange = function() {
	if (document.readyState == "interactive") {
		// Initialize buttons
		var buttons = document.getElementsByClassName("key");
		// console.log(buttons);
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener("click", ButtonLogic);
		}
	}
}



function ButtonLogic(evt) {

	var BtnValue = evt.target.innerHTML;

	if ( (0 <= BtnValue && BtnValue <= 9) || BtnValue === '.' ) {
		ProcessNumber(BtnValue);
	}
	else {
		ProcessFunction(BtnValue);
	}

	LastClicked = BtnValue;
	console.log(BtnValue);

}



function ProcessNumber(value) {


	if ( (value == ".") && (SelectedFunc == null) && (value1.toString().indexOf('.') !== -1)) {
		// Do nothing.
	}
	else if ( (value == ".") && (SelectedFunc != null) && (value2.toString().indexOf('.') !== -1)) {
		// Do nothing.
	}
	else {

		// The value (value1 or value2) that we are about to update
		// won't have a duplicate decimal point.

		if (LastClicked == "=") {
			Clear();
		}

		if (SelectedFunc == null) {
			value1 = value1 + value;
			display.innerHTML = value1;
		}

		else {
			value2 = value2 + value;
			display.innerHTML = value2;
		}

	}

}


function ProcessFunction(value) {

	if (value == "AC") {
		Clear();
	}
	else {
		if (value2 != '') {
			Calculate();
		}
		if (value != "=") {
			SelectedFunc = value;
		}
		if (value == "%") {
			Calculate();
		}
		if (value == "\u221A") {
			Calculate();
		}
	}
	console.log('Function clicked: ' + value);

}



function Calculate() {

	var solution = 0;

	// Run: solution = value1 SelectedFunc value2
	switch (SelectedFunc) {
		//div
		case "\xF7":
			solution = Number(value1) / Number(value2);
			break;
		//mult
		case "\xD7":
			solution = Number(value1) * Number(value2);
			break;
		case "-":
			solution = Number(value1) - Number(value2);
			break;
		case "+":
			solution = Number(value1) + Number(value2);
			break;
		//sup
		case "x<sup>y</sup>":
			solution = Math.pow(value1, value2);
			break;
		//rad
		case "\u221A":
			solution = Math.sqrt(value1);
			break;
		case "%":
			solution = Number(value1) / 100;
			break;

		case "=":
			// ???
			break;
		case "AC":
			Clear();
			break;
		default:
			alert("No function selected!");
			break;
	}

	// Update display with solution
	display.innerHTML = solution;

	// Save solution in value1
	value1 = solution;
	value2 = '';
	SelectedFunc = null;


}



function Clear() {

	value1 = '';
	value2 = '';
	SelectedFunc = null;
	display.innerHTML = 0;

}
