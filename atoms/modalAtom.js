import { atom } from 'recoil';

// creates an atom, which represents a piece of writeable state
export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const modalTypeState = atom({
  key: 'modalTypeState',
  default: 'dropIn',
});
