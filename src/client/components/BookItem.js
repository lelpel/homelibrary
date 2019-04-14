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
export default function BookItem(props) {
  const { _id, author, name, published, taken, takenDate, user } = props.book;
  const { take, bringBack, remove } = props;

  let button;

  if (taken)
    button = (
      <Button
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
