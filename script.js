let memory = []; 
//memory[0] holds the previous number, memory[1] holds the operator, 
//memory[2] is to act as a flag for parsing the decimal place and memory[3] is a flag to compute the outcome
//memory[5] is just a buffer;
let screen = document.querySelector('.screen');

function compute (input) {
    if (typeof(input) == 'number') {
        //if decimal flag on, add the input at the back
        if(memory[2]) {
            input = parseFloat(screen.textContent.toString() + input);
            console.log(memory);
            updateScreen(input);
            memory[2] = null;
            return;
        }

        //if operator flag is off, add the input at the back
        else if(!memory[1]) {
            //if the screen is blank then add input
            if (!screen.textContent) {
                updateScreen(input);
                console.log(memory);
                return;
            }
            //else if the screen is filled then add input at the back 
            else {
                input = parseFloat(screen.textContent.toString() + `${input}`);
                updateScreen(input);
                console.log(memory);
                return;
            }
        }

        //if operator flag is on then clear screen and add input
        else {
            //if theres something stored in memory, means that the number being inputted is not the first number on the screen
            if (memory[0]) {
                input = parseFloat(screen.textContent.toString() + `${input}`);
                updateScreen(input);
            } else {
                //  user presses a number after pressing an operator, screen clears and input number is shown
                memory[0] = screen.textContent;
                updateScreen(input);
            }

        }
    }

    if (memory[3]) {
        let result = 0;

        if (memory[1] == "+"){
            result = add(screen.textContent);
        }
        else if (memory[1] == "-"){
            result = subtract(screen.textContent);
        }
        else if (memory[1] == "*"){
            result = multiply(screen.textContent);
        }
        else if (memory[1] == "/"){
            result = divide(screen.textContent);
        }

        if (memory[3] == "==") {
            memory = [];
        }
        return updateScreen(result);

    }

    // else use mem[1] as a flag
    else if (input == "+"){
        if (memory[1]) {
            memory[3] = "=";
            compute(screen.textContent);
            memory[1] = "+";
        }
        else {
            memory[1] = "+";
            return;
        }
    }
    else if (input == "-"){
        if (memory[1]) {
            memory[3] = "=";
            compute(screen.textContent);
            memory[1] = "-";
        } 
        else {
            memory[1] = "-";
            return;
        }
    }
    else if (input == "*"){
        if (memory[1]) {
            memory[3] = "=";
            compute(screen.textContent);
            memory[1] = "*";
        } 
        else {
            memory[1] = "*";
            return;
        }
    }
    else if (input == "/"){
        if (memory[1]) {
            memory[3] = "=";
            compute(screen.textContent);
            memory[1] = "/"
        } 
        else {
            memory[1] = "/";
            return;
        }
    }
    else if (input == "."){
        let result = deci();
        return updateScreen(result);
    }
    else if (input == "del"){
        let result = del();
        return updateScreen(result);
    }
    // if = is pressed compute what is shown on screen plus what is stored in memory
    else if (input == "=") {
        
        memory[3] = "==";
        result = screen.textContent;
        compute(result);
    }
    else if (input == "clear") {
        memory[1] == "clear";
        let result = clear();
        return updateScreen(result);
    } 
    else {
        return;
    }
}

function add (input) {
    input =  parseFloat(memory[0]) + parseFloat(input);
    memory[0] = null;
    return input;
}

function subtract (input) {
    input =  parseFloat(memory[0]) - parseFloat(input);
    memory[0] = null;
    return input;
}

function multiply (input) {
    input =  parseFloat(memory[0]) * parseFloat(input);
    memory[0] = null;
    return input;
}

function divide (input) {
    input =  parseFloat(memory[0]) / parseFloat(input);
    memory[0] = null;
    return input;
}

function deci () {
    result = screen.textContent.toString() + `.`;
    memory[2] = ".";
    return result;
}

function del () {
    result = screen.textContent.toString().slice(0,-1);
    return result;
}

function clear () {
    memory = [];
    return 0;
}

function updateScreen (result) {
    screen.textContent = result;
    memory[3] = null;
    console.log(memory);
}