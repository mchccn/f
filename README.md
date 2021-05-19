| [a](https://www.npmjs.com/package/@cursorsdottsx/a)
| [b](https://www.npmjs.com/package/@cursorsdottsx/b)
| [c](https://www.npmjs.com/package/@cursorsdottsx/c)
| [d](https://www.npmjs.com/package/@cursorsdottsx/d)
| [e](https://www.npmjs.com/package/@cursorsdottsx/e)
| **f**
| [g](https://www.npmjs.com/package/@cursorsdottsx/g)
| [h](https://www.npmjs.com/package/@cursorsdottsx/h)
| [i](https://www.npmjs.com/package/@cursorsdottsx/i)
| [j](https://www.npmjs.com/package/@cursorsdottsx/j)
| [k](https://www.npmjs.com/package/@cursorsdottsx/k)
| [l](https://www.npmjs.com/package/@cursorsdottsx/l)
| [m](https://www.npmjs.com/package/@cursorsdottsx/m)
| [n](https://www.npmjs.com/package/@cursorsdottsx/n)
| [o](https://www.npmjs.com/package/@cursorsdottsx/o)
| [p](https://www.npmjs.com/package/@cursorsdottsx/p)
| [q](https://www.npmjs.com/package/@cursorsdottsx/q)
| [r](https://www.npmjs.com/package/@cursorsdottsx/r)
| [s](https://www.npmjs.com/package/@cursorsdottsx/s)
| [t](https://www.npmjs.com/package/@cursorsdottsx/t)
| [u](https://www.npmjs.com/package/@cursorsdottsx/u)
| [v](https://www.npmjs.com/package/@cursorsdottsx/v)
| [w](https://www.npmjs.com/package/@cursorsdottsx/w)
| [x](https://www.npmjs.com/package/@cursorsdottsx/x)
| [y](https://www.npmjs.com/package/@cursorsdottsx/y)
| [z](https://www.npmjs.com/package/@cursorsdottsx/z)
|

**F is for Fill**

# @cursorsdottsx/f

A small ezpz module to fill and populate your objects when needed to preserve memory.

If you have thicc af objects that you only use sometimes, this is a good use case.

```js
import "@cursorsdottsx/f";

function generateMyThiccObject() {
	return { ... }; // a lotta shit
}

const myThiccObject = {
	data: new Fill(generateMyThiccObject),
};

const filledThiccObject = Fill.fill(myThiccObject);

// or if you want it to fill the reference instead

Fill.populate(myThiccObject);
```

Heavily inspired by mongoose's `populate` method, this is a robust and versatile library to handle fillings, and of course thicc objects.

#### Install and use right now or else

```bash
npm install @cursorsdottsx/f
```

```bash
yarn add @cursorsdottsx/f
```

Once you import the library, it will create a `Fill` global object that you can use.

It's API is very simple.

### Documentation

#### `new Fill(blueprint, ...arguments)`
- `blueprint` – Can be a function or class. This will replace the property with the return value of the function/class instance.
- `arguments` – Arguments to pass to the function or class.

Creates a new filler for your objects.

#### `Fill.prototype.blueprint`

The blueprint.

#### `Fill.prototype.args`

The arguments for the blueprint.

#### `Fill.prototype.init()`

Executes the blueprint with the arguments provided.

`Fill.fill(object)`
- `object` – Object to fill.

Fills an object and replaces all `Fill` instances.

`Fill.unfill(object)`
- `object` – Object to restore.

Restores a filled object back to its original state.

`Fill.populate(object)`
- `object` – Object to fill.

Replaces the object's properties (in contrast to `fill` that returns a newly constructed object).

`Fill.unpopulate(object)`
- `object` – Object to restore.

Restores the object's properties (in constrast to `unfill` that returns a newly reconstructed object).

[npm abc's homepage](https://codepen.io/cursorsdottsx/full/KKWNRaY)
