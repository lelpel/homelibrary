import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import axios from 'axios';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      title: '',
      author: '',
      published: ''
    };

    this.toggle = this.toggle.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const newBoook = {
      name: this.state.title,
      author: this.state.author,
      published: this.state.published
    };

    axios
      .post('http://localhost:8080/api/book/add', newBoook)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { title, author, published, modal } = this.state;

    return (
      <div>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add a book</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="name">Author</Label>
                <Input
                  type="text"
                  name="author"
                  id="author"
                  placeholder="Enter book author"
                  value={author}
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="title">title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter book title"
                  value={title}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="published">Datetime</Label>
                <Input
                  type="datetime"
                  name="published"
                  id="published"
                  value={published}
                  onChange={this.handleChange}
                  placeholder="Enter publication date"
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>
              Submit
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Add;
