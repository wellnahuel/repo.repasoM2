import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteHouse } from '../../redux/actions';
export class HouseCard extends Component {
  render() {
    return (
      <div>
        <button onClick={()=> this.props.deleteHouse(this.props.id)}>Eliminar</button>
                <Link to={`/houses/${this.props.id}`}>
                <h3>{this.props.name}</h3>
                </Link>
                <p>Region: {this.props.region}</p>
                <p>Price: {this.props.price}</p>
      </div>
    );
  }
}

export const mapDispatchToProps = {
    deleteHouse : (id) => this.dispatch(deleteHouse(id))
}

export default connect(null, mapDispatchToProps)(HouseCard);
