import {
  isNotNull,
  isNumber
} from './validators'

export function parseString(target) {
  return isNotNull(target) ? target : '';
}

export function parseNumber(target) {
  return isNumber(target) ? Number(target) : 0;
}
