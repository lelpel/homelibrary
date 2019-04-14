import React, { Component } from 'react';
import axios from 'axios';
import { ListGroup, ListGroupItem } from 'reactstrap';
import BookItem from '../components/BookItem';

export default class Books extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      loading: true
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8080/api/books')
      .then(res => this.setState({ books: res.data, loading: false }))
      .catch(err => console.log(err));
  }

  take = id => {};

  bringBack = id => {};
  render() {
    const { books, loading } = this.state;

    if (loading) return <h1>Data is loading...</h1>;

    const listItems = books.map(book => (
      <ListGroupItem key={book._id}>
        <BookItem book={book} take={this.take} bringBack={this.bringBack} />
      </ListGroupItem>
    ));

    return (
      <div>
        <ListGroup>{listItems}</ListGroup>
      </div>
    );
  }
}
