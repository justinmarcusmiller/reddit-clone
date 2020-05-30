import React, { Component } from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { addSubmission } from "../actions/submissionActions";
import { BrowserRouter as Redirect } from "react-router-dom";

class SubmitPost extends Component {
  state = {
    modal: false,
    title: "",
    url: "",
    author: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newSubmission = {
      title: this.state.title,
      url: "http://" + this.state.url,
      author: this.state.author,
    };

    this.props.addSubmission(newSubmission);
    alert('Link added successfully');
    this.setState({redirect: true});
  }

  render() {

    if (this.state.redirect) {
      return <Redirect push to="/" />
    }

    return (
      <Container>
        <h2>Submit Post</h2>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="title">Submission</Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Add Title"
              onChange={this.onChange}
            />
            <br />
            <Label for="url">URL</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>http://</InputGroupText>
                <Input
                  type="text"
                  name="url"
                  id="url"
                  placeholder="Add URL"
                  onChange={this.onChange}
                />
              </InputGroupAddon>
            </InputGroup>

            <br />
            <Label for="author">Your Name</Label>
            <Input
              type="text"
              name="author"
              id="author"
              placeholder="Add Your Name"
              onChange={this.onChange}
            />
            <Button color="dark" style={{ marginTop: "2rem" }} block>
              Add Submission
            </Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  submission: state.submission,
});

export default connect(mapStateToProps, { addSubmission })(SubmitPost);
