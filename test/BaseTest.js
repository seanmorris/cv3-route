import { Inject } from 'cv3-inject/Inject';
import { Test   } from 'cv3-test/Test';
import { Router } from './Router';
import { Path   } from './Path';

const paths = {};

export class BaseTest extends Inject(Test, {paths: {} , router: Router})
{
	testRoutes()
	{
		const results = [];

		for(const source in this.paths)
		{
			const expected = this.paths[source];
			const path     = new Path(source);
			let result     = this.router.route(path);

			if(!(result instanceof Promise))
			{
				result = Promise.resolve(result);
			}

			results.push(result.then((returned)=>{

				this.assert(
					returned === expected
					,  `Router returned unexpected result for...
						Test:     ${this.constructor.name}
						source:   "${source}"
						returned: "${result}"
						expected: "${expected}"`.replace(/^\s+/g)
				);

			}));

		}

		return Promise.all(results);
	}
}
