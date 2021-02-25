import Link from 'next/link';
import {Button, Card} from 'semantic-ui-react';

const Index = ({notes}) => {
  return (
    <div className="notes__container">
      <h1>Notes</h1>
      <div className="grid content__wrapper">
        {notes.map(note => {
          return (
            <div key={note._id}>
              <Card className="card__contents">
                <Card.Content>
                  <Card.Header>
                    <Link href={`/${note._id}`}>
                    <a>{note.title}</a>
                    </Link>
                  </Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Link href={`/${note._id}`}>
                    <Button floated='left' primary>View</Button>
                  </Link>
                  <Link href={`/${note._id}/editnote`}>
                    <Button floated='right' primary>Edit</Button>
                  </Link>
                </Card.Content>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
  * This method is used to get the initial props such as notes 
  * @returns notes[]
  */
Index.getInitialProps = async () => {
  const res = await fetch(`http://localhost:3000/api/notes`);
  const { data } = await res.json();
  return {notes: data};
}

export default Index;