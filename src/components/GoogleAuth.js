import React from 'react';

class GoogleAuth extends React.Component {

    state = {isSignedIn: null}
    auth = null;

    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            //API Loaded
            window.gapi.client.init(
                {
                    clientId: '282005459331-cgnetgjnc32jsltlvc57jvta0hb6d0oh.apps.googleusercontent.com',
                    scope: 'email'
                }
            ).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange();
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }
    
    onAuthChange = () => {
        this.setState({isSignedIn: this.auth.isSignedIn.get()});
    }

    renderAuthButton() {
        if(this.auth === null){
            return null;
          //  return <div>loading</div>;
        }
        else if(this.state.isSignedIn){
            return (
                <button className="ui red google button" onClick={this.auth.signOut} >
                    <i className="google icon"></i>Sign Out
                </button>
            );
        }
        else {
            return (
                <button className="ui red google  button" onClick={this.auth.signIn} >
                    <i className="google icon"></i>
                    Sing In with Google
                    </button>
            );
        }
    }

    render(){
       
        return (
        <div className="item" >{this.renderAuthButton()}</div>
        );

    }
}

export default GoogleAuth;