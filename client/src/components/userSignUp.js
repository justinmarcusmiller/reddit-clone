import React, { Component } from "react";
import {
  Button,
  Modal,
  Container,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  NavLink,
} from "reactstrap";
import { connect } from "react-redux";
import { addUser } from "../actions/userActions";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

class UserSignUp extends Component {
  state = {
    modal: false,
    username: "",
    password: "",
    password2: ""
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.addUser(newUser);
    alert('Signed Up added successfully');
    this.setState({redirect: true});
  }

  render() {

    if (this.state.redirect) {
      return <Redirect push to="/" />
    }

    return (
      <Container>
        <h2>Sign Up</h2>
        <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="username">Username: </Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  onChange={this.onChange}
                />
                <br />
                <Label for="password">Password</Label>
                <InputGroup>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.onChange}
                  />
                </InputGroup>
                <Label for="password2">Re-Enter Password</Label>
                <InputGroup>
                  <Input
                    type="password"
                    name="password2"
                    id="password2"
                    onChange={this.onChange}
                  />
                </InputGroup>

                <Button disabled={(this.state.password2 === this.state.password) && (this.state.password.length > 0) && (this.state.username.length > 0) ? null : (true)} 
                color="dark" style={{ marginTop: "2rem" }} block>
                  Sign Up
                </Button>
              </FormGroup>
            </Form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { addUser })(UserSignUp);
