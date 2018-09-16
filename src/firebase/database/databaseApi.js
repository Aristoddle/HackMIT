import {db} from '../firebase.js';

// {
//   userEmail: '',
//   roomName: '',
//   roomType: '',
//   itemName: '',
//   itemType: '',
//   description: '',
//   date: '',
//   amazon: '',
//   features: '',
// }
export const addItem = function(user, item) {
  db.collection('items').doc(item.itemName).set(item, {merge: true})
  .then(() => {
      console.log('Successfully updated ' + item.itemName);
    }).catch(() => {
      console.log('Failed to update student.');
    });
};

// {
//   userEmail: '',
//   roomName: '',
//   roomType: '',
//   molding: '',
//   wallCovering: '',
//   special: '',
// }
export const addRoom = function(user, room) {
  db.collection('rooms').doc(user.email + room.roomName).set(room, {merge: true})
  .then(() => {
      console.log('Successfully updated ' + room.roomName);
    }).catch(() => {
      console.log('Failed to update student.');
    });
};


// {
//   walls: '',
//   roof: '',
//   cost: '',
//   footage: '',
//   rooms: '',
// }
export const addUserInfo = function(user, newUserInfo) {
  db.collection('user').doc(user.email).set(newUserInfo, {merge: true})
  .then(() => {
      console.log('Successfully updated ' + user.email);
    }).catch(() => {
      console.log('Failed to update student.');
    });
};
