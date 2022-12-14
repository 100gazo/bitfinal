import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../Context/MainContext'

const EditBook = () => {
    const { setAlert } = useContext(MainContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: '',
        author: '',
        photo: '',
        category: ''
    })

    const [books, setBooks] = useState([])

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put('/api/books/edit/' + id, form)
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                })

                navigate('/admin/books/list')
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
    }, [setAlert])

    return (
        <>
            <div className="container mw-50">
                <div className="page-heading">
                    <h1>Book Edit</h1>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group mb-2">
                        <label className="mb-1">Book Name:</label>
                        <input type="text" name="name" className="form-control" onChange={handleForm} value={form.name} placeholder={form.name} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Author:</label>
                        <input type="text" name="author" className="form-control" onChange={handleForm} value={form.author} placeholder={form.author} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Photo:</label>
                        <input type="file" step="any" name="photo" className="form-control" onChange={handleForm} value={form.photo} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Category:</label>
                        <select
                            name="saloonId"
                            onChange={handleForm}
                            className="form-control"
                            value={form.saloonId ? form.saloonId : ''}
                        >
                            {books.map(saloon =>
                                <option key={saloon.id} value={saloon.id}>{books.category}</option>
                            )}
                        </select>
                    </div>

                    <button className="btn btn-primary">I??saugoti</button>
                </form>
            </div>
        </>
    )
}

export default EditBook