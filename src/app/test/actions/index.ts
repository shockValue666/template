export const someAction = async () => {
    await new Promise(resolve => setTimeout(resolve, 3000))
    return "hello"
}

export const someOtherAction = async () => {
    await new Promise(resolve => setTimeout(resolve, 5000))
    return "world"
}