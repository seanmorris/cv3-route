import { Test   } from 'cv3-test/Test';
import { Inject } from 'cv3-inject/Inject';

import { Path } from './Path';

export class PathTest extends Inject(Test, {
	paths: {
		'':            ['']
		, 'test':      ['test']
		, 'test/test': ['test', 'test']
		, 'test/a':    ['test', 'a']
		, 'a/b':       ['a', 'b']
		, 'a/b/c':     ['a', 'b', 'c']
		, 'a/b/c/d':   ['a', 'b', 'c', 'd']
	}
}){
	testPaths()
	{
		for(const source in this.paths)
		{
			const expected = this.paths[source];

			const path = new Path(source);

			let i = 0;

			for(const position in expected)
			{
				const expectation = expected[position];
				const result      = path.consume();

				this.assert(
					 result === expectation
					, `Path returned unexpected result for...
Test:     ${this.constructor.name}
source:   ${source}
position: ${position}
returned: ${result}
expected: ${expectation}
`
				);
			}
		}
	}
}
