const displayEl = document.querySelector("#display")
const btnElements = document.querySelector("#buttons")
const decimalPointEl = document.querySelector("#decimalPoint")
const prev = document.querySelector("#prev")

function add(a,b){
    return a + b
}
function subtract(a,b){
    return a -b
}
function multiply(a,b){
    return a*b
}
function divide(a,b){
    if(b === 0){
        return "Division by 0 is not allowed!"
    }
    return a/b
}

let num1 = 0
let num2 = 0
let ans
let operations = []



function operate(num1,num2,operation){
      if(operation === "+"){
        return add(num1,num2)
      }else if(operation === "-"){
        return subtract(num1,num2)
      }else if(operation === "/"){
        return divide(num1,num2)
      }else if(operation === "*" || operation === "x"){
        return multiply(num1,num2)
      }else{
        return "OPERATOR İNCORRECT ERR"
      }
}

let clearForNextOperation = false



// Event Listeners
onkeydown = (e) => {
    const numbers = "0123456789"
    if(numbers.split("").includes(e.key)){
        if(clearForNextOperation){
            displayEl.textContent = e.key
            clearForNextOperation = false
        }else{
            displayEl.textContent += e.key
        }

    }
}
displayEl.addEventListener("keydown", onkeydown)

btnElements.addEventListener("click", (e)=> {

    if(e.target.classList.contains("operator")){
        if(operations.length === 1){
          doOperation()
        }
        decimalPointEl.disabled = false
        operations.push(e.target.textContent)
    }

   


    if(e.target.classList.contains("btn")){

        if(e.target.id === "equal"){
            doOperation()
            decimalPointEl.disabled = false
            clearForNextOperation = true
            
        }
        
        else if(e.target.id === "delete"){
            displayEl.textContent  = displayEl.textContent.slice(0, displayEl.textContent.length-1)
        }else if(e.target.id === "clear"){
            ans = 0
            displayEl.textContent = ""
        }else if (e.target.id === "decimalPoint"){
            decimalPointEl.disabled = true

            if(displayEl.textContent){
                console.log("Display content", displayEl.textContent === "")
                displayEl.textContent += e.target.textContent
            }
          
            //displayEl.textContent += e.target.textContent
            
        }
        else{
            if(clearForNextOperation){
                displayEl.textContent = e.target.textContent
                clearForNextOperation = false
            }else{
                displayEl.textContent += e.target.textContent
            }
           
        }
       
    }
   
})


function doOperation(){
    if(operations.length > 0){
        const splitDisplayed =  displayEl.textContent.split(operations[0])
        num1 = +splitDisplayed[0] || ans
        num2= +splitDisplayed[1]
        if(num2){
            ans = operate(num1,num2,operations[0])
            displayEl.textContent= ans

        }
        else{
            displayEl.textContent= num1
        }
       
        operations=[]
       
    }
}