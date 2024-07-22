import Toast from 'react-native-root-toast';

function ShowToast(message, duration = 'SHORT') {
    console.log('Toast triggered with message:', message);

    let Duration;

    switch (duration) {
        case 'LONG':
            Duration = Toast.durations.LONG;
            break;
        case 'SHORT':
            Duration = Toast.durations.SHORT;
            break;
        default:
            Duration = Toast.durations.SHORT;
            break;
    }

    Toast.show(message, {
        duration: Duration,
        position: Toast.positions.BOTTOM,
    });
}

export default ShowToast;
