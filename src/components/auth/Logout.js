import React from 'react'
import {ApolloConsumer} from 'react-apollo';

import {withRouter } from 'react-router-dom';

const Logout = (props) => {
   // const history=useHistory();
    const handleLogout=(client)=>{
        localStorage.clear(); 
        client.resetStore();
        props.history.push('/')

    }
    return (
        <ApolloConsumer>
            {
                (client)=>{
                    console.log(client)
                    return (


        <button onClick={()=>handleLogout(client)}>
            Logout
        </button>
                    )
                }
            }
        </ApolloConsumer>
    )
}

export default withRouter(Logout)
