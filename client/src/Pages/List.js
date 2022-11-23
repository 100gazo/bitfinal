import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../Context/MainContext'

const List = () => {
    const [books, setBooks] = useState([])
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()
    const { setAlert } = useContext(MainContext)



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
                <h1>Books list</h1>
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

export default List