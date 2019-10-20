import { BaseTest } from './BaseTest';

// import { Test   } from 'cv3-test/Test';
import { Inject } from 'cv3-inject/Inject';

import { Path   } from './Path';
import { Router } from './Router';

console.log(Inject);

const paths = {
	'':        'Hello, world!'
	, 'index': 'Hello, world!'
	, 'other': 'Other route!'
	, 'regex': 'Not found!'

	, 'do-something': 'did something.'

	, 'do-something-else': 'did something.'

	, 'regex-one':           'one'
	, 'regex-one-two':       'one,two'
	, 'regex-one-two-three': 'one,two,three'

	, 'nested':     'Nested index.'
	, 'nested/sub': 'Nested route.'

	, 'promise': 'fulfilled.'
};

const nestedRoutes = {
	index: 'Nested index.'
	, sub: 'Nested route.'
}

const routes = {
	index: 'Hello, world!'

	, other: 'Other route!'

	, 'do-something': (router, path) => {

		return 'did something.';
	}

	, 'do-something-else': (router, path) => {

		return router.internalMethod();
	}

	, [/^regex-([-\w]+)$/]: (router, path, matchGroups) => {

		return matchGroups[1].split('-').join(',');
	}

	, nested: Inject(Router, {routes: nestedRoutes})

	, promise: new Promise((accept, reject) => {

		accept('fulfilled.');

	})

	, [false]: 'Not found!'
};

class ExampleRouter extends Inject(Router, {routes})
{
	internalMethod()
	{
		return 'did something.';
	}
};

export class ExampleRouterTest extends Inject(BaseTest, {
	paths, router: ExampleRouter
}){};
