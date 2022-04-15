function reverseString1(inputStr) {
    let revStr = "";
    for (let letter of inputStr) {
        revStr = letter + revStr;
    }
    return revStr;
}

function reverseString2(inputStr) {
    let revStr = "";
    for (let i = inputStr.length-1; i >= 0; i--) {
        revStr += inputStr[i];
    }
    return revStr;
}

function reverseString3(inputStr) {
    let revStr = "";
    for (let index in inputStr) {
        revStr = inputStr[index] + revStr;
    }
    return revStr;
}

function reverseString4(inputStr) {
    let revStr = "";
    const arr = inputStr.split('');
    arr.forEach((letter) => {
        revStr = letter + revStr;
    })
    return revStr;
}

function reverseString5(inputStr) {
    let revStr = "";
    let index = inputStr.length-1;
    while (index >= 0) {
        revStr += inputStr[index];
        index --;
    }
    return revStr;
}

function reverseString6(inputStr) {
    return inputStr
        .split('')
        .reverse()
        .join('');
}


let testStr = 'Hello world!';
console.log(`1: ${reverseString1(testStr)}`);
console.log(`2: ${reverseString2(testStr)}`);
console.log(`3: ${reverseString3(testStr)}`);
console.log(`4: ${reverseString4(testStr)}`);
console.log(`5: ${reverseString5(testStr)}`);
console.log(`6: ${reverseString6(testStr)}`);
