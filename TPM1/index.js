var redValue = 0;
var greenValue = 0;
var blueValue = 0;

// window.addEventListener("load", onPageLoad())

// function onPageLoad(){
//     inputRangePickerRed = document.getElementById('redRangePickerValue')
//     inputRangePickerGreen = document.getElementById('greenRangePicker')
//     inputRangePickerBlue = document.getElementById('blueRangePicker')
//     // inputRangePickerRed.addEventListener("keypress", onArrowPress(event , inputRangePickerRed))
//     // inputRangePickerGreen.addEventListener("keypress", onArrowPress(event, inputRangePickerGreen))
//     // inputRangePickerBlue.addEventListener("keypress", onArrowPress(event, inputRangePickerBlue))
// }

// function onArrowPress(event, inputElement){
//     switch(event.keyCode){
//         case 37:
//             inputElement.value = (+(inputElement.value) - 1).toString()
//             break;
//         case 39:
//             inputElement.value = (+(inputElement.value) + 1).toString()
//         default:
//             break;
//     }
// }

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