import * as AES from 'aes-everywhere';
import * as dotenv from 'dotenv';
import { SQLManager } from '../src/api/managers/SQLManager';

dotenv.config();

const pass = 'U2FsdGVkX1+G8Ye7AfCeXkT5STP1tgYGn2ubFNf3Y8Q=';
const plainPass = AES.decrypt(pass, process.env.PASS_ENCTYPT_KEY);

console.log(plainPass);

const pp = AES.encrypt('3.jqy.6-8HWC', process.env.PASS_ENCTYPT_KEY);

console.log(pp);
