import validator from 'validator';

export const errorMsg = {
    emailInvalid: "Please enter a valid Email address",
    passwordMinLength: "Password must be at least 4 characters long.",
    userNameBlank: "Please enter your username",
    
}


export function validEmail(email: string) {
    return validator.isEmail(email)
}

export function validPasswordLength(password: string) {
    return password.length >= 4
}

export function validUsername(username: string) {
    return username !== null && username !== ''
}