import React from 'react';

class WelcomePage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = 'welcome-page'>
                <h1 style = {{
                    textAlign: 'center',
                    color: 'white',
                    margin: '30px auto'
                }}>{this.props.title}</h1>
            </div>
        );
    }
}

export default WelcomePage;