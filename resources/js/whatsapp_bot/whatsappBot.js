// to run this: node resources/js/whatsapp_bot/whatsappBot
const Pusher = require('pusher-client');

// start

// finish

// ss
const venom = require('venom-bot')
venom
.create()
.then((client) => start(client))
.catch((erro) => {
    console.log(erro);
});

function start(client) {
    var pusher = new Pusher('a8fe726433fc3d791d0f', {
        cluster: 'ap2'
        });
        var channel = pusher.subscribe('grade');
    
        channel.bind('newMsg', function(data) {
            let message = {"phone":data.phone,"grade":data.grade,"lesson":data.lesson}
        
        client
        .sendText(message["phone"]+'@c.us', 'نمره شما ثبت شد.\n نام درس:'+message["lesson"]+'\nنمره:'+message["grade"]+'\nخدانگهدار')
        .then((result) => {
            console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
        });

    });


}
// ee