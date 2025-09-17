
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyD0ZVw1DUEsPe19_NRkQhECzu_vI6q_cmA",
  authDomain: "chat-app-f9b7a.firebaseapp.com",
  projectId: "chat-app-f9b7a",
  storageBucket: "chat-app-f9b7a.firebasestorage.app",
  messagingSenderId: "936775144369",
  appId: "1:936775144369:web:de30c88e8257cc53e2a390"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const user = res.user;
		await setDoc(doc(db, 'users', user.uid), {
			id: user.uid,
			username: username.toLowerCase(),
			email,
			name: '',
			avatar: '',
			bio: 'Hey, There I am using chat app',
			lastSeen: Date.now()
		})
		await setDoc(doc(db, 'chats', user.uid), {
			chatData:[]
		})
	} catch (error) {
		console.error(error)
		toast.error(error.code.split('/')[1].split('-').join(' '))
	}
}

const login = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (error) {
		console.error(error)
		toast.error(error.code.split('/')[1].split('-').join(' '))
	}
}

const logout = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		console.error(error)
		toast.error(error.code.split('/')[1].split('-').join(' '))
	}
}

export {signup, login, logout, auth, db}