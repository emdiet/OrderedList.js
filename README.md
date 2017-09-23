# OrderedList.js

Provides a list that keeps its objects in order.

It does not allow duplicates.

advanced version: [OrderedFunctionList.js](#OrderedFunctionList.js)

## Instantiation

```js
ol = new OrderedList(max, locus, criterion, distance)
```

It can be instantiated without arguments for simple lists of numbers or something;
All arguments have defaults.

### Arguments

```js
max = Number.MAX_SAFE_INTEGER,
locus = 0,
criterion = e => e,
distance = (a,b)=> Math.abs(b-a)
```


 * ```max``` max number of elements in list

 * ```locus``` the value around which the values will cluster when the list gets pruned. When ```max``` is reached, pruning will start. Pruning removes the element that is furthest away from the locus, as determined with the ```distance``` function.

 * ```criterion``` a function with the object the lists is supposed to contain as argument, that returns the value the list should be sorted by.

criterion example:
```js
    ol = new OrderedList(256, 0, e => e.id)
    ol.add({data: data, id: 123});
```
now the algorithm will sort by ID

 * ```distance``` a distance function that takes two values (not objects!) and calculates the distance between them.


### Methods

* ```add(object)``` self explanatory.

* ```get(object)``` gets the desired object with the same key. example:

```js
    ol = new OrderedList(256, 0, e => e.id)
    ol.add({data: data, id: 123});

    console.log(
        ol.get({id: 123})
    );
    //{data: data, id: 123}
```

 * ```remove(object)``` same as get, except it also removes it from the list.

### Fields

 * ```list``` contains the sorted array of objects.

# OrderedFunctionList.js

OrderedFunctionList extends OrderedList.

This list attempts to attain a function, and prunes elements that are not conducive to fitting that function.

## Instantiation

```js
ol = new OrderedFunctionList(max, locus, criterion, distance, func)
```

it can be instantiated without arguments, as they are all defaulted.
by default, the function attempts to maintain a uniform distribution of values between -0.5 and 0.5.

### Arguments

```js
max = Number.MAX_SAFE_INTEGER,
locus=0,
criterion = e => e,
distance = (a,b)=> Math.abs(b-a),
func = (idx, size, locus)=>(idx/size)-0.5+locus
```

```max, locus, criterion, distance``` are the same as in [OrderedList.js](#OrderedList.js)

 * ```max``` max number of elements in list

 * ```locus``` the value around which the values will cluster when the list gets pruned. When ```max``` is reached, pruning will start. Pruning removes the element that is furthest away from the locus, as determined with the ```distance``` function.

Note: here, the locus can be used in the function

 * ```criterion``` a function with the object the lists is supposed to contain as argument, that returns the value the list should be sorted by.

criterion example:
```js
    ol = new OrderedList(256, 0, e => e.id)
    ol.add({data: data, id: 123});
```
now the algorithm will sort by ID

 * ```distance``` a distance function that takes two values (not objects!) and calculates the distance between them.

 * ```function``` a function with arguments ```index```, ```list.length```, and ```locus```, that determines the ideal value of the index position.

 function example: to collect a lot of numbers around 0, try:

 ```js
     ol = new OrderedList(256, 0, e => e.id, Math.abs(b-a),
        (idx, len) => Math.pow((idx/len-0.5)*2, 4)
     )
 ```

### Fields

  * ```list``` contains the sorted array of objects.
