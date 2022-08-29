let collection = ()=>{
    let user =[{email: `admin@email.com`,
    password: `admin`},{email: `john@email.com`,
    password: `123456`}
    ]
    return user
}

let checkEmail = (use)=>{
    let isInvalid = false
    let count=0;
    let index=0;

    let EmailObj = document.getElementById('logemail1')

    let inputEmail = EmailObj.value
    console.log(inputEmail);
    for (let i = 0; i < use.length; i++) {
        if (use[i].email===inputEmail) {
            index=count
break
        }
        count++
    }
    
    if (use[index].email===inputEmail) {
        isInvalid = false
    }else{
        alert(`You entered an incorrect email`)
        isInvalid=true
    }

    if (isInvalid===false) {
        EmailObj.style.border = `2px solid green`
    }
    else{
        EmailObj.style.border = '2px solid red'
    }
console.log(isInvalid);
    return isInvalid
}
let checkPassword = (use)=>{
    let isInvalid = false
    let count=0;
    let index=0;

    let passwordObj = document.getElementById('logpass1')

    let inputPassword = passwordObj.value
    console.log(inputPassword);
    for (let i = 0; i < use.length; i++) {
        if (use[i].password===inputPassword) {
            index=count
break
        }
        count++
    }

    if (use[index].password===inputPassword) {
        isInvalid = false
    }else{
        alert(`You entered an incorrect password`)
        isInvalid=true
    }

    if (isInvalid===false) {
        passwordObj.style.border = `2px solid green`
    }
    else{
        passwordObj.style.border = '2px solid red'
    }
    console.log(isInvalid);
    return isInvalid
}
