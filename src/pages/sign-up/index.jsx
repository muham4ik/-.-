import React, { useState } from 'react';
import { TextField, Button, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import BasicModal from '../../components/modal/signup-modal/BasicModal';
import { auth } from "@service";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./style.css"

const Index = () => {
    const [open, setOpen] = useState(false);

    const toggleModal = () => {
        setOpen(!open);
    };

    const initialValues = {
        email: '',
        first_name: '',
        last_name: '',
        gender: '',
        phone_number: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Enter a valid email')
            .required('Email is required'),
        first_name: Yup.string()
            .min(2, 'Name is too short')
            .max(50, 'Name is too long')
            .required('First name is required'),
        last_name: Yup.string()
            .min(2, 'Name is too short')
            .max(50, 'Name is too long')
            .required('Last name is required'),
        password: Yup.string()
            .min(6, 'Password is too short')
            .required('Password is required'),
        phone_number: Yup.string()
            .min(3, 'Phone number is too short')
            .required('Phone number is required')
            .max(15, 'Phone number is too long'),
        gender: Yup.string()
            .required('Gender is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await auth.sign_up(values);
            if (response.status === 200) {
                setOpen(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert('Unauthorized: Please login to continue.');
            } else {
                console.log(error);
                alert('Something went wrong. Please try again.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container">
            <BasicModal open={open} handleClose={toggleModal} />
            <div className="flex flex-col items-center">
                <div className="signup flex flex-col justify-center items-center mt-[50px]">
                    <h1 className="text-[48px] fs-1 font-bold mb-[50px] text-primary">Register</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="flex flex-col justify-center m-auto gap-3 w-[500px]">
                                <Field
                                    as={TextField}
                                    fullWidth
                                    type="email"
                                    name="email"
                                    label="Email"
                                    helperText={<ErrorMessage name="email" component="div" />}
                                />
                                <Field
                                    as={TextField}
                                    fullWidth
                                    type="text"
                                    name="first_name"
                                    label="First Name"
                                    helperText={<ErrorMessage name="first_name" component="div" />}
                                />
                                <Field
                                    as={TextField}
                                    fullWidth
                                    type="text"
                                    name="last_name"
                                    label="Last Name"
                                    helperText={<ErrorMessage name="last_name" component="div" />}
                                />
                                <FormControl fullWidth>
                                    <FormLabel>Gender</FormLabel>
                                    <Field as={RadioGroup} name="gender">
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    </Field>
                                    <ErrorMessage name="gender" component="div" />
                                </FormControl>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    type="text"
                                    name="phone_number"
                                    label="Phone Number"
                                    helperText={<ErrorMessage name="phone_number" component="div" />}
                                />
                                <Field
                                    as={TextField}
                                    fullWidth
                                    type="password"
                                    name="password"
                                    label="Password"
                                    helperText={<ErrorMessage name="password" component="div" />}
                                />
                                <Button
                                    variant="contained"
                                    type="submit"
                                    className="w-full"
                                    endIcon={<SendIcon />}
                                    disabled={isSubmitting}
                                >
                                    Sign Up
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Index;
