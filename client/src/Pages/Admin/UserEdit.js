import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../Context/MainContext'

const UserEdit = () => {
    const { setAlert } = useContext(MainContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    })

    const [users, serUsers] = useState([])

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put('/api/users/edit/' + id, form)
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                })

                navigate('/admin/users/list')
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



    // useEffect(() => {
    //     axios.get('/api/users/')
    //         .then(resp => setUsers(resp.data))
    //         .catch(error => {
    //             console.log(error)
    //             setAlert({
    //                 message: error.response.data,
    //                 status: 'danger'
    //             })
    //         })
    // }, [setAlert])

    return (
        <>
            <div className="container mw-50">
                <div className="page-heading">
                    <h1>User Edit</h1>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group mb-2">
                        <label className="mb-1">First Name:</label>
                        <input type="text" name="first_name" className="form-control" onChange={handleForm} value={form.first_name} placeholder={form.first_name} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Last Name:</label>
                        <input type="text" name="last_name" className="form-control" onChange={handleForm} value={form.last_name} placeholder={form.last_name} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Email:</label>
                        <input type="text" name="email" className="form-control" onChange={handleForm} value={form.email} placeholder={form.email} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Password:</label>
                        <input type="text" name="password" className="form-control" onChange={handleForm} value={form.password} placeholder={form.password} />
                    </div>

                    <button className="btn btn-primary">Save</button>
                </form>
            </div>
        </>
    )
}

export default UserEdit