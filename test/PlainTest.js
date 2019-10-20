import { BaseTest } from './BaseTest';

// import { Test   } from 'cv3-test/Test';
import { Inject } from 'cv3-inject/Inject';

import { Router } from './Router';
import { Path   } from './Path';

const paths = {
	'':               'index!'
	, 'index':        'index!'
	, 'test/404':     'not found!'
	, 'sub':          'sub::index'
	, 'sub/func/aaa': 'sub::method::aaa'
};

const routes = {

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

};

const router = Inject(Router, {routes})

export class PlainTest extends Inject(BaseTest, {paths, router}){};
