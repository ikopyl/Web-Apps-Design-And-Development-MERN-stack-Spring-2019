import styled from 'styled-components';
import {Link} from 'react-router-dom'

class Navbar extends Component{
    render(){
        return(
            <div className = "navbar">
                <ul className = "navlist">
                    <Link className = "pokemon-tab" to= "/">Pokemon</Link>
                </ul>
            </div>   
        )
    }
}

export default Navbar;