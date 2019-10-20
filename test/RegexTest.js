import { BaseTest } from './BaseTest';
import { Inject   } from 'cv3-inject/Inject';

import { Router } from './Router';
import { Path   } from './Path';

const paths = {
	'':           'index!'
	, 'index':    'index!'
	, 'test/404': 'not found!'

	, 'pattern-1-wow-it-works': 'regex working.'
	, 'pattern-2-a-b':          'a::b'
	, 'pattern-2-0x29a-lmao':   '0x29a::lmao'

	, 'sub-a': 'sub A index!'

	, 'sub-a/pattern-a': 'sub::a::a'
	, 'sub-a/pattern-b': 'sub::a::b'

	, 'sub-a/pattern-c': 'not found sub A!'

	, 'sub-b': 'sub B index!'

	, 'sub-b/pattern-a': 'sub::b::a'
	, 'sub-b/pattern-b': 'sub::b::b::'

	, 'sub-b/pattern-b-':     'sub::b::b::'
	, 'sub-b/pattern-b-abcd': 'sub::b::b::abcd'
	, 'sub-b/pattern-b-z':    'sub::b::b::z'

	, 'sub-b/pattern-c': 'not found sub B!'
};

const routes = {
	index: 'index!'

	, '/^pattern-1-[\\w-]+$/': (router, path, groups) => {

		return 'regex working.';
	}

	, '/^pattern-2-(.+?)-(.+?)$/': (router, path, groups) => {
		return `${groups[1]}::${groups[2]}`;
	}

	, '/^sub-a-?.*$/': Inject(Router, {routes: {
		index: 'sub A index!'

		, '/pattern-a-?.*/': (router, path) => {
			return `sub::a::a`;
		}

		, '/pattern-b-?(.*)/': (router, path, groups) => {
			return `sub::a::b`;
		}

		, false: () => 'not found sub A!'
	}})

	, '/^sub-b-?.*$/': (router, path, groups) => {
		return (new (Inject(Router, {routes: {

			index: 'sub B index!'

			, '/pattern-a-?.*/': (router, path) => {
				return `sub::b::a`;
			}

			, '/pattern-b-?(.*)/': (router, path, groups) => {
				return `sub::b::b::${groups[1]}`;
			}

			, false: () => 'not found sub B!'
		}}))).route(path);

	}

	, false: () => 'not found!'

};

export class RegexTest extends Inject(BaseTest, {
	paths, router: Inject(Router, {routes})
}){}
