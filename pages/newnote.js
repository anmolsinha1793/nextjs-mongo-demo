import {useState, useEffect} from 'react';
import {Button, Form} from 'semantic-ui-react';
import {useRouter} from 'next/router';

const INITIAL_NOTE = {
  title: "",
  description: "",
  author: "",
  email: "",
};
const NewNote = () => {
    const [form, setForm] = useState(INITIAL_NOTE);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [disbaled, setDisabled] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const isNote = Object.values(form).every(elm => Boolean(elm));
        setDisabled(!isNote);
      }, [form]);
    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('http://localhost:3000/api/notes',{
                method: 'POST',
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
    }
    return (
        <div className="form__container">
            <h1>Create a new Note</h1>
            <div>
                {
                    <Form onSubmit={handleSubmit} loading={isSubmitting}>
                        <Form.Input
                        fluid
                        label="Title"
                        placeholder="Title"
                        name="title"
                        onChange={handleChange}/>
                        <Form.TextArea
                        label="Description"
                        placeholder="Description"
                        name="description"
                        onChange={handleChange}/>
                        <Form.Input
                        fluid
                        label="Author"
                        placeholder="Author"
                        name="author"
                        icon="user"
                        onChange={handleChange}/>
                        <Form.Input
                        fluid
                        label="Email"
                        placeholder="Email"
                        name="email"
                        icon="envelope"
                        type="email"
                        onChange={handleChange}/>
                        <Button color="orange" type="submit" disabled={disbaled || isSubmitting}>Create</Button>
                    </Form>
                }
            </div>
        </div>
    )
}

export default NewNote;

