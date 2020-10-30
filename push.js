const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BFP0WYLZIKyu56zKuUUw0gWsh6A0wGXn9L_SqrBM-656hBSKqeXgJaVBFovvQeM2uEmKEICF21Jhxd4oapwOKn8",
   "privateKey": "1zvGmukWxtnjSklpq6CEfNMMLCXxm5KoCk9N1z24Iu4"
};
 
 
webPush.setVapidDetails(
   'juanvaleriandelima9@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/f8dhX7-WFL8:APA91bH71UkzmSSlf2F-iPxKFfFv3G59-xRa67FQci4BH2EfqourfdQs3P0bJp0RPJNwaUGNzuZkeprrR-avv0ANwaq_yjFYYHWzSbJnDc2lXnq8fl8oMAdfwDo8a-Qjn9QrXk1bwIaJ",
   "keys": {
       "p256dh": "BHK6dHbw5rnr5erqBC+AOSkGO7Kkp7beNZJZoSIiKitaqSJ3o/FzYNRbLq/YtP2e7tbr/KnfxiV611Iwg0OvyrE=",
       "auth": "vYMQtoAK3iDOeOtU+scGmQ=="
   }
};

const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
const options = {
   gcmAPIKey: '745683224092',
   TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
);