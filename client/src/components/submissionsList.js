import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getSubmissions, deleteSubmission } from "../actions/submissionActions";
import PropTypes from "prop-types";


class SubmissionsList extends Component {
  componentDidMount() {
    this.props.getSubmissions();
  }

  onDeleteClick = (id) => {
    this.props.deleteSubmission(id);
  };

  render() {
    const { submissions } = this.props.submission;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="submission-list">
            {submissions.map(({ _id, title, url, author }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <a className="text-dark" href={url}>
                    {title}
                  </a>
                  <p
                    className="small text-secondary"
                    style={{ display: "inline" }}
                  >
                    {" "}
                    ({url})
                  </p>
                  <p className="small text-secondary">submitted by {author}</p>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >
                    Delete
                  </Button>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

SubmissionsList.propTypes = {
  getSubmissions: PropTypes.func.isRequired,
  submission: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  submission: state.submission,
});

export default connect(mapStateToProps, { getSubmissions, deleteSubmission })(
  SubmissionsList
);
