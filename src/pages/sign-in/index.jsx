import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { auth } from "@service";
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Notification from '@notification';
import * as Yup from 'yup';
import { EditNote } from '@mui/icons-material';
import Modal from "../../components/modal/verification-modal/index";
import "./style.css";
import { ToastContainer } from "react-toastify";

const Index = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: 'xasannosirov094@gmail.com',
    password: 'Sehtols@01',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password is too short')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await auth.sign_in(values);
      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access_token);
        Notification({
          title: "Sign In Successfully",
          type: "success",
        });
        setTimeout(() => {
          navigate("/main");
        }, 2300);
      }
    } catch (error) {
      console.log(error);
      Notification({
        title: "Sign In Failed",
        type: "error",
      });
    } finally {
      setSubmitting(false); 
    }
  };

  const toggle = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleNavigate = () => {
    navigate("/sign-up");
  };

  return (
    <div className=''>
      <ToastContainer />
      <div className="container">
        <Modal open={open} toggle={toggle} />
        <div className="login flex flex-col items-center mt-[150px] gap-3">
          <li><box-icon name='user-circle' color="#1880C9" size="200px"></box-icon></li>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className='flex flex-col justify-center m-auto gap-3 w-[500px]'>
                <Field
                  as={TextField}
                  fullWidth
                  type='text'
                  name='email'
                  label="Email"
                  helperText={<ErrorMessage name="email" component="div" />}
                />
                <Field
                  as={TextField}
                  fullWidth
                  type='password'
                  name='password'
                  label="Password"
                  helperText={<ErrorMessage name="password" component="div" />}
                />
                <button
                  type='button'
                  onClick={handleClick}
                  className='mt-2 bg-transparent text-[blue] border-none hover:text-black text-start w-[134px] cursor-pointer'
                >
                  Forgot password
                </button>
                <div className="flex justify-between gap-4">
                  <Button
                    variant="contained"
                    type='submit'
                    className='w-full'
                    endIcon={<SendIcon />}
                    disabled={isSubmitting}  
                  >
                    Login
                  </Button>
                  <Button
                    variant="outlined"
                    type='button'
                    className='w-full'
                    endIcon={<EditNote />}
                    disabled={isSubmitting} 
                    onClick={handleNavigate}
                  >
                    Create Account
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Index;
