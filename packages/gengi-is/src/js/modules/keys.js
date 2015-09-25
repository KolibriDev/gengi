
let keys = {
  'mouse-left': 1,
  'mouse-middle': 2,
  'mouse-right': 3,
  'backspace': 8,

  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'capslock': 20,
  'escape': 27,
  'space': 32,
  'pageup': 33,
  'pagedown': 34,
  'end': 35,
  'home': 36,

  'arrow-left': 37,
  'arrow-up': 38,
  'arrow-right': 39,
  'arrow-down': 40,

  'print': 42,
  'insert': 45,
  'delete': 46,

  '0': 48,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  '6': 54,
  '7': 55,
  '8': 56,
  '9': 57,

  'a': 65,
  'b': 66,
  'c': 67,
  'd': 68,
  'e': 69,
  'f': 70,
  'g': 71,
  'h': 72,
  'i': 73,
  'j': 74,
  'k': 75,
  'l': 76,
  'm': 77,
  'n': 78,
  'o': 79,
  'p': 80,
  'q': 81,
  'r': 82,
  's': 83,
  't': 84,
  'u': 85,
  'v': 86,
  'w': 87,
  'x': 88,
  'y': 89,
  'z': 90,
  'cmd': 91,

  'numpad-0': 96,
  'numpad-1': 97,
  'numpad-2': 98,
  'numpad-3': 99,
  'numpad-4': 100,
  'numpad-5': 101,
  'numpad-6': 102,
  'numpad-7': 103,
  'numpad-8': 104,
  'numpad-9': 105,
  'numpad-multiply': 106,
  'numpad-add': 107,
  'numpad-subtract': 109,
  'numpad-decimal': 110,
  'numpad-divide': 111,

  'f1': 112,
  'f2': 113,
  'f3': 114,
  'f4': 115,
  'f5': 116,
  'f6': 117,
  'f7': 118,
  'f8': 119,
  'f9': 120,
  'f10': 121,
  'f11': 122,
  'f12': 123,
  'f13': 124,
  'f14': 125,
  'f15': 126,
  'f16': 127,
  'f17': 128,
  'f18': 129,
  'f19': 130,
  'f20': 131,
  'f21': 132,
  'f22': 133,
  'f23': 134,
  'f24': 135,

  'numlock': 144,
  'scrolllock': 145,
  'semicolon': 186,
  'equals': 187,
  'comma': 188,
  'dash': 189,
  'period': 190,
  'forwardslash': 191,
  'graveaccent': 192,
  'openbracket': 219,
  'backslash': 220,
  'closebraket': 221,
  'singlequote': 222,
};

keys.isFunctionalKey = (which) => {
  which = which || 0;
  return which === keys.ctrl ||
    which === keys.alt ||
    which === keys.home ||
    which === keys.end ||
    which === keys.shift ||
    which === keys.tab ||
    which === keys.cmd ||
    which === keys['arrow-left'] ||
    which === keys['arrow-up'] ||
    which === keys['arrow-right'] ||
    which === keys['arrow-down'];
};
keys.isClickModifier = (event) => {
  return event && (event.ctrlKey ||
    event.metaKey ||
    event.which === keys['mouse-middle']);
};
keys.isTextModifier = (which) => {
  which = which || 0;
  return which === keys.space ||
    which === keys.delete ||
    which === keys.backspace;
};
keys.which = (keyCode) => {
  for (let prop in keys){
    if (keys.hasOwnProperty(prop) && keys[prop] === keyCode){
      return prop;
    }
  }
  return false;
};

export let isFunctionalKey = keys.isFunctionalKey;
export let isClickModifier = keys.isClickModifier;
export let isTextModifier = keys.isTextModifier;
export let which = keys.which;

export default keys;
