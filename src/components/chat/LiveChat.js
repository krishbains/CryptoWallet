import React, {useState, useRef} from 'react'
import firebase from  "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import './Live_Chat.css'
import Animate_page from '../../Animate-page';
import {useAuthState} from  "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";

firebase.initializeApp({
    apiKey: "AIzaSyCapNfJORUJhYM5vot3g4zhQXfxMSOVSBY",
    authDomain: "my-first-projectchat.firebaseapp.com",
    projectId: "my-first-projectchat",
    storageBucket: "my-first-projectchat.appspot.com",
    messagingSenderId: "64406347123",
    appId: "1:64406347123:web:1e3528135601e8a6b2b906",
    measurementId: "G-DKSR9FCT50"
})
const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();



export const LiveChat = () => {
    
    const auth = firebase.auth();
    const firestore = firebase.firestore();
    const analytics = firebase.analytics();
    const [user] = useAuthState(auth);
    return (
        <Animate_page>
    <body className='body101'>
    <div className="App">
        <header>
            <h2>Crypto Wallet Customer Care Unit</h2>
            <SignOut />
        </header>

        <section className='section101'>
            {user ? <ChatRoom /> : <SignIn />}
        </section>

    </div>
    </body>
    </Animate_page>
    )
}
function SignIn() {

    const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
}

return (
    <>
    <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    </>
)

}

function SignOut() {
return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
)
}


function ChatRoom() {
const dummy = useRef();
const messagesRef = firestore.collection('messages');
const query = messagesRef.orderBy('createdAt').limit(25);

const [messages] = useCollectionData(query, { idField: 'id' });

const [formValue, setFormValue] = useState('');


const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
    text: formValue,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    uid,
    photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
}

return (
<section className='section101'>
    <main>

    {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>

    </main>

    <form className='form101' onSubmit={sendMessage}>

        <input className='input101' value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type in your enquiry" />

        <button className='button101' type="submit" disabled={!formValue}>🧑🏻‍💻</button>

    </form>
    </section>
    )
}


function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<>
    <div className={`message ${messageClass}`}>
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <p>{text}</p>
    </div>
    </>)
}
