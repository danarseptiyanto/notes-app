import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Head, Link, useForm } from "@inertiajs/react";
import ThemeToggle from "@/Components/ThemeToggle";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };
    return (
        <>
            <Head title="Register" />
            <div className="grid min-h-svh lg:grid-cols-2">
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex justify-center gap-0.5 md:justify-start">
                        <div className="flex items-center gap-2 font-medium">
                            <div className="flex h-6 w-6 items-center justify-center">
                                <svg
                                    width="41"
                                    height="41"
                                    viewBox="0 0 41 41"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M35 0H6C2.68629 0 0 2.68629 0 5.99999V34.1458C0 37.4595 2.68629 40.1458 6 40.1458H35C38.3137 40.1458 41 37.4595 41 34.1458V6C41 2.68629 38.3137 0 35 0Z"
                                        fill="#0751CF"
                                    />
                                    <path
                                        d="M40 26C30 26 28.6667 35.1 28 39C28.4444 39 28.8885 39 29.3322 39C29.7761 36.8335 30.8876 35.6418 32.6667 35.425C35.3333 35.1 37.3333 32.825 38 30.875L37 30.225C37.2222 30.0083 37.4445 29.7917 37.6667 29.575C38.3333 28.925 39.0028 27.95 40 26Z"
                                        fill="white"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M19.9984 8C22.84 8 25.4473 8.96694 27.5043 10.5836L25.9547 13.8322C24.4247 12.3531 22.3208 11.4435 20.0023 11.4435C15.3146 11.4435 11.5168 15.1622 11.5168 19.7523C11.5168 23.4022 13.9212 26.5017 17.2623 27.6177L15.9508 30.8166C11.3177 29.1885 8 24.8507 8 19.7523C8 13.2627 13.3708 8.00382 19.9984 8.00382V8Z"
                                        fill="white"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M29.9393 13.1634C31.2391 15.0399 32.0002 17.3101 32.0002 19.7485C32.0002 26.238 26.6294 31.4969 20.0018 31.4969C19.065 31.4969 18.1517 31.3899 17.2773 31.1912L18.6083 27.9426C19.0611 28.0152 19.5256 28.0534 20.0018 28.0534C24.6895 28.0534 28.4873 24.3347 28.4873 19.7446C28.4873 18.9612 28.3741 18.2006 28.1673 17.4821L29.9393 13.1595V13.1634Z"
                                        fill="white"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M24.2786 26.9222L22.5105 31.2371C21.9992 31.3441 21.4722 31.4205 20.9375 31.4587C20.9453 31.4587 20.9492 31.4587 20.957 31.4587L22.5027 27.6865C23.1311 27.4993 23.7244 27.2394 24.2825 26.9222H24.2786Z"
                                        fill="#0751CF"
                                        fill-opacity="0.19"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M12.8585 29.1923C12.4721 28.9095 12.1013 28.6076 11.75 28.2827L13.2059 24.7322C13.5064 25.1259 13.8421 25.4889 14.2051 25.8253L12.8312 29.1771L12.8546 29.1962L12.8585 29.1923Z"
                                        fill="#0751CF"
                                        fill-opacity="0.19"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M17.633 17.4668L12.8359 29.1733C13.7766 29.8612 14.8227 30.4154 15.9507 30.809L16.1654 30.2854L21.423 17.4668H17.6369H17.633ZM20.9507 31.4587L22.4964 27.6865L27.1802 16.2629L28.9562 11.9289L30.3574 8.51215H26.6181L26.5713 8.51597L26.1146 9.63196L24.7836 12.8806L18.6088 27.9388L17.2778 31.1874C18.1521 31.3861 19.0576 31.4893 19.9944 31.4931C20.0959 31.4931 20.1974 31.4931 20.2989 31.4893H20.3145C20.4081 31.4855 20.5018 31.4817 20.5955 31.4779L20.6384 31.474C20.7243 31.4702 20.8063 31.4626 20.8921 31.4587C20.9117 31.4587 20.9312 31.4549 20.9507 31.4549V31.4587Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                            Danar&Co.
                        </div>
                        <ThemeToggle />
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-xs">
                            <form
                                className="flex flex-col gap-6"
                                onSubmit={submit}
                            >
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <h1 className="text-2xl font-bold">
                                        Register your account
                                    </h1>
                                    <p className="text-balance text-sm text-muted-foreground">
                                        Enter your email below to register your
                                        account
                                    </p>
                                </div>

                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            autoComplete="name"
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            required
                                        />
                                        <span className="text-sm text-red-500">
                                            {errors.name}
                                        </span>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                        <span className="text-sm text-red-500">
                                            {errors.email}
                                        </span>
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="current-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <span className="text-sm text-red-500">
                                            {errors.password}
                                        </span>
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password_confirmation">
                                                Confirm Password
                                            </Label>
                                        </div>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <span className="text-sm text-red-500">
                                            {errors.password_confirmation}
                                        </span>
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Sign Up
                                    </Button>
                                    {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                                <Button variant="outline" className="w-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Login with Google
                                </Button> */}
                                </div>
                                <div className="text-center text-sm">
                                    Already have an account?{" "}
                                    <Link
                                        href="/login"
                                        className="underline underline-offset-4"
                                    >
                                        Login
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="relative hidden bg-muted lg:block">
                    {/* <img
                        src="https://ui.shadcn.com/placeholder.svgx"
                        alt="Image"
                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    /> */}
                </div>
            </div>
        </>
    );
}

// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
// import PrimaryButton from '@/Components/PrimaryButton';
// import TextInput from '@/Components/TextInput';
// import GuestLayout from '@/Layouts/GuestLayout';
// import { Head, Link, useForm } from '@inertiajs/react';

// export default function Register() {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         name: '',
//         email: '',
//         password: '',
//         password_confirmation: '',
//     });

//     const submit = (e) => {
//         e.preventDefault();

//         post(route('register'), {
//             onFinish: () => reset('password', 'password_confirmation'),
//         });
//     };

//     return (
//         <GuestLayout>
//             <Head title="Register" />

//             <form onSubmit={submit}>
//                 <div>
//                     <InputLabel htmlFor="name" value="Name" />

//                     <TextInput
//                         id="name"
//                         name="name"
//                         value={data.name}
//                         className="mt-1 block w-full"
//                         autoComplete="name"
//                         isFocused={true}
//                         onChange={(e) => setData('name', e.target.value)}
//                         required
//                     />

//                     <InputError message={errors.name} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel htmlFor="email" value="Email" />

//                     <TextInput
//                         id="email"
//                         type="email"
//                         name="email"
//                         value={data.email}
//                         className="mt-1 block w-full"
//                         autoComplete="username"
//                         onChange={(e) => setData('email', e.target.value)}
//                         required
//                     />

//                     <InputError message={errors.email} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel htmlFor="password" value="Password" />

//                     <TextInput
//                         id="password"
//                         type="password"
//                         name="password"
//                         value={data.password}
//                         className="mt-1 block w-full"
//                         autoComplete="new-password"
//                         onChange={(e) => setData('password', e.target.value)}
//                         required
//                     />

//                     <InputError message={errors.password} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel
//                         htmlFor="password_confirmation"
//                         value="Confirm Password"
//                     />

//                     <TextInput
//                         id="password_confirmation"
//                         type="password"
//                         name="password_confirmation"
//                         value={data.password_confirmation}
//                         className="mt-1 block w-full"
//                         autoComplete="new-password"
//                         onChange={(e) =>
//                             setData('password_confirmation', e.target.value)
//                         }
//                         required
//                     />

//                     <InputError
//                         message={errors.password_confirmation}
//                         className="mt-2"
//                     />
//                 </div>

//                 <div className="mt-4 flex items-center justify-end">
//                     <Link
//                         href={route('login')}
//                         className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                     >
//                         Already registered?
//                     </Link>

//                     <PrimaryButton className="ms-4" disabled={processing}>
//                         Register
//                     </PrimaryButton>
//                 </div>
//             </form>
//         </GuestLayout>
//     );
// }
