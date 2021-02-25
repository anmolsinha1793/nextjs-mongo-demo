import {useState, useEffect} from 'react';
import {Button, Form, Message} from 'semantic-ui-react';
import {useRouter} from 'next/router';

const EditNote = ({note}) => {
    const [form, setForm] = useState({
        title: note.title,
        description: note.description,
        author: note.author,
        email: note.email
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [isUnchanged, setIsUnchanged] = useState(true);
    const router = useRouter();
    let changesMade = '';
    let dataArr = [];
    useEffect(() => {
        const isNote = Object.values(form).every(elm => Boolean(elm));
        setDisabled(!isNote);
      }, [form]);
    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch(`http://localhost:3000/api/notes/${router.query.id}`,{
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });
            router.push('/');
            setIsSubmitting(false);

        } catch (err) {
            console.log(err);
            setIsSubmitting(false);
        }
    }
    const handleChange = (e) => {
      setForm({
          ...form,
          [e.target.name]: e.target.value
      });
      dataArr.push(e.target.name);
      dataArr = [...new Set(dataArr)];
      setIsUnchanged(false);
      changesMade = `You have made changes to ${dataArr} field(s)`;
    }
    return (
      <div className="form__container">
        <h1>Update Note</h1>
        <div>
          {
            <Form onSubmit={handleSubmit} loading={isSubmitting}>
              <Form.Input
                fluid
                label="Title"
                placeholder="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
              <Form.TextArea
                label="Description"
                placeholder="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                label="Author"
                placeholder="Author"
                name="author"
                icon="user"
                value={form.author}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                label="Email"
                placeholder="Email"
                name="email"
                value={form.email}
                icon="envelope"
                type="email"
                onChange={handleChange}
              />
              {!isUnchanged ? <Message
                color='orange'
                header="Changes Made"
                content={changesMade}
              />: ''}
              <Button
                color="orange"
                type="submit"
                disabled={disabled || isSubmitting || isUnchanged}
              >
                Update
              </Button>
            </Form>
          }
        </div>
      </div>
    );
}

/**
  * This method is used to get the initial props such as a specific note 
  * @returns note
  */
EditNote.getInitialProps = async({query: {id}}) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`);
    const {data} = await res.json();

    return {note: data};
}

export default EditNote;

