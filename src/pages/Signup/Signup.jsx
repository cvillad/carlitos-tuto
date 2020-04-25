import React,{useState} from 'react';
import './Signup.scss';
import firebase from '../../services/firebase';
import {
  useHistory,
} from 'react-router-dom';

import {
  Link,
} from 'react-router-dom';

import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
} from '@chakra-ui/core';

function Signup() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleSubmit= async ()=>{
    try {
      setIsLoading(true);
      const { firstName, lastName, email, password} = formData;
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
      /*if (response){
        let db=firebase.firestore()
        db.collection("cities").add({
          fitstName: firstName,
          lastName: lastName,
          email: email
        })
      }*/
      history.push('/home')
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="container">
      <h1>Signup</h1>
      <FormControl className="form-control">
        <FormLabel htmlFor="firstName">First name</FormLabel>
        <Input onChange={handleInputChange} type="text" name="firstName"/>
      </FormControl>

      <FormControl className="form-control">
        <FormLabel htmlFor="firstName">Last name</FormLabel>
        <Input onChange={handleInputChange} type="text" name="lastName"/>
      </FormControl>

      <FormControl className="form-control">
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input onChange={handleInputChange} type="email" name="email" aria-describedby="email-helper-text" />
        <FormHelperText id="email-helper-text">
          We'll never share your email.
        </FormHelperText>
      </FormControl>

      <FormControl className="form-control">
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input onChange={handleInputChange} type="password" name="password"/>
      </FormControl>

      <FormControl className="form-control">
        <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
        <Input onChange={handleInputChange} type="password" name="confirmPassword"/>
      </FormControl>

      <Button
      className="submit-btn"
      isLoading={isLoading}
      loadingText="Submitting"
      variantColor="teal"
      variant="outline"
      onClick={handleSubmit}>
        Sign Up</Button>
      <Link to="/login">Return to Login</Link>
    </div>
  );
}

export default Signup;
