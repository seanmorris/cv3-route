import { Inject } from 'cv3-inject/Inject';

export class Router extends Inject(class{}, {routes: {} })
{
	route(path)
	{
		const route = this.constructor.match(this.routes, path.consume());

		if(typeof route == 'function')
		{
			if(route.prototype instanceof Router)
			{
				return (new route).route(path);
			}

			return route(this, path);
		}

		return route;
	}

	static match(routes, node)
	{
		for(let routeName in routes)
		{
			if(routeName[0] === '/' && routeName[routeName.length-1] === '/')
			{
				continue;
			}

			const route = routes[routeName];

			if(node === routeName)
			{
				return route;
			}
		}

		for(let routeName in routes)
		{
			if(!node || routeName[0] !== '/' || routeName[routeName.length-1] !== '/')
			{
				continue;
			}

			const route = routes[routeName];
			
			let groups  = [];

			if(groups = node.match(routeName.substr(1, routeName.length - 2)))
			{
				return (router, path) => {
					if(route.prototype instanceof Router)
					{
						return (new route).route(path);
					}

					return route(router, path, groups);
				};
			}
		}

		if(node == '' && routes['index'])
		{
			return routes['index'];
		}

		if(routes[false])
		{
			return routes[false];
		}

		console.log(node, routes);
	}
}
