export function validatorInput(input){
    const inputType = input.dataset.type
    if(validators[inputType]){
        validators[inputType](input)
    }
    console.log(input.parentElement)
    if(input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = " "
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = showErrorMessage(inputType, input)
    }
}

const typesOfErrors =[
    "valueMissing",
    "patternMismatch",
    "customError",
    "typeMismatch"
]

const msjError = {
    name: {
        valueMissing: "Este campo nombre no puede estar sin completar",
    },
    email:{
        valueMissing: "El campo email no puede estar vacio",
        typeMismatch: "El correo no es valido",
    },
    password: {
        valueMissing: "Este campo de la contrase;a no puede estar sin completar",
        patternMismatch: "De seis a 8 caracteres, al menos una letra y un número"
    },
    birthdate: {
        valueMissing: "Este campo de la fecha de nacimiento no puede estar sin completar",
        customError: "Debes tener por lo menos 18  de edad",
    },
    phone:{
        valueMissing: "Este campo del numero de telefono no puede estar sin completar",
        patternMismatch: "Debes ingresar 10 numeros (ej: xxxxxxxxxx)",
    },
    address:{ 
        valueMissing: "Este campo de direccion no puede estar sin completar",
        patternMismatch: "Este campo debe tener de 5 a 40 caracteres",
    },
    city:{ 
        valueMissing: "Este campo de ciudad no puede estar sin completar",
        patternMismatch: "Este campo debe tener de 3 a 15 caracteres",
    },
    province:{ 
        valueMissing: "Este campo de provincia/estado no puede estar sin completar",
        patternMismatch: "Este campo debe tener de 3 a 15 caracteres",
    },
}

const validators ={
    birthdate: (input) => verifyBirthdate(input),
}

function showErrorMessage(inputType, input){
    let message = " ";
    typesOfErrors.forEach(error =>{
        if(input.validity[error]){
            console.log(inputType, error);
            console.log(input.validity[error]);
            console.log(msjError[inputType][error]);
            message = msjError[inputType][error];
        }
    })


    return message
}


//funtion to check if the user is over 18 years old

function verifyBirthdate(input){
    const birthdate = new Date(input.value);
    let msj = " "
   if(!validateAge(birthdate)){
    msj= "debes tener al menos 18 de edad"
   }
   input.setCustomValidity(msj);
}

function validateAge(date){
    const currentDate = new Date();
    const diffDates = new Date(
        date.getUTCFullYear() + 18,
        date.getUTCMonth(),
        date.getUTCDate()
    );
    return diffDates < currentDate;
}