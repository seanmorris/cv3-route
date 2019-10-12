import { Test   } from 'cv3-test/Test';
import { Inject } from 'cv3-inject/Inject';

import { Router } from './Router';
import { Path   } from './Path';

export class PromiseTest extends Inject(Test, {

	paths: {
		'':        'Accepted.'
		, 'index': 'Accepted.'
		, 'delay': 'Delayed acceptance.'
	}

	, Router: Inject(Router, {routes: {
		index: () => Promise.resolve( 'Accepted.' )

		, delay: () => new Promise((accept, reject) => {

			setTimeout((args) => { accept( 'Delayed acceptance.' ) }, 2500);

		})
	}})

}){
	testRoutes()
	{
		const router   = new this.Router;
		const promises = [];

		for(const source in this.paths)
		{
			const expected    = this.paths[source];

			const path        = new Path(source);
			
			promises.push(router.route(path).then((result)=>{

				this.assert(
					 result === expected
					, `Router returned unexpected result for...
Test:     ${this.constructor.name}
source:   "${source}"
returned: "${result}"
expected: "${expected}"
`
				);

			}));

		}

		return Promise.all(promises.filter(x=>x));
	}
}
