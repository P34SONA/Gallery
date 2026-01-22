// 🔴 REPLACE WITH YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const db = firebase.firestore();

function uploadImage() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) return alert("Please select an image");

  const storageRef = storage.ref("images/" + Date.now() + "_" + file.name);
  storageRef.put(file).then(snapshot => {
    snapshot.ref.getDownloadURL().then(url => {
      db.collection("photos").add({ url });
      loadImages();
    });
  });
}

function loadImages() {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  db.collection("photos").get().then(snapshot => {
    snapshot.forEach(doc => {
      const img = document.createElement("img");
      img.src = doc.data().url;
      gallery.appendChild(img);
    });
  });
}

loadImages();
