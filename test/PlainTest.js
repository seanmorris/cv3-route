import { Inject } from 'cv3-inject/Inject';

import { Router } from './Router';
import { Path   } from './Path';

export class PlainTest extends Inject(class{}, {

	Name:    'PlainTest'

	, paths: {
		'':               'index!'
		, 'index':        'index!'
		, 'test/404':     'not found!'
		, 'sub':          'sub::index'
		, 'sub/func/aaa': 'sub::method::aaa'
	}

	, Router: Inject(Router, {routes: {

		index: (router, path) => {
			return 'index!';
		}

		, sub: Inject(Router, {routes: {

			index:  'sub::index'

			, func: (router, path) => {
				return `sub::method::${path.consume()}`;
			}

		}})

		, false: () => 'not found!'

	}})

}){
	run()
	{
		const router = new this.Router;


		for(const source in this.paths)
		{
			const expected    = this.paths[source];

			const path        = new Path(source);
			const result      = router.route(path);

			console.assert(
				 result === expected
				, `Router returned unexpected result for...
source:   "${source}"
returned: "${result}"
expected: "${expected}"
`
			);
		}
	}
}
