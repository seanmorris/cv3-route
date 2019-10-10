import { Inject } from 'cv3-inject/Inject';

import { Router } from './Router';
import { Path   } from './Path';

export class PromiseTest extends Inject(class{}, {

	Name:    'PromiseTest'

	, paths: {
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
	run()
	{
		const router = new this.Router;


		for(const source in this.paths)
		{
			const expected    = this.paths[source];

			const path        = new Path(source);
			
			router.route(path).then((result)=>{

				console.assert(
					 result === expected
					, `Router returned unexpected result for...
source:   "${source}"
returned: "${result}"
expected: "${expected}"
`
				);

			});

		}
	}
}
