radio.setGroup(69);
radio.setTransmitPower(7);
radio.setTransmitSerialNumber(true);

let enabled = false;
let vote = 0;

radio.onReceivedValue((name, value) => {
    if (name === "enable") {
        if (value === 0) {
            enabled = false;
            basic.showIcon(IconNames.No);
        } else if (value === 1) {
            enabled = true;
            basic.showString(String.fromCharCode(65+vote));
        }
    }
    if (enabled && name === "ack" && value === control.deviceSerialNumber()) basic.showIcon(IconNames.Yes);
});

input.onButtonPressed(Button.A, () => {
    if (!enabled) return;
    vote -= 1;
    if (vote < 0) {
        vote = 25;
    }
    basic.showString(String.fromCharCode(65+vote));
});

input.onButtonPressed(Button.B, () => {
    if (!enabled) return;
    vote += 1;
    if (vote > 25) {
        vote = 0;
    }
    basic.showString(String.fromCharCode(65 + vote));
})
