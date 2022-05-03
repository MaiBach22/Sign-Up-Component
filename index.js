const form= document.getElementById("form")
const inputs = document.querySelectorAll("input")

form.addEventListener("submit", (e)=>{
    
    inputs.forEach((input) =>{
        if(!input.value || input.value ==" "){
            input.parentElement.classList.add('eactive')
            e.preventDefault();
        }
        else{
            input.parentElement.classList.remove('eactive')
        
            if(input.type == "email"){
                if(validateEmail(input.type)){
                    input.parentElement.classList.add('eactive')
                    e.preventDefault();
                }
                else{
                    input.parentElement.classList.remove('eactive')
                }
            }
        }
    });
});


function validateEmail(email){
    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(String(email).toLowerCase());
}

