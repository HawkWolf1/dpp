import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import {getAuth, GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"

  const firebaseConfig = {
    apiKey: "AIzaSyBOSj56PSkbhDlonxVOECmMRsORfWelIbk",
    authDomain: "delivery-pickup-portal-7d84d.firebaseapp.com",
    databaseURL: "https://delivery-pickup-portal-7d84d-default-rtdb.firebaseio.com",
    projectId: "delivery-pickup-portal-7d84d",
    storageBucket: "delivery-pickup-portal-7d84d.appspot.com",
    messagingSenderId: "127526172603",
    appId: "1:127526172603:web:e73537907e475c818e769e",
    measurementId: "G-WY695TL07G"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)
  auth.languageCode = 'en'
  const provider = new GoogleAuthProvider()

  const googleLogin = document.getElementById('login')

  googleLogin.addEventListener('click', async function (e) {
    e.preventDefault();
    console.log('google sign-in');

    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        

        const email = user.email;
        const serverResponse = await axios.post("http://localhost:4000/user/login", {
            email: email
        });

        console.log('Server response:', serverResponse.data);
        localStorage.setItem('token', serverResponse.data.token)   
        window.location.href = "./dpp.html";
    

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error: ${errorCode}, Message: ${errorMessage}`);
    }
});