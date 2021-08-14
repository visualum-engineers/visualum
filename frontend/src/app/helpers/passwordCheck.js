const passwordLength = /.{8,20}/
const passwordUpperCase = /^(?=.*[A-Z]).*$/
const passwordLowerCase = /^(?=.*[a-z]).*$/
const passwordNumbers = /^(?=.*[0-9]).*$/
const passwordSymbols = /^(?=.*[!@#$%^&*]).*$/
const passwordRegexCollection = [passwordLength, passwordUpperCase, passwordLowerCase, passwordNumbers, passwordSymbols]

export function passwordCheck(statePW, stateVerify, btnCheck = false) {
    let testSpecificPwRegex = []
    if (btnCheck) {
        return passwordRegexCollection.every(regex => regex.test(statePW)) && stateVerify === statePW
    }

    for (let i in passwordRegexCollection) {
        testSpecificPwRegex.push(passwordRegexCollection[i].test(statePW))
    }
    return testSpecificPwRegex
}