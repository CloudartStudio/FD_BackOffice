import { hash, compare } from "bcryptjs";

export async function hashPassword(password) {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
    const isValid = await compare(password, hashedPassword);
    return isValid;
}

export function generateRandomPassword(complexity, length) {
    const alphanumericChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const specialChars = "!@#$%^&*()_-+=<>?";

    let password = "";

    for (let i = 0; i < length; i++) {
        let charSet;
        switch (complexity) {
            case "low":
                charSet = alphanumericChars;
                break;
            case "medium":
                charSet = alphanumericChars + specialChars;
                break;
            case "high":
                charSet = alphanumericChars + specialChars + specialChars.toUpperCase();
                break;
            default:
                throw new Error("Invalid complexity level");
        }

        const randomIndex = Math.floor(Math.random() * charSet.length);
        password += charSet[randomIndex];
    }

    return password;
}
