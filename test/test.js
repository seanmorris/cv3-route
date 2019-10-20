import { Test } from 'cv3-test/Test';

import { PathTest     } from './PathTest';
import { PlainTest    } from './PlainTest';
import { RegexTest    } from './RegexTest';
import { PromiseTest  } from './PromiseTest';
import { ExtendedTest } from './ExtendedTest';

import { ExampleRouterTest } from './ExampleRouterTest';

Test.run(PathTest, PlainTest, RegexTest, ExtendedTest, PromiseTest, ExampleRouterTest);
