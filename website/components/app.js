import { Component } from 'react'; 

class App extends Component {
    constructor({ props }) {
        this.props = props; 
    }

    render() {
        return(
            <div className = "label">
                <h1>{this.props.name}</h1>
                <p>{this.props.description}</p>
            </div> 
        ); 
    }
}; 
export default App; 