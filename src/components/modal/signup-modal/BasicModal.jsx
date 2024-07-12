import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { auth } from '@service';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, handleClose }) {
  const navigate = useNavigate();
  const [code, setCode] = React.useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCode({ ...code, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await auth.verify(code);
      if (response.status === 200) {
        console.log('Login successful');
        navigate('/main'); // Muvaffaqiyatli kirishdan keyin yo'naltirish
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(code);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center font-bold text-[36px]'>
            Enter Verification Code
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
              <TextField 
                fullWidth 
                label="Verification Code" 
                name='otp' 
                type='text' 
                onChange={handleChange} 
                id="fullWidth" 
              />
              <TextField 
                fullWidth 
                label="Email" 
                name='email' 
                type='text' 
                onChange={handleChange} 
                id="fullWidth" 
              />
              <Button 
                variant="contained" 
                type='submit' 
                className='w-full' 
                endIcon={<SendIcon />}
              >
                Submit
              </Button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
