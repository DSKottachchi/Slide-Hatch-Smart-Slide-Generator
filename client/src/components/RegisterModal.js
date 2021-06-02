// REGISTATION MODAL
import React, { useState, useCallback, useEffect, setState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { PropTypes, props } from 'prop-types';
import { register } from '../actions/authActions';
import { clearError } from '../actions/errorActions';

const RegisterModal = (props) => {
  const [modal, setModal] = useState(false);
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const [formData, setFormData] = useState({ answer: "" });
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [loginUsername, setloginUsername] = useState("");
  const [loginPassword, setloginPassword] = useState("");

  useEffect((prevProps) => {
    // const { error, isAuthenticated } = props;
    // if( error != prevProps.error) {
    //     //Check for register erros
    //     if(error.id === 'REGISTER_FAIL') {
    //         setMsg(error.msg.msg);
    //     } else {
    //         setMsg(null);
    //     }
    // }

    // if(modal) {
    //     if(isAuthenticated) {
    //         toggle();
    //     }
    // }
  });

  const toggle = () => {
    // CLEAR ERRORS
    props.clearError();
    setModal(!modal);
  }

  const onChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, hasChanged: true, [name]: value });
  }

  const onSubmit = e => {
    e.preventDefault();

    // CREATE USER OBJECT
    const newUser = {
        registerUsername,
        registerEmail,
        registerPassword
    }

    // ATTEMPT TO REGISTER
    props.register(newUser);
  }

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="mb-3"
                onChange={e => setRegisterUsername(e.target.value)}
              />

              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={onChange}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={e => setRegisterPassword(e.target.value)}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

RegisterModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearError:PropTypes.func.isRequired
}

    const mapStateToProps = (state) => ({
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error
    });

export default connect(mapStateToProps, 
    { register, clearError })(
    RegisterModal
);
