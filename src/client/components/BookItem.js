import React from 'react';
import {
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Row
} from 'reactstrap';
import dayjs from 'dayjs';

type Props = {
  book: object,
  take: function,
  bringBack: function,
  remove: function
}

export default function BookItem(props: Props) {
  const { _id, author, name, published, taken, takenDate } = props.book;
  const { take, bringBack, remove } = props;

  let button;

  if (taken)
    button = (
      <Button
        className="ml-2 mr-2"
        onClick={() => {
          bringBack(_id);
        }}
      >
        Bring back
      </Button>
    );
  if (!taken)
    button = (
      <Button
        className="ml-2 mr-2"
        onClick={() => {
          take(_id);
        }}
      >
        Take
      </Button>
    );

  return (
    <Card className="book">
      <CardHeader tag="h3">{name}</CardHeader>
      <CardBody>
        <CardTitle>{author}</CardTitle>
        <CardText>Published: {dayjs(published).format('MMMM D YYYY')}</CardText>
        <Row>
          {button}
          <Button
            color="danger"
            onClick={() => {
              remove(_id);
            }}
          >
            Delete
          </Button>
        </Row>
      </CardBody>
      {taken && (
        <CardFooter className="text-muted">
          <ListGroup>
            <ListGroupItem>
              Taken on: {dayjs(takenDate).format('MMMM D YYYY, h:mm:ss')}
            </ListGroupItem>
            <ListGroupItem>
              Please return before:{' '}
              {dayjs(takenDate)
                .add(14, 'days')
                .format('MMMM D YYYY, h:mm:ss')}
            </ListGroupItem>
          </ListGroup>
        </CardFooter>
      )}
    </Card>
  );
}
