[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## About

Treelogy is a simple versioning framework.

* `Treelogy` is based on a simple idea of class inheritance in programming languages
* It uses a tree of versions to keep track of changes
* Each version contains atomic parts called nodes
* The mode can contain any data
* Each node could be overridden in parent version
* Each child version contains only the delta, thus minimizing a memory footprint

## Class inheritance example

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
    // inherited method
    public virtual string foo()
    {  
        return 'foo';  
    }

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

```
import Treelogy from "treelogy";

const demo = () => {
  const treelogy = new Treelogy();

  const version1 = treelogy.createVersion("Version_1");
  version1.createNode("foo", "foo");
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

## Installation

```
yarn add treelogy --save
```

Check the [treelogy-demo](https://github.com/dkozar/treelogy-demo) project for online examples.
