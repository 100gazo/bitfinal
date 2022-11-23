import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../Context/MainContext'

const Books = () => {
    const [books, setBooks] = useState([])
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()
    const { setAlert } = useContext(MainContext)

    const handleDelete = (id) => {
        axios.delete('/api/books/delete/' + id)
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                })

                setRefresh(!refresh)

                window.scrollTo(0, 0)
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
    }, [refresh, setAlert])

    return (
        <>
            <div className="page-heading">
                <h1>Užsakymai</h1>
            </div>
            {books ?
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th> Name</th>
                            <th>Author</th>
                            <th>Cover</th>
                            <th>Rating</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(books =>
                            <tr key={books.id}>
                                <td>{books.id}</td>

                                <td>{books.name}</td>
                                <td>{books.author}</td>
                                <td>{books.photo}</td>
                                <td>{books.rating}</td>
                                <td>
                                    <div className="d-flex justify-content-end gap-2">
                                        <Link
                                            to={'/admin/books/edit/' + books.id}
                                            className="btn btn-primary"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => handleDelete(books.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                :
                <h3>No books found</h3>
            }
        </>
    )
}

export default Books