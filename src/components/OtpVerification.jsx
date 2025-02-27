import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import toast from 'react-hot-toast';
import { customPost } from '../utils/axios';
import { endpoints } from '../utils/endpoints';
import { verifyOtp } from '../services/Authentication.Services';

const OtpVerification = ({ email, isOtpverified, setIsOtpverified }) => {
    const [otp, setOtp] = useState(new Array(4).fill(''));
    const inputsRef = useRef([]);

    const [loading, setLoading] = useState(false);

    const handleFocus = (e) => {
        e.target.select();
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text');
        if (!new RegExp(`^[0-9]{${inputsRef.current.length}}$`).test(text)) {
            return;
        }
        const digits = text.split('');
        setOtp(digits);
        inputsRef.current[inputsRef.current.length - 1].focus();
    };

    const handleKeyDown = (e, index) => {
        if (
            !/^[0-9]{1}$/.test(e.key) &&
            e.key !== 'Backspace' &&
            e.key !== 'Delete' &&
            e.key !== 'Tab' &&
            !e.metaKey
        ) {
            e.preventDefault();
        }

        if (e.key === 'Delete' || e.key === 'Backspace') {
            if (index > 0) {
                setOtp((prevOtp) => {
                    const newOtp = [...prevOtp];
                    newOtp[index - 1] = '';
                    return newOtp;
                });
                inputsRef.current[index - 1].focus();
            }
        }
    };

    const handleInput = (e, index) => {
        const { value } = e.target;
        if (value) {
            setOtp((prevOtp) => {
                const newOtp = [...prevOtp];
                newOtp[index] = value;
                return newOtp;
            });
            if (index < inputsRef.current.length - 1) {
                inputsRef.current[index + 1].focus();
            }
        }
    };

    useEffect(() => {
        inputsRef.current.forEach((input, index) => {
            input?.addEventListener('focus', handleFocus);
            input?.addEventListener('paste', handlePaste);
        });

        return () => {
            inputsRef.current.forEach((input) => {
                input?.removeEventListener('focus', handleFocus);
                input?.removeEventListener('paste', handlePaste);
            });
        };
    }, []);

    useEffect(() => {
        const inputs = inputsRef.current;

        if (inputs) {
            inputs.forEach((input) => {
                if (input) {
                    input.addEventListener('focus', handleFocus);
                    input.addEventListener('paste', handlePaste);
                }
            });
        }

        return () => {
            if (inputs) {
                inputs.forEach((input) => {
                    if (input) {
                        input.removeEventListener('focus', handleFocus);
                        input.removeEventListener('paste', handlePaste);
                    }
                });
            }
        };
    }, []);


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (otp?.length < 4) {
                toast.error('Please fill all input fields');
                return;
            }
            setLoading(true);
            const response = await verifyOtp(email, otp.join(''));
            if (response.statusCode === 200 || response.statusCode === 201) {
                localStorage.setItem('token', response.data.token);
                toast.dismiss();
                toast.success(response.message);
                setIsOtpverified(true);
                setLoading(false);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            setLoading(false);
            console.log('Error in handleSubmit for OTP Verification', error);
            toast.dismiss();
            toast.error(error.response.data.message);
        }

    };

    return (
        <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl">
            <header className="mb-8">
                <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
                <p className="text-[15px] text-slate-500">
                    Enter the 4-digit verification code that was sent to your email.
                </p>
            </header>
            <form id="otp-form">
                <div className="flex items-center justify-center gap-3">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                            maxLength="1"
                            value={value}
                            onChange={(e) => handleInput(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onFocus={handleFocus}
                            onPaste={handlePaste}
                            ref={(el) => (inputsRef.current[index] = el)}
                        />
                    ))}
                </div>
                <div className="max-w-[260px] mx-auto mt-4">
                    <Button
                        type="submit"
                        className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                        onClick={handleSubmit}
                        loading={loading}
                    >
                        Verify Account
                    </Button>
                </div>
            </form>
            {/* <div className="text-sm text-slate-500 mt-4">
                Didn't receive code?{' '}
                <a className="font-medium text-indigo-500 hover:text-indigo-600" href="#0">
                    Resend
                </a>
            </div> */}
        </div>
    );
};

export default OtpVerification;
