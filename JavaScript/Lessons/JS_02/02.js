
function pow2() {
	var a = document.getElementById('number').value;
	document.getElementById('result').innerHTML = a * a;
}

function eqv() {
	var num1 = parseInt(document.getElementById('num1').value);
	var num2 = parseInt(document.getElementById('num2').value);
	//var res = +num1 + +num2;
	var res = num1 + num2;
	document.getElementById('sum1').innerHTML = res;

	//document.getElementById('num3').value = res;

	var num3 = parseInt(document.getElementById('num3').value);
	if(res == num3) {
		document.getElementById('sum').innerHTML = "Значения равны";
	} else {
		document.getElementById('sum').innerHTML = "Значения НЕ равны";
	}
}
