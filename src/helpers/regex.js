const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const checkPassword = (password) => {
    return passwordRegex.test(password);
}