import React, { Component } from 'react';
import axios from 'axios';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import BookItem from '../components/BookItem';
import Add from '../components/Add';

export default class Books extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      loading: true,
      showModal: false
    };

    this.getData = this.getData.bind(this);
    this.take = this.take.bind(this);
    this.bringBack = this.bringBack.bind(this);
    this.remove = this.remove.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  getData() {
    axios
      .get('http://localhost:8080/api/books')
      .then(res => this.setState({ books: res.data, loading: false }))
      .catch(err => console.log(err));
  }

  take(id) {
    const userId = localStorage.getItem('uuid');

    axios
      .put(`http://localhost:8080/api/book/changeStatus/${id}`, userId)
      .then(res => {
        setTimeout(100);
        this.setState({ loading: true });
      })
      .catch(err => console.log(err));
  }

  bringBack(id) {
    axios
      .put(`http://localhost:8080/api/book/changeStatus/${id}`)
      .then(res => {
        setTimeout(100);
        this.setState({ loading: true });
      })
      .catch(err => console.log(err));
  }

  remove(id) {
    axios
      .delete(`http://localhost:8080/api/book/${id}`)
      .then(res => {
        setTimeout(100);
        this.setState({ loading: true });
      })
      .catch(err => console.log(err));
  }

  showModal() {
    this.setState({ showModal: true });
  }

  render() {
    const { books, loading, showModal } = this.state;

    if (loading) {
      this.getData();
      return <h1>Data is loading...</h1>;
    }
    const listItems = books.map(book => (
      <li key={book._id}>
        <BookItem
          book={book}
          take={this.take}
          bringBack={this.bringBack}
          remove={this.remove}
        />
      </li>
    ));

    return (
      <div>
        <div className="booklg">
          {showModal && <Add />}
          <ul className="booklg">{listItems}</ul>
        </div>
        <Button className="add" onClick={this.showModal}>
          Add book
        </Button>
      </div>
    );
  }
}
