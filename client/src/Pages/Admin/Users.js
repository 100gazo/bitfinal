import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../Context/MainContext'

const Users = () => {
    const [users, setUsers] = useState([])
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()
    const { setAlert } = useContext(MainContext)

    const handleDelete = (id) => {
        axios.delete('api/users/delete/' + id)
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
        axios.get('/api/users/')
            .then(resp => setUsers(resp.data))
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
                <h1>User List</h1>
            </div>
            {users ?
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {users.map(users =>
                            <tr key={users.id}>
                                <td>{users.id}</td>

                                <td>{users.first_name}</td>
                                <td>{users.last_name}</td>
                                <td>{users.email}</td>
                                <td>{users.password}</td>
                                <td>
                                    <div className="d-flex justify-content-end gap-2">
                                        <Link
                                            to={'/admin/users/edit/' + users.id}
                                            className="btn btn-primary"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => handleDelete(users.id)}
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
                <h3>No users found</h3>
            }
        </>
    )
}

export default Users