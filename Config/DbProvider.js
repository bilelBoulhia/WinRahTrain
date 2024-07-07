// GunProvider.js
import Gun from 'gun/gun';

const gun = Gun({
    peers: ['http://localhost:8765/gun']
});

export default gun;
