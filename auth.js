
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



document.addEventListener("DOMContentLoaded", () => {
  const navbarPlaceholder = document.getElementById("navbar-placeholder");


  if (navbarPlaceholder) {
    fetch("/navbar/navbar.html")
      .then(res => res.text())
      .then(data => {
        navbarPlaceholder.innerHTML = data;

        handleAuthState();
      })
      .catch(err => {
        console.error("Failed to load navbar:", err);
      });
  } else {
    handleAuthState();
  }
});



function handleAuthState() {
  auth.onAuthStateChanged(user => {
    const userActionDiv = document.getElementById('user-actions');
    if (userActionDiv) {
      if (user) {
        console.log("User is currently logged in", user.email);

        userActionDiv.innerHTML = `
          <button id="logoutBtn" class="btn">Logout</button>
        `;

        document.getElementById('logoutBtn').onclick = () => {
          auth.signOut().then(() => {
            window.location.href = '/indexPage/index.html';
          });
        };

      } else {
        console.log("User is currently logged out");
        userActionDiv.innerHTML = `
          <a href="/loginPage/login.html" class="btn">Login</a>
        `;
      }
    }
    if (typeof initializeApp === 'function') {
      
      initializeApp(user);
    } else if (typeof initializeMyLists === 'function') {
     
      initializeMyLists(user);
    }
  });
}
