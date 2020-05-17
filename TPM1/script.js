const redRangePicker = document.querySelector("#redRangePicker");
const blueRangePicker = document.querySelector("#blueRangePicker");
const greenRangePicker = document.querySelector("#greenRangePicker");

var redValue = 0;
var greenValue = 0;
var blueValue = 0;

redRangePicker.addEventListener("input", () =>{});
blueRangePicker.addEventListener("input", () =>{});
greenRangePicker.addEventListener("input", () =>{});


function onRangePickerChange(value, idInput){
    document.getElementById(idInput).value = value;
    switch(idInput){
        case 'redRangePickerValue':
            redValue = (+value);
            break;
        case 'greenRangePickerValue':
            greenValue = (+value);
            break;
        case 'blueRangePickerValue':
            blueValue = (+value);
            break;
        default:
            break;
    }
    let redColorHex = redValue > 15 ? redValue.toString(16): '0' + redValue.toString(16);
    let greenColorHex = greenValue > 15 ? greenValue.toString(16): '0' + greenValue.toString(16);
    let blueColorHex = blueValue > 15 ? blueValue.toString(16): '0' + blueValue.toString(16);
    let newColorCanvasBackgroundColor = "#" + redColorHex + greenColorHex + blueColorHex;
    document.getElementById('IdcolorCanvas').style.backgroundColor = newColorCanvasBackgroundColor;
}