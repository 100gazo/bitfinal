import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../Context/MainContext'

const AddBook = () => {
    const { setAlert } = useContext(MainContext)
    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: '',
        author: '',
        photo: '',
    })

    const [books, setBooks] = useState([])

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/api/books/new', form)
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                })

                navigate('/')
            })
            .catch(error => {
                console.log(error)

                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })

                if (error.response.status === 401)
                    navigate('/login')
            })
    }

    useEffect(() => {
        axios.get('/api/books/')
            .then(resp => setBooks(resp.data))
            .catch(error => {
                console.log(error)
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
            })
    }, [navigate, setAlert])

    return (
        <>
            <div className="container mw-50">
                <div className="page-heading">
                    <h1>Add New Book</h1>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group mb-2">
                        <label className="mb-1">Name:</label>
                        <input type="text" name="name" className="form-control" onChange={handleForm} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Author:</label>
                        <input type="text" name="author" className="form-control" onChange={handleForm} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Cover:</label>
                        <input type="file" name="photo" className="form-control" onChange={handleForm} />
                    </div>

                    <button className="btn btn-primary">Išsaugoti</button>
                </form>
            </div>
        </>
    )
}

export default AddBook