import React from 'react'
import {Link ,NavLink} from 'react-router-dom';
import Logout from './auth/Logout';

const Navbar = ({session}) => {
   // console.log(props.session)
    const token=localStorage.getItem('token');
    return (
        <nav>
            {!token && <NavbarUnAuth/>}
            {token && <NavbarAuth session={session}/>}
        </nav>
    )
}
const NavbarUnAuth=()=>
{
    return (
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/search">Search</NavLink>
                
            </li>
            <li>
                <NavLink to="/login">Login</NavLink>

            </li>
            <li>
                <NavLink to="/signup">Signup</NavLink>

            </li>
        </ul>
    )
}
const NavbarAuth=({session})=>{
    return (
        <React.Fragment>
          <ul>
            <li>
                <NavLink to="/" exact>Home</NavLink>
            </li>
            <li>
                <NavLink to="/search">Search</NavLink>
                
            </li>
          
            <li>
                <NavLink to="/recipe/add">Add Recipe</NavLink>

            </li>
            <li>
                <NavLink to="/profile">Profile</NavLink>

            </li>
            <li>
                <Logout/>
            </li>
        </ul>
        {/* {session &&(

            <h2>
            Welcome {session.getCurrentUser.username}
        </h2>
        )} */}
        </React.Fragment>
    )
}

export default Navbar
