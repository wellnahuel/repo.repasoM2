import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Nav extends Component {

    render() {
        return (
            <div>            
                <Link to="/">Home</Link>
                <Link to="/house/create">Create House</Link>
            </div>
        );
    };
};

export default Nav;
