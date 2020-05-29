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
import { addSubmission } from "../actions/submissionActions";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

class UserSignIn extends Component {
  state = {
    modal: false,
    username: "",
    password: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    //alert('Signed Up added successfully');
    this.setState({redirect: true});
  }

  render() {

    if (this.state.redirect) {
      return <Redirect push to="/" />
    }

    return (
      <Container>
        <h2>Sign In</h2>
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

                <Button disabled={(this.state.password.length > 0) && (this.state.username.length > 0) ? null : (true)} 
                color="dark" style={{ marginTop: "2rem" }} block>
                  Sign In
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

export default connect(mapStateToProps, { addSubmission })(UserSignIn);
