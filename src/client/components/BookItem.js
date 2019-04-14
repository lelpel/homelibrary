import React from 'react';
import {
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap';

export default function BookItem(props) {
  const { _id, author, name, published, taken, takenDate, user } = props.book;
  const { take, bringBack } = props;

  let button;

  if (taken) button = <Button onClick={bringBack(_id)}>Bring back</Button>;
  if (!taken) button = <Button onClick={take(_id)}>Take</Button>;

  return (
    <Card>
      <CardHeader tag="h3">{name}</CardHeader>
      <CardBody>
        <CardTitle>{author}</CardTitle>
        <CardText>Published: {published}</CardText>
        {button}
      </CardBody>
      {taken && (
        <CardFooter className="text-muted">Taken on: {takenDate}</CardFooter>
      )}
    </Card>
  );
}
