let renderValue = '';

const operators = ['+','×','÷','%','-'];
const nonText = ['+','×','÷','%','-','1','2','3','4','5','6','7','8','9','0']
let input = document.querySelector('.js-entered-keys');

document.querySelectorAll('.js-cal-btns').forEach(btn => {
    btn.addEventListener("click", () =>{
        const btnValue = btn.innerHTML;
        checkText();

        if(isOperator(btnValue)){
            forOperators(btnValue);
            renderingIO();
        }else if(btnValue === '0' || btnValue === '00'){
            forZero(btnValue);
            renderingIO();
        }else if(btnValue === '='){
            calculate();
        }else if(btnValue === 'C'){
            renderValue = '';
            renderingIO();
        }else if(btnValue === '←'){
            backspacing();
            renderingIO();
        }else if(btnValue === '.'){
            forDot(btnValue);
            renderingIO();
        }else{
            if(renderValue[renderValue.length-1] === '0' && (renderValue.length === 1 || isOperator(renderValue.charAt(renderValue.length-2)))){
                replaceZeroBy(btnValue);
            }else
                renderValue += btnValue;
            renderingIO();
        }
    });
});

//  || keydown
const numbers = ['1','2','3','4','5','6','7','8','9'];
document.querySelector('body').addEventListener('keydown',() =>{
    checkText();
    if(isNumber(event.key)){
        renderValue += event.key;
        renderingIO();
    }else if(event.key === 'Backspace'){
        backspacing();
        renderingIO();
    }else if(event.key === '='){
        calculate();
    }else if(event.key === '0'){
        forZero(event.key);
        renderingIO();
    }else if(event.key === '.'){
        forDot(event.key);
        renderingIO();
    }else if(event.key === 'c'){
        renderValue = '';
        renderingIO();
    }
});


//  || functions
function renderingIO(){
    input.value = renderValue;
}

function checkText(){
    let count = 0;
    for(let i=0; i<1; i++){
        for(let j=0; j<nonText.length; j++){
            if(renderValue[i] === nonText[j]){
                count++;
            }
        }
        if(count == 0)
            renderValue = "";
    }
}

function isOperator(btnValue){
    for(let i=0; i<operators.length;i++){
        if(operators[i] === btnValue){
            return 1;
        }
    }
    return 0;
}

function forOperators(btnValue){
    if(!(isOperator(renderValue.charAt(renderValue.length-1)))){
        if(renderValue.length > 0)
            renderValue += btnValue;
        else{
            if(btnValue === '-')
                renderValue += btnValue;
        }
    }
}

function isZero(){
    let subStr = '';
    for(let i=renderValue.length-1; i>=0; i--){
        if(!(isOperator(renderValue.charAt(i))))
            subStr += renderValue.charAt(i);
        else
            break;
    }
    let subTotal = '';
    for(let i=subStr.length-1; i>=0; i--)
        subTotal += subStr.charAt(i);
    if(eval(subTotal) === 0)
        return 1;
    else 
        return 0;
}

function forZero(btnValue){
    if(isZero())
        renderValue = renderValue;
    else{
        if(btnValue === '00' && (renderValue.length == 0 || isOperator(renderValue.charAt(renderValue.length-1))))
            renderValue += '0';
        else
            renderValue += btnValue;
    }
}

function replaceZeroBy(btnValue){
    let repStr = '';
    for(let i=0; i<renderValue.length; i++){
        if(i === renderValue.length-1)
            repStr += btnValue;
        else
            repStr += renderValue.charAt(i);
    }
    renderValue = repStr;
}

function forDot(btnValue){
    if(renderValue.length === 0 || isOperator(renderValue.charAt(renderValue.length-1))){
        renderValue += ('0' + btnValue);
    }
    if(renderValue.charAt(renderValue.length-1) === btnValue){
        renderValue = renderValue
    }else
        renderValue += btnValue
}

function backspacing(){
    renderValue = renderValue.substring(0, renderValue.length-1);
}

function calculate(){
    let dupStr = '';
    for(let i=0; i<renderValue.length;i++){
        if(renderValue.charAt(i) === '×'){
            dupStr += '*';
        }else if(renderValue.charAt(i) === '÷'){
            dupStr += '/';
        }/*else if(renderValue.charAt(i) === '%'){
            dupStr += '/100';
        }*/else{
            dupStr += renderValue.charAt(i);
        }
    }
    if(dupStr.length === 0){
        input.value = "Error";
    }else if (isOperator(dupStr.charAt(dupStr.length-1))){// last with operator shows no results
        input.value = dupStr;
    }else{
        renderValue = String((Math.round((eval(dupStr))*100))/100);
        input.value = renderValue;
    }
}


//  || keydown functions
function isNumber(ekey){
    for(let i=0; i<numbers.length; i++){
        if(numbers[i] === ekey){
            return 1;
        }
    }
    return 0;
}