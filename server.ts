radio.setGroup(69);
radio.setTransmitPower(7);
radio.setTransmitSerialNumber(true);

let serialNums: string[] = [];
let votes: number[] = [];
let hlasovani = false;

input.onButtonPressed(Button.A, () => {
    hlasovani = !hlasovani
    if (hlasovani) {
        basic.showIcon(IconNames.Yes);
        radio.sendValue("enable", 1);
    } else {
        basic.showIcon(IconNames.No);
        radio.sendValue("enable", 0);
        for(let i=1;i<=26;i++) {
            const numOfTimes = votes.filter((v) => (v === i)).length;
            if (numOfTimes !== 0) console.log(String.fromCharCode(64 + i) + " : " + numOfTimes);
        }
    }
});

input.onButtonPressed(Button.B, () => {
    serialNums = [];
    votes = [];
});

radio.onReceivedValue((name, value) => {
    if (!hlasovani) return;
    if (name !== "vote") return;
    if (!between(value, 65, 90)) return; 
    const serial = radio.receivedSerial().toString();
    if (serialNums.indexOf(serial) > -1) {
        votes[serialNums.indexOf(serial)] = value;
    } else {
        serialNums.push(serial);
        votes.push(value);
    }
    radio.sendValue("ack", radio.receivedSerial());
});

function between(x: number, min: number, max: number) {
    return x >= min && x <= max;
}
