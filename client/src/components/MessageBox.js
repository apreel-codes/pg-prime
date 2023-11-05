import Alert from 'react-bootstrap/Alert';


const MessageBox = (props) => {
    return(
        <Alert className='mx-auto message-box-text' variant = {props.variant || 'info'} > {props.children} </Alert>
    )
}

export default MessageBox;