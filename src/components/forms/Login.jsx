import React, { useState, useRef, useContext } from 'react';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { login, loadInbox } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { StudentContext } from '../context/StudentContext';
import { InboxContext } from '../context/InboxContext';
const Login = () => {
  const { setStudentData, setProject } = useContext(StudentContext);
  const { setMessages } = useContext(InboxContext);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [isValid, setIsValid] = useState({
    email: true,
    password: true,
  });

  const [hasInteracted, setHasInteracted] = useState({
    email: false,
    password: false,
  });

  const [shake, setShake] = useState({
    email: false,
    password: false,
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const validateEmail = (email) => /.+@.+\..+/.test(email);
  const validatePassword = (password) => password !== '';

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Always update the credentials irrespective of validation status.
    setCredentials((prev) => ({ ...prev, [name]: value }));

    setHasInteracted((prev) => ({ ...prev, [name]: true }));

    if (name === 'email') {
      setIsValid((prev) => ({ ...prev, email: validateEmail(value) }));
    }
    if (name === 'password') {
      setIsValid((prev) => ({ ...prev, password: validatePassword(value) }));
    }
  };

  const handleLoginClick = () => {
    let isValidEmail = validateEmail(credentials.email);
    let isValidPass = validatePassword(credentials.password);
    setIsValid({
      email: isValidEmail,
      password: isValidPass,
    });

    if (!isValidEmail || !isValidPass) {
      if (!isValidEmail) {
        setShake((prev) => ({ ...prev, email: true }));
        setTimeout(() => setShake((prev) => ({ ...prev, email: false })), 500);
        emailRef.current.focus();
      } else if (!isValidPass) {
        setShake((prev) => ({ ...prev, password: true }));
        setTimeout(
          () => setShake((prev) => ({ ...prev, password: false })),
          500
        );
        passwordRef.current.focus();
      }
    }

    console.log(credentials);
    login(credentials)
      .then((res) => {
        console.log(res.data);
        setStudentData(res.data.studentData);
        setProject(res.data.project);

        loadInbox(res.data.studentData.regNo).then((response) => {
          console.log(response.data);
          setMessages(response.data.inbox);
        });
        res.data.project === null
          ? navigate('/unregstudent')
          : navigate('/student');
      })
      .catch((err) => {
        alert('Invalid Credentials');
      });
  };

  return (
    <div className='grid justify-center content-center text-center my-[10rem]'>
      <Card color='transparent' shadow={false}>
        <Typography variant='h2' color='blue-gray' className='mb-5'>
          Login
        </Typography>
        <Typography color='gray' className='mt-1 font-normal'>
          Enter your details to Login.
        </Typography>
        <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'>
          <div className='mb-4 flex flex-col gap-8'>
            <Input
              size='lg'
              label={`Email ${
                !isValid.email && hasInteracted.email ? '*' : ''
              }`}
              name='email'
              onChange={handleChange}
              error={!isValid.email && hasInteracted.email}
              value={credentials.email}
              className={shake.email ? 'animate-shake' : ''}
              ref={emailRef}
            />
            <Input
              type='password'
              size='lg'
              label={`Password ${
                !isValid.password && hasInteracted.password ? '*' : ''
              }`}
              name='password'
              onChange={handleChange}
              error={!isValid.password && hasInteracted.password}
              value={credentials.password}
              className={shake.password ? 'animate-shake' : ''}
              ref={passwordRef}
            />
          </div>
          <Typography color='gray' className='mt-4 text-center font-normal'>
            Supervisor Login{' '}
            <Link to='/supervisorlogin' className='font-medium text-gray-900'>
              here
            </Link>
          </Typography>
          <Button className='mt-8 p-4' fullWidth onClick={handleLoginClick}>
            Login
          </Button>
        </form>
      </Card>

      <style jsx>{`
        .animate-shake {
          animation: shake 0.3s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        @keyframes shake {
          10%,
          90% {
            transform: translate3d(-1px, 0, 0);
          }

          20%,
          80% {
            transform: translate3d(1px, 0, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
