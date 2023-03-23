import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllHouses } from '../../redux/actions';
import HouseCard from '../HouseCard/HouseCard';

export class Houses extends Component {

    componentDidMount(){
        this.props.getAllHouses()        
    }
    
    render() {
        return (
            <div  >
                <h1>Inmobiliaria</h1>
                <img src='https://blog.wearedrew.co/hubfs/claves%20para%20una%20venta%20inmobiliaria%20exitosa.jpg' alt="main-img"></img>

                <h3>Houses</h3>

                {this.props.houses && this.props.houses.map((house)=>
                (
                 <HouseCard 
                 id = {house.id}
                 region = {house.region}
                 name = {house.name}
                 price = {house.price}                 
                 description = {house.description}
                 key={house.id}
                 />
                 ))}

            </div>
        );
    };
};

export const mapStateToProps = function (state){
    return {
        houses: state.houses
    }
};

export const mapDispatchToProps = function (dispatch) {
    return  {
        getAllHouses: ()=> dispatch(getAllHouses())
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(Houses);

