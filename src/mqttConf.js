/**
 * Message command bytes (128-255/0x80-0xFF)
 * https://github.com/firmata/protocol/blob/master/protocol.md
 */
const START_SYSEX = 0xf0,
  END_SYSEX = 0xf7

// Extended command

const ESP = 0x0e,
  UPGRADE = 0x09,
  BURN = 0x01,
  VERSION = 0x07

const WEBDUINO = 0x04,
  FARMING = 0x10,
  SETTIME = 0x02

const espVerCmd = new Uint8Array([START_SYSEX, ESP, VERSION, END_SYSEX])
const miniVerCmd = new Uint8Array([
  START_SYSEX,
  WEBDUINO,
  FARMING,
  0x05,
  END_SYSEX
])

const setupOverCmd = new Uint8Array([
  START_SYSEX,
  WEBDUINO,
  FARMING,
  0x04,
  END_SYSEX
])

const setTimeCmd = (min, sec) => {
  return new Uint8Array([
    START_SYSEX,
    WEBDUINO,
    FARMING,
    SETTIME,
    min,
    sec,
    END_SYSEX
  ])
}

const burnCmd = (urlCmd) => {
  return new Uint8Array([START_SYSEX, ESP, BURN, ...urlCmd, END_SYSEX])
}

const upgradeCmd = (urlCmd) => {
  return new Uint8Array([START_SYSEX, ESP, UPGRADE, ...urlCmd, END_SYSEX])
}

const cmdToArray = data => {
  let dataArray = data.split('').map(e => e.charCodeAt(0))
  return new Uint8Array([
    START_SYSEX,
    WEBDUINO,
    FARMING,
    0x03,
    ...dataArray,
    END_SYSEX
  ])
}

export { espVerCmd, miniVerCmd, setupOverCmd, setTimeCmd, burnCmd, upgradeCmd, cmdToArray }