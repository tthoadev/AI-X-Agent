import { readFileSync, existsSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { Cookie } from 'tough-cookie';

const COOKIE_FILE = resolve(
  process.cwd(),
  'src/modules/twitter/utils/cookies.json',
);

export const saveCookiesToFile = (cookies: Cookie[]): void => {
  writeFileSync(COOKIE_FILE, JSON.stringify(cookies, null, 2), 'utf8');
};

export const loadCookiesFromFile = (): Cookie[] | null => {
  if (existsSync(COOKIE_FILE)) {
    const data = readFileSync(COOKIE_FILE, 'utf8');
    return JSON.parse(data).reduce((acc: Cookie[], c) => {
      const cookie = Cookie.fromJSON(c);
      return cookie ? [...acc, cookie] : acc;
    }, []);
  }
};
