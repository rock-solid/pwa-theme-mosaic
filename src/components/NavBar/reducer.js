import { MENU_OPEN, MENU_CLOSE } from './action';

export default function (state = null, action) {
  switch (action.type) {
  case MENU_OPEN:
    return true;
  case MENU_CLOSE:
    return false;
  default:
    return state;
  }
}
