import { Inject } from 'cv3-inject/Inject';
import { Test   } from 'cv3-test/Test';
import { Router } from './Router';
import { Path   } from './Path';

const paths = {};

export class BaseTest extends Inject(Test, {paths: {} , router: Router})
{
	testRoutes()
	{
		for(const source in this.paths)
		{
			const expected = this.paths[source];
			const path     = new Path(source);
			const result   = this.router.route(path);

			this.assert(
				result === expected
				,  `Router returned unexpected result for...
					Test:     ${this.constructor.name}
					source:   "${source}"
					returned: "${result}"
					expected: "${expected}"`.replace(/^\s+/g)
			);
		}
	}
}
