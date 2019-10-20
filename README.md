![avatar](https://avatars3.githubusercontent.com/u/640101?s=80&v=4)

# cv3-route

Simple routing for ES6.
<!--
![cv3-route](https://img.shields.io/badge/cv3-route-darkred?style=for-the-badge) ![Version Badge](https://img.shields.io/npm/v/cv3-route?label=ver&style=for-the-badge) ![Travis (.org)](https://img.shields.io/travis/seanmorris/cv3-route?style=for-the-badge) ![Downloads Badge](https://img.shields.io/npm/dm/cv3-route?color=338800&style=for-the-badge) ![Size badge](https://img.shields.io/github/languages/code-size/seanmorris/cv3-route?style=for-the-badge) ![Apache-2.0 Licence Badge](https://img.shields.io/npm/l/cv3-route?color=338800&style=for-the-badge)
-->

![cv3-route](https://img.shields.io/badge/cv3-route-darkred?style=for-the-badge) ![Travis (.org)](https://img.shields.io/travis/seanmorris/cv3-route?style=for-the-badge) ![Size badge](https://img.shields.io/github/languages/code-size/seanmorris/cv3-route?style=for-the-badge)

## Install

```bash
$ npm install cv3-route
```

## Usage

### Creating routers

Inject your routes into the `Router` class to produce a routable subclass.

Scalar values will be returned directly, methods will be evaluated & returned.

`[false]` will be called if no other routes match.

```javascript
import { Inject } from 'cv3-inject/Inject';
import { Router } from 'cv3-route/Router';

const routes = {
    index:     'Hello, world!'
    , other:   'Other route!'
    , [false]: 'Not found!'
};

export class ExampleRouter extends Inject(Router, {routes})
{
    // Non-routable methods here
};
```

### Routing

Pass a `cv3-route/Path` object to the `route` method on the `Router` object

```javascript
import { ExampleRouter } from './ExampleRouter';
import { Path } from 'cv3-route/Path';

const exampleRouter = new ExampleRouter;

const emptyPath = new Path('');
const indexPath = new Path('index');
const otherPath = new Path('other');
const errorPath = new Path('does-not-exist');

console.log(exampleRouter.route(emptyPath));
console.log(exampleRouter.route(indexPath));
console.log(exampleRouter.route(otherPath));
console.log(exampleRouter.route(errorPath));

```

### Routing to methods

You can route to methods instead of directly returning strings. The router object will be passed as the first parameter, and the current path will be passed as the second parameter.

Internal methods may be called on the router.

```javascript
import { Inject } from 'cv3-inject/Inject';
import { Router } from 'cv3-route/Router';

const routes = {
    'do-something': (router, path) => {
        return 'did something.';
    }

    , 'do-something-else': (router, path) => {
        return router.internalMethod();
    }
};

class ExampleRouter extends Inject(Router, {routes})
{
    internalMethod()
    {
        return 'did something.';
    }
};
```

```javascript
import { ExampleRouter } from './ExampleRouter';
import { Path } from 'cv3-route/Path';

const exampleRouter = new ExampleRouter;

const somethingPath = new Path('do-something');
const somethingElsePath = new Path('do-something-else');

console.log(exampleRouter.route(somethingPath));
console.log(exampleRouter.route(somethingElsePath));

```

### Regex Routing

Regex based routing can be achieved with [computed property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names).

The [square bracket] syntax allows us to maintain regex syntax highlighting in the IDE. Quotes may also be used. Any property starting with a `/` will be processed as a regex path.

If a method is supplied, it will be called with the match groups from the regex operation as the 3rd parameter.

```javascript
import { Inject } from 'cv3-inject/Inject';
import { Router } from 'cv3-route/Router';

const routes = {
    [/^regex-([-\w]+)$/]: (router, path, matchGroups) => {

        return matchGroups[1].split('-').join(',');
    }
};

class ExampleRouter extends Inject(Router, {routes})
{
    // Non-routable methods here
};
```

```javascript
import { ExampleRouter } from './ExampleRouter';
import { Path } from 'cv3-route/Path';

const exampleRouter = new ExampleRouter;

const onePath   = new Path('regex-one');
const twoPath   = new Path('regex-one-two');
const threePath = new Path('regex-one-two-three');

console.log(exampleRouter.route(onePath));
console.log(exampleRouter.route(twoPath));
console.log(exampleRouter.route(threePath));

```

### Nested Routing

Path objects split their source string on `/`. This allows us to do nested routing.

```javascript
import { Inject } from 'cv3-inject/Inject';
import { Router } from 'cv3-route/Router';

const nestedRoutes = {
    index: 'Nested index.'
    , sub: 'Nested route.'
}

const routes = {
    nested: Inject(Router, {routes: nestedRoutes})
};

class ExampleRouter extends Inject(Router, {routes})
{
    // Non-routable methods here
};
```

```javascript
import { ExampleRouter } from './ExampleRouter';
import { Path } from 'cv3-route/Path';

const exampleRouter = new ExampleRouter;

const nestedIndexPath = new Path('nested');
const nestedRoutePath = new Path('nested/sub');

console.log(exampleRouter.route(nestedIndexPath));
console.log(exampleRouter.route(nestedRoutePath));

```

### Routing with promises

Promises will be passed through, so promise-based routing is simple:

```javascript
import { Inject } from 'cv3-inject/Inject';
import { Router } from 'cv3-route/Router';

const routes = {
    promise: new Promise((accept, reject) => {
        accept('fulfilled.');
    })
};

class ExampleRouter extends Inject(Router, {routes})
{
    // Non-routable methods here
};
```

```javascript
import { ExampleRouter } from './ExampleRouter';
import { Path } from 'cv3-route/Path';

const exampleRouter = new ExampleRouter;
const promisePath   = new Path('promise');

exampleRouter.route(promisePath).then((result) => {
    console.log(result);
}).catch((error) => {
    console.error(error);
});

```

## License 

cv3-route &copy; Sean Morris 2019

All code in this package is relased under the [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) licence.
