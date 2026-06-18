import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import joi from 'joi';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Auth/Button';
import InputField from '../components/Auth/Input';
import { registerSlice, clearAuthForce } from '../redux/slices/authSlice';

// Skema Validasi Joi dengan tambahan confirmPassword
const schema = joi.object({
    email: joi.string()
        .email({ tlds: { allow: false } }).required().messages({
            "string.empty": "Email is required!",
            "string.email": "Invalid email format!",
            "any.required": "Email is required!",
        }),
    password: joi.string().min(8).required().messages({ // Samakan minimal 8 karakter seperti Login
        "string.empty": "Password is required!",
        "string.min": "Password must be at least 8 characters!",
        "any.required": "Password is required!",
    }),
    confirmPassword: joi.any().valid(joi.ref('password')).required().messages({
        "any.only": "Passwords do not match!",
        "any.required": "Confirm Password is required!",
    }),
});

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading } = useSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(schema)
    });

    useEffect(() => {
        dispatch(clearAuthForce());
    }, [dispatch]);

    const onSubmit = (data) => {
        const payload = {
            email: data.email,
            password: data.password
        };

        dispatch(registerSlice(payload))
            .unwrap()
            .then(() => {
                toast.success('Registration successful! You can now log in.', {
                    style: {
                        border: '1px solid var(--color-active)',
                        padding: '16px',
                        color: 'var(--color-active)',
                    },
                    iconTheme: {
                        primary: 'var(--color-active)',
                        secondary: '#FFFAEE',
                    },
                });
                navigate('/auth/login', { replace: true });
            })
            .catch((err) => {
                toast.error(err || "Registration Failed, Try again!");
            });
    };

    return (
        <div className="font-main relative flex min-h-screen flex-col items-center justify-center px-4 py-8 sm:px-2">
            <section className="text-center md:text-left mb-4">
                    <h1 className='text-black font-sans font-extrabold text-4xl mb-2'>Create Account</h1>
                    <p className="text-black text-small-normal">
                        Join the elite architects of the web.
                    </p>
                </section>
            <main className="md:min-3/6 z-10 w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
                <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
                    <InputField
                        label="Email Address"
                        type="email"
                        id="email"
                        placeholder="name@company.com"
                        {...register('email')}
                    />
                    <div className="h-4 w-full text-left">
                        {errors.email && (
                            <p className="text-important text-xsmall-normal">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <InputField
                        label="Password"
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        {...register('password')}
                    />
                    <div className="h-4 w-full text-left">
                        {errors.password && (
                            <p className="text-important text-xsmall-normal">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <InputField
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        placeholder="••••••••"
                        {...register('confirmPassword')}
                    />
                    <div className="h-4 w-full text-left">
                        {errors.confirmPassword && (
                            <p className="text-important text-xsmall-normal">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        color="blue"
                        size="full"
                        shape="rectangle"
                        className={`mt-6 hover:opacity-90 transition-opacity ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        {isLoading ? 'Creating account...' : 'Sign Up \u2192'}
                    </Button>
                </form>

                <section className="mt-8">
                    <div className="flex justify-center mt-4 text-center gap-2 text-small-normal text-darkgrey">
                        Already have an account?
                        <Link
                            to="/auth/login"
                            title="Sign In"
                            className="text-primary text-small-bold cursor-pointer hover:underline"
                        >
                            Sign In
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Register;