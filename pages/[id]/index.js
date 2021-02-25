import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {Card, Confirm, Button, Loader} from 'semantic-ui-react';

const Note = ({note}) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if(isDeleting){
            deleteNote();
        }
    },[isDeleting])
    const openPopup = () => setConfirm(true);
    const closePopup = () => setConfirm(false);
    const handleDelete = async() => {
        setIsDeleting(true);
        close();
    }
    const deleteNote = async() => {
        const noteId = router.query.id;
        try {
            const deleted = await fetch(`http://localhost:3000/api/notes/${noteId}`,{
                method: 'DELETE'
            });
            router.push('/');
        } catch(err) {
            console.log(err);
        }
    }
    return (
      <div className="note__container">
        {isDeleting ? (
          <Loader active />
        ) : (
          <>
            <Card className="card__contents">
              <Card.Content>
                <Card.Header>
                  <h1>{note.title}</h1>
                </Card.Header>
              </Card.Content>
              <Card.Content>
                <p>{note.description}</p>
                <p>{note.author}</p>
                <p>{note.email}</p>
              </Card.Content>
              <Card.Content extra>
                <Button color="red" onClick={openPopup}>
                  Delete
                </Button>
              </Card.Content>
            </Card>
          </>
        )}
        <Confirm
          open={confirm}
          onCancel={closePopup}
          onConfirm={handleDelete}
        />
      </div>
    );
} 

/**
  * This method is used to get the initial props such as a specific note 
  * @returns note
  */
Note.getInitialProps = async({query: {id}}) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`);
    const {data} = await res.json();

    return {note: data};
}

export default Note