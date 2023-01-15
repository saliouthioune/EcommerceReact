import React, { Component } from 'react'
import './ProductList.css'
class HeaderComponent extends Component{
 constructor(props){

 }
 render(){
 	return (
 		<div className='menu-hori'>
                    <ul>
                        <li><a>Acceuil</a></li>
                        <li><a>Contact</a></li>
                        <li><a>About</a></li>
                    </ul>
                    <p>Vous pouvez nous retrouver sur nos plateforme digitales</p>
         </div>
 		)
 }
}
export default HeaderComponent;