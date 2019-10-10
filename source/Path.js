export class Path
{
	constructor(source = '')
	{
		this.nodes    = this.split(source);
		this.position = 0;
		this.length   = this.nodes.length;

		// console.log(source, this.nodes);
	}

	split(source)
	{
		const parts = source.split('/');

		return parts;
	}

	consume()
	{
		if(this.position >= this.length)
		{
			return false;
		}

		return this.nodes[ this.position++ ];
	}
}