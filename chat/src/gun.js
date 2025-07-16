import Gun from 'gun/gun';
import SEA from'gun/sea';

const gun = Gun(['http://localhost:3000/gun']);
export function getChatId(pub1, pub2) {
    return [pub1, pub2].sort().join(':');
}
export default gun;

const user = gun.user();
async function sendPM(toPub, msg) {
    const myPub = user.is.pub;
    const chatId = getChatId(myPub, toPub);

    const encrypted = await SEA.encrypt(msg, await gun.user(toPub).get('epub').then());
    gun.get('chats').get(chatId).set({
        from: myPub,
        to: toPub,
        when: Date.now(),
        message: encrypted,
    })

}

function listening(fromPub){
    const myPub = user.is.pub;
    const chatId = getChatId(myPub, fromPub);

    gun.get('chats').get(chatId).map().on(async data => {
        if(!data || !data.message) return;
        const decrypted = await SEA.decrypt(data.message, user._.sea);
        console.log('Decrypted message:', decrypted);
    })
}

window.gun = gun;
window.user = user;
window.sendPM = sendPM;
window.listening = listening;
