/**
 * Message command bytes (128-255/0x80-0xFF)
 * https://github.com/firmata/protocol/blob/master/protocol.md
 */
const START_SYSEX = 0xf0,
  END_SYSEX = 0xf7;

// Extended command

const ESP = 0x0e,
  UPGRADE = 0x09,
  BURN = 0x01,
  VERSION = 0x07;

const WEBDUINO = 0x04,
  FARMING = 0x10,
  SETTIME = 0x02;

const espVerCmd = new Uint8Array([START_SYSEX, ESP, VERSION, END_SYSEX]);
const miniVerCmd = new Uint8Array([
  START_SYSEX,
  WEBDUINO,
  FARMING,
  0x05,
  END_SYSEX
]);

const setupOverCmd = new Uint8Array([
  START_SYSEX,
  WEBDUINO,
  FARMING,
  0x04,
  END_SYSEX
]);
const relayOnCmd = new Uint8Array([
  START_SYSEX,
  WEBDUINO,
  FARMING,
  3,
  111,
  110,
  61,
  116,
  114,
  117,
  101,
  END_SYSEX
]);
const relayOffCmd = new Uint8Array([
  START_SYSEX,
  WEBDUINO,
  FARMING,
  3,
  111,
  102,
  102,
  61,
  116,
  114,
  117,
  101,
  END_SYSEX
]);
const showCmd = new Uint8Array([START_SYSEX, WEBDUINO, FARMING, 3, 115, 104, 111, 119, 61, 116, 114, 117, 101, END_SYSEX]
);

let setTimeCmd = (min, sec) => {
  return new Uint8Array([
    START_SYSEX,
    WEBDUINO,
    FARMING,
    SETTIME,
    min,
    sec,
    END_SYSEX
  ]);
}

let burnCmd = (urlCmd) => {
  return new Uint8Array([START_SYSEX, ESP, BURN, ...urlCmd, END_SYSEX]);
}

let upgradeCmd = (urlCmd) => {
  return new Uint8Array([START_SYSEX, ESP, UPGRADE, ...urlCmd, END_SYSEX]);
}

export { espVerCmd, miniVerCmd, setupOverCmd, relayOnCmd, relayOffCmd, showCmd, setTimeCmd, burnCmd, upgradeCmd }