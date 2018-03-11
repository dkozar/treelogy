[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Installation

```
yarn add treelogy --save
```

## About

Treelogy is a simple versioning framework.

* `Treelogy` is inspired by class inheritance in various programming languages
* Uses a version tree to keep track of changes
* Each version contains *atomic* parts called nodes
* The node can contain any type of data and could be overridden in child version
* Each node contains only *delta*, thus minimizing the memory footprint

## Demos

Check the [treelogy-demo](https://github.com/dkozar/treelogy-demo) project for online examples.

## Class inheritance example

I'm using C# here because of its explicit *modifiers*, to better illustrate the point.

```
class Version_1
{
    public virtual string foo()
    {
        return 'foo';  
    }

    public virtual string bar()
    {
        return 'bar';  
    }
}
```

```
class Version_2 : Version_1
{
    // method foo() is implicitly present by inheritance 

    // overriden method
    public override string bar()
    {  
        return 'bar_2';  
    }

    // new method
    public virtual string baz()
    {  
        return 'baz';  
    }
}
```

In the above example, class `Version_2` inherits from `Version_1`.

It overrides the method `bar`, providing own implementation.

Additionally it introduces a new method `baz`.

## Treelogy example

`Treelogy` is a store containing a number of versions, where each version keeps track of its parent version.

For given version ID, `Treelogy` has the ability of processing all the ancestor *deltas* in order to build each version in full.

```
import Treelogy from "treelogy";

const demo = () => {
  const treelogy = new Treelogy();

  const version1 = treelogy.createVersion("Version_1");
  version1.createNode("foo", "foo"); // ID, data
  version1.createNode("bar", "bar");

  const version2 = treelogy.createVersion("Version_2", "Version_1"); // Version_2 inherits from Version_1
  tree2.updateNode("bar", "bar_2"); // overriden node
  tree2.updateNode("baz", "baz"); // new node

  // builds an array of processed versions
  // each version contains a full set of nodes, set of inherited IDs and set of overridden IDs
  const data = treelogy.process();

  // finding a particular version
  const version_1 = data.find(version => version.id === 'Version_1');
};
```
## Build

If forking the library, you might want to build.

```
yarn build
```