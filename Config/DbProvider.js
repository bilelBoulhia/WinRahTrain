// GunProvider.js
import Gun from 'gun/gun';

const gun = Gun({
    peers: ['http://localhost:8081/gun']
});

export default gun;
