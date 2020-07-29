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
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

class SubmitPost extends Component {
  constructor(props) {
    super(props);
    this.validiateURL = this.validiateURL.bind(this);
  }

  state = {
    modal: false,
    title: "",
    url: "",
    author: "",
  };

  validiateURL(input) {
    if (input.startsWith("https://www.") || input.startsWith("http://www.")) { // if valid input
      return input
    } else if (input.startsWith("www.")){ // if missing http or https
      return "http://" + input
    } else {
      return "http://www." + input
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.state.url = this.validateURL(this.state.url);

    const newSubmission = {
      title: this.state.title,
      url: this.state.url,
      author: this.state.author,
    };

    this.props.addSubmission(newSubmission);
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
              <Input
                type="text"
                name="url"
                id="url"
                placeholder="Add URL"
                onChange={this.onChange}
              />
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
