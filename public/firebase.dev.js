const config = {
  URL: 'https://ida-ta-test.firebaseio.com',
  apiKey: 'AIzaSyAXVT7flKah4KpvyRhjVsRVpHHkFPr-GEQ',
  authDomain: 'ida-ta-test.firebaseapp.com',
  databaseURL: 'https://ida-ta-test.firebaseio.com',
  projectId: 'ida-ta-test',
  storageBucket: 'ida-ta-test.appspot.com',
  messagingSenderId: '868872887170',
  appId: '1:868872887170:web:816eb3e83e5a1ffa040d9b',
  measurementId: 'G-20W1340PD9'
};

const meta = {
  URL: 'https://pre-ignition-meta.firebaseio.com',
  databaseURL: 'https://pre-ignition-meta.firebaseio.com',
  apiKey: 'AIzaSyAbLJ5nMHaFS_YXioay8b28RnV43JvoEms',
  authDomain: 'readiness.firebaseapp.com'
};

// Note(cg): initialize apps.
firebase && firebase.initializeApp(config);
firebase && firebase.initializeApp(meta, 'meta');

console.info('FB test')
 
Object.defineProperty(firebase, 'uid', {
  get() { 
    const {currentUser} = firebase.auth();
    return currentUser && currentUser.uid || '';
  }
});