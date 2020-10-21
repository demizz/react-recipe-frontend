import React,{useState} from 'react'
import {Mutation} from 'react-apollo';
import {SIGNUP_USER} from '../../queries/index';
import Error from '../Error';
import {withRouter} from 'react-router-dom';
const Signup = (props) => {
    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password:'',
        passwordConfirm:""
    })
    const [success, setSuccess] = useState(false)
    const {username,email,password,passwordConfirm}=inputs;
    const handleChange=name=>e=>{
        setInputs({...inputs,[name]:e.target.value})
        
    }
    const clearState=()=>{
        setInputs({...inputs,
        username:'',
    password:'',
    passwordConfirm:'',
email:''})
    }
    const handleSubmit=signupUser=>e=>{

        e.preventDefault();
        console.log(props);
        signupUser().then(async({data})=>{
            localStorage.setItem('token',data.signupUser.token);
            setSuccess(true)
          //  await props.refetch()
            clearState();
            setTimeout(()=>{
                setSuccess(false);
                props.history.push('/login')
            },3000)

        })
    }
    const validateForm=()=>{
        const isInvalid=!username ||!email ||!password ||password!==passwordConfirm;
        return isInvalid

    }
    const showSuccessMessage=()=>{
        return (
            <div className="alert alert-success">
            You are successfully registred try to login please
            </div>
        )
    }
    return (
        <div className="container">
            <div className="text-center text-primary pb-4 pt-4">

            <h2 >Signup</h2>
            </div>
            {success && showSuccessMessage()}
            <Mutation mutation={SIGNUP_USER} variables={{ username,email,password }}>
                {
                    ( signupUser,{data,error,loading})=>{
                        return (
                            !success && (

                                <form action="" className="form-group" onSubmit={handleSubmit(signupUser)}>
                <input type="text" required className="form-control mb-4"name="Type your Username" value={username} onChange={handleChange('username')}placeholder="Username" id=""/>
                <input type="email"  required className="form-control mb-4" placeholder="Type your Email" name="email" id="" value={email} onChange={handleChange('email')}/>
                <input type="password" required className="form-control mb-4" name="password" placeholder="Type your password" id=""value={password} onChange={handleChange('password')}/>
                <input type="password" required className="form-control mb-4" name="passwordConfirm " placeholder="Confirm your password" id=""value={passwordConfirm} onChange={handleChange('passwordConfirm')}/>
                <button type="submit" className="btn btn-primary btn-lg btn-block"  disabled={loading||validateForm()}> Submit</button>
                {error && <Error error={error.message}/> }
                </form>
                )
                        )
                    }
                }
            </Mutation>
        </div>
    )
}

export default withRouter(Signup)
