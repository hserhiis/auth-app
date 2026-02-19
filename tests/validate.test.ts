import expect from "expect";

const validateEmail = (email: string) => {
    return email.includes("@")
}

describe("validateEmail", () => {
    test("should return true", () => {
        expect(validateEmail("test@me.com")).toBe(true)
    })

    test("should return false", () => {
        expect(validateEmail("testme.com")).toBe(false)
    })
})