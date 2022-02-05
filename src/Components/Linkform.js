import React, {useState} from 'react';
import { Card } from 'react-bootstrap'

export const Linkform = (props) => {

    const initialStateValues = {
        title: '',
        publish: ''
    };
    const [values, setValues] = useState(initialStateValues);

    const inputChange = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target
        // console.log(name, value);
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(values);
        props.addOrEdit(values);
    }

    return (

            <Card>
                <Card.Header className='text-center'>
                    <h5><i className="large material-icons">directions_bike</i>  Nueva Publicación</h5>
                </Card.Header>
                <form onSubmit={handleSubmit}>
                    <Card.Title>
                        <input type="text" className='form-control' placeholder='Agrega un titulo' name='title' onChange={inputChange}></input>
                    </Card.Title>
                    <Card.Text>
                        <div className='form-group'>
                            <textarea name='publish' rows={4} className='form-control' placeholder='¿Qué hay de nuevo?' onChange={inputChange}></textarea>    
                        </div>
                    </Card.Text>
                        <button className='btn btn-primary w-full'>
                            Publicar
                        </button>
                        {/* <Button variant="primary">
                            Go somewhere
                        </Button> */}
                </form>
            </Card>
    )
}