// GunProvider.js
import Gun from 'gun/gun';

const gun = Gun({
    peers: ['http://localhost:8080/gun']
});

export default gun;
