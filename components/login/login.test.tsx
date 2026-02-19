import {render, screen} from "@testing-library/react";
import LoginForm from "./login";
import {userEvent} from "@testing-library/user-event";

describe('LoginForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    test('should render input for email', async () => {
        const user = userEvent.setup()

        render(<LoginForm onSuccess={() => {}} />);

        const emailInput = screen.getByPlaceholderText(/Email/i)

        await user.type(emailInput, 'test@gmail.com')

        expect(emailInput).toHaveValue('test@gmail.com')
    })

    test('should render input for password', async () => {
        const user = userEvent.setup()

        render(<LoginForm onSuccess={() => {}} />);

        const passwordInput = screen.getByPlaceholderText(/Password/i);

        await user.type(passwordInput, 'qwerty123')

        expect(passwordInput).toHaveValue('qwerty123')
    })

    test('should return an error message', async () => {

        const user = userEvent.setup()

        // Мокаем глобальный fetch
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 401,
                headers: { get: () => 'application/json' },
                json: () => Promise.resolve({ error: "Invalid email or password" }),
            })
        ) as jest.Mock;

        render(<LoginForm onSuccess={() => {}} />);

        await user.type(screen.getByPlaceholderText(/Email/i), 'test@test.com');
        await user.type(screen.getByPlaceholderText(/Password/i), 'password123');

        const submitBtn = screen.getByRole('button', { name: /Login/i });

        await user.click(submitBtn);

        const errorMessage = await screen.findByText(/Invalid email or password/i);

        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveClass('text-red-600');
    })

    test('should not submit the form if the email or password is empty', async () => {
        const user = userEvent.setup()

        const fetchSpy = jest.spyOn(global, 'fetch')

        render(<LoginForm onSuccess={() => {}} />);

        const submitBtn = screen.getByRole('button', { name: /Login/i });

        await user.click(submitBtn);

        expect(fetchSpy).not.toHaveBeenCalled();

        fetchSpy.mockRestore();
    })
});