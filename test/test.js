import { Test } from 'cv3-test/Test';

import { PathTest     } from './PathTest';
import { PlainTest    } from './PlainTest';
import { RegexTest    } from './RegexTest';
import { PromiseTest  } from './PromiseTest';
import { ExtendedTest } from './ExtendedTest';

Test.run(PathTest, PlainTest, RegexTest, ExtendedTest, PromiseTest);
