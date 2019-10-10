import { Inject } from 'cv3-inject/Inject';

import { PathTest    } from './PathTest';
import { PlainTest   } from './PlainTest';
import { RegexTest   } from './RegexTest';
import { PromiseTest } from './PromiseTest';

const pathTest  = new PathTest();
const plainTest = new PlainTest();
const regexTest = new RegexTest();
const promiseTest = new PromiseTest();

pathTest.run();
plainTest.run();
regexTest.run();
promiseTest.run();
