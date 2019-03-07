import React, { Component } from 'react';

//redux:
import { connect } from 'react-redux'
import { updateUser, clearState } from '../../ducks/reducer'

import axios from 'axios'

class Header extends Component {

    componentDidMount(){
        this.handleCurrent()
    }

    handleCurrent = async () => {
        if (this.props.pathname.includes('/day')) {
            const { id } = this.props
            console.log(id)
            if (!id) {
                try {
                    let verifySession = await axios.get('/auth/current')
                    this.props.updateUser(verifySession.data)
                }catch(error) {
                    this.props.push('/')
                }
            } 
        }
    }

    handleLogout =  () => {
        axios.post('/auth/logout')
        this.props.clearState()
        this.props.push('/')            
    }

    render() {
        return (
            <header>
                {this.props.pathname.includes('/day') &&
                    <>
                        <h1>Header</h1>
                        <h2>Hello {this.props.name}!</h2>
                        <button onClick={this.handleLogout}>Logout</button>
                    </>
                }
            </header>
        );
    }
}

const mapStateToProps = ( reduxState ) => {
    const { name, id } = reduxState
    return {
        name,
        id
    }
}

const mapDispatchToProps = {
    updateUser,
    clearState
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)