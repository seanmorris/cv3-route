import { BaseTest } from './BaseTest';
import { Inject   } from 'cv3-inject/Inject';

import { Path   } from './Path';
import { Router } from './Router';

class ExtendedRouter extends Inject(Router, {routes: {

	index: (r,p) => r.index(p)

}}){

	constructor()
	{
		super();

		this.indexDoc = 'index doc body here!';
	}

	index(path)
	{
		return this.indexDoc;
	}

}

export class ExtendedTest extends Inject(BaseTest, {

	paths: { '': 'index doc body here!'}

	, router: ExtendedRouter

}){}
