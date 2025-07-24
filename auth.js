const firebaseConfig = {
    apiKey: "AIzaSyBF1cn4PIeBleA829KzhBhNhhSWpP0NixI",
    authDomain: "movierecommendation-c0d63.firebaseapp.com",
    projectId: "movierecommendation-c0d63",
    storageBucket: "movierecommendation-c0d63.firebasestorage.app",
    messagingSenderId: "732786819066",
    appId: "1:732786819066:web:cb79d3e76e19228669ee43",
    measurementId: "G-XLZDXBZTC1"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();



auth.onAuthStateChanged(user => {
    const userActionDiv = document.getElementById('user-actions');
    if (userActionDiv) {
        if (user) {
            console.log("User is currently logged in", user.email);

            userActionDiv.innerHTML = `
                <a href="mylists.html" class="btn">My Lists</a>
                <button id="logoutBtn" class="btn">Logout</button>
            `;

            document.getElementById('logoutBtn').onclick = () => {
                auth.signOut().then(() => {
                    window.location.href = 'index.html';
                }
                )
            }

        }
        else {
            console.log("User is currently logged out");
            userActionDiv.innerHTML = `
                <a href="login.html" class="btn">Login</a>
            `;
        }
    }
});