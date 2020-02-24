# Notes on converting JS to TS for a complex typing scenario

*Description*: In a Typescript project, I want to re-use a function I had used in a Javascript project. This function takes a word frequency map `Map<sting,int>` and creates the object need to configure a popular component on NPM [`material_table`](https://www.npmjs.com/package/material-table)

I should note that this case is of a Typescript project using an existing Javascript component. And the typing just needs to be sufficient to satisfy the component. If the original component had been developed in Typescript, the typeing approach taken below would likely have been much different.

Here is the function in full (see `example.js`):

```js
// function to convert word frequency map
// to an object suitable for MaterialTable
export const wf_to_mt = ( ob => {
    const mt = {};
    mt.title = "Word Frequency";
    mt.columns = [
        { title: 'Word', field: 'word' },
        { title: 'Count', field: 'count' },
    ];
    mt.data = [];
    Object.keys(ob).forEach ( w => {
        mt.data.push({ word: w, count: ob[w] })
    })

    mt.options = { sorting: true };

    return mt;
});
```

## Step 1 - rename with `.ts` extension [`example1.ts`]

The result is in `example1.ts`. When viewed in VS Code, a number of errors like this are shown:

```
Property 'options' does not exist on type '{}'.
```

The line `const mt = {}` is empty of any definition or typing. Thus trying to add any keys to the object fail. So what is easy in Javascript (hereafter JS) fails in Typescript (TS hereafter).

Let's review each.

1. `mt.title` is a simple string attribute.
2. `mt.columns` is an array of objects, each with two string attributes (being the column headings for the table).
3. `mt.data` is an array of objects, with a value for each of the two columns.
4. `mt.options` is an object having one or more settings to configure table options provided by the component.

VS Code reports 9 errors at this starting point.

## Step 2 - title string attribute [`example2.ts`]

This is certainly the easiest one. Add some typing to eliminate the one error:

```ts
const mt: { title: string } = { title: "" };
```

**VS Code now reports 4 errors.** The next ones are the harder ones...

## Step 3 - array of column objects [`example3.ts`]

Next, we tackle the array of column objects. I define this interface:

```ts
interface ColumnValue {
    title: string;
    field: string;
}
```

Then alter the type of `mt` to use it:
```
    const mt: { title: string, columns: ColumnValue[] } = { title: "", columns: [] };
```

**VS Code now reports 3 errors**

## Step 4 - the array of data rows [`example4.ts`]

We solve this the same way as the columns - create an interface and then use in the type definition.

```ts
interface DataValue {
    word: string;
    count: number;
}
```

and:

```ts
    const mt: { 
        title: string, 
        columns: ColumnValue[],
        data: DataValue[], 
    } = { title: "", columns: [], data: [] };
```

Note also we no longer need the line `mt.data = []`, since it is now initialized already.

**VS Code now reports 1 error**


## Step 5 - options object [`example5.ts`]

There are a lot of options, but the only one here was the one for sorting. However, in the new project I intend to use the `export` option, so I'll include export options in the example below.

Typescript has syntax for optional properties, which is what is needed for this case. To make it optional, simply affix a question mark to the attribute name.

First, define the interface:

```
interface Options {
    sorting?: boolean,
    exportAllData?: boolean,
    exportButton?: boolean
}
```

and use it:

```ts
    const mt: { 
        title: string, 
        columns: ColumnValue[],
        data: DataValue[], 
        options: Options,
    } = { title: "", columns: [], data: [], options: {
        sorting: true,
        exportAllData: true,
        exportButton: true,
    } };
```

Note that we no long need the line `mt.options = { sorting: true };`, since it can be initialized earlier. So it is commented out in the final example.

**VS Code now reports no errors**
