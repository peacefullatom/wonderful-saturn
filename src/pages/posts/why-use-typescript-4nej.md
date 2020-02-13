---
title: Why use TypeScript?
date: '2019-12-30T16:01:42.436Z'
excerpt: >-
  Table Of Contents    Why use TypeScript?  Built-in types   Tuple Enum Any Void
  Never...
thumb_img_path: >-
  https://res.cloudinary.com/practicaldev/image/fetch/s--QD0oZJCq--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--QMcLl2Qh--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://thepracticaldev.s3.amazonaws.com/i/xd89rytcyjm6kovzzx8i.png
comments_count: 0
positive_reactions_count: 43
tags:
  - typescript
canonical_url: 'https://scipios.netlify.com/posts/why-use-typescript-4nej/'
template: post
---
<a href="https://www.buymeacoffee.com/peacefullatom" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>

# Table Of Contents
  * [Why use TypeScript?](# why-use-typescript)
  * [Built-in types](# built-in-types)
    * [Tuple](# tuple)
    * [Enum](# enum)
    * [Any](# any)
    * [Void](# void)
    * [Never](# never)
  * [Variable declarations](# variable-declarations)
    * [let and const vs var](# let-and-const-vs-var)
      * [let](# let)
      * [const](# const)
    * [Type definition](# type-definition)
  * [Interfaces](# interfaces)
  * [Functions](# functions)
  * [Generics](# generics)
  * [Types overview](# types-overview)
  * [Conclusion](# conclusion)

# Why use TypeScript? <a name="why-use-typescript"></a>

I don't want to give you an official definition. Instead of it, I wish to share my definition:

> TypeScript is the way to develop a low bug code that is easy to maintain and share among people within a long time.

Here is the list of what TypeScript won't do for you:

- Write a bug-free code.
- Avoid the run-time errors.
- Enhance debugging.
- Guarantee that the returned data at the run-time will be of the expected type.
- Make the code more readable.
- Simplify the integration of the third-party frameworks/libraries/code.
- Make the code self-documented.

So, why use TypeScript anyway? (only the top of the list):

- You will spend less time to understand a new codebase.
- You will know what type of data is expected and/or returned by any part of the code.
- You will know the structure of the data you're working with.
- You will have the ability to lint your code in real-time.
- Any changes will affect all the parts of code, so you will be forced by the linter/compiler to update all of the connected code.
- It will be much easier to collaborate on the development.
- Others can benefit from your code with ease.

I hope that now you can judge by yourself if TypeScript worth your time and effort.

A short overview of the abilities of TypeScript: built-in types, user-defined types, interfaces, generics, iterators and generators, symbols, type inference, etc.

Below goes a short overview of the listed features.

# Built-in types <a name="built-in-types"></a>

The basic types are reflecting types of JavaScript with some extended types: boolean, number, string, array, tuple, enum, any, void, null and undefined, never, object.

> [You can read about _JavaScript_ types here](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures).

## Tuple <a name="tuple"></a>

Here is the original definition:

> Tuple types allow you to express an array with a fixed number of elements whose types are known, but need not be the same.

So, this means that you can describe an array with fixed length and exact types. Here's an example:


```ts
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error
```


Thus, every time you use hooks in React you are using a tuple!


```ts
// Declare a new state variable, which we'll call "count"
const [count, setCount] = useState(0);
```


![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/enhpw88lp4x02jyxyt9v.gif 'Example of a tuple in React')

## Enum <a name="enum"></a>

Enum is a way to give more friendly names to sets of numeric values.

They are simplifying work with numeric values. Instead of memorizing the set of numbers you can define an enum like this:


```ts
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
```


## Any <a name="any"></a>

If for some reason, it is impossible to define the type of data, you can use a special type named _any_.

This type can be used during the early stages of an application outlining. Or if the content comes from some external source, e.g. third-party library.


```ts
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```


> Please, avoid using this type in production releases because it makes meaningless to use TypeScript at all.

## Void <a name="void"></a>

This is the moment when I thought: "JavaScript already has null, undefined, NaN, Infinity. TypeScript adds type named _any_. What is _void_?".

The answer is simple: the _void_ type is used for functions that won't return anything. Like this:


```ts
function log(value: string): void {
  console.log(value)
}
```


> Of course, it is possible to declare a variable with that type. But it is useless. The only value that can be assigned in this case is null.

## Never <a name="never"></a>

As with the previous type, I was totally confused when I've found yet another type!

But once again, everything is simple and logical in this case.

The type _never_ is used to indicate something that will never happen.

For example:


```ts
// Function returning never must have unreachable end point
function error(message: string): never {
    throw new Error(message);
}
```


The function above will interrupt the code execution that is why it's return type is _never_.

Another situation is when the edge case is impossible. Take a look at the screenshot below:

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/650kxxvkt6ocpclsxkrn.png 'The type that will never be possible')

In the first and second cases, the parameter _value_ will be treated as a string and as a number respectively.

The last condition is a good place to throw an error.

# Variable declarations <a name="variable-declarations"></a>

There are two main differences between variable declarations in JavaScript and TypeScript:

- TypeScript by default uses _let_ and _const_ instead of _var_.
- Every declaration without assignment must have a type definition.

> Why? Because it is safer.

## let and const vs var <a name="let-and-const-vs-var"></a>

TypeScript introduces slightly different ways to declare a variable. Let's have a look at them!

### let <a name="let"></a>

The _let_ keyword was introduced to JavaScript in ES2015. The main difference versus _var_ is that it is block scoped. Let's have a look at two examples to catch the difference.


```js
for (var i = 0; i < 3; i++) {
  setTimeout(function() { console.log(i); }, 1)
}
```


The output of the above script will be this:


```
3
3
3
```


Ok, now let's replace _var_ with _let_:


```js
for (let i = 0; i < 3; i++) {
  setTimeout(function() { console.log(i); }, 1)
}
```


In the latter case the output will look like this:


```
0
1
2
```


When you use the let declaration the variable is bound to a scope of execution. So, in each iteration, you will have a new instance of the variable with the current value, which will be passed to a setTimeout call.

When you use the _var_ declaration you have a single variable for all of the iterations. So, the final value will be stored in a single variable that will be later passed to function within the setTimeout call.

One more cool feature is that the variable can't be used before the declaration in the case of _let_.

The below example works perfectly in case of a _var_ declaration.


```js
a += 1;

var a = 1;
```


Because _let_ declaration is bound to the scope, you are unable to return the value defined within the nested scope. The below example will raise an exception:


```ts
export function f(): number {
  let a = 1;

  if (true) {
    let b = a + 1;
  }

  return b;
}
```


![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/6tureru7p0ke5c02ybwp.png '"b" is not found because it was declared in the separate scope')

Yet another cool feature is that the _let_ declaration won't let you make a shadow-declaration.


```ts
export function f(): void {
  let x = 1; // OK
  let x = 2; // this line will raise an error
}
```


### const <a name="const"></a>

The _const_ keyword allows you to declare variables in a different way. These declarations are working like _let_ with one significant difference: their value cannot be changed.

But wait, there is one very important fact: you still can alter values within objects and arrays!

Let's have a look at examples.


```ts
const a = true;
a = false; // this line will raise an error
```


That was a simple type. Now let's have a look at the array type:


```ts
const s = [];

s = [1, 2, 3]; // this line will raise an error

s.push(1); // OK

const q = s.pop(); // OK
```


The same is true for objects:


```ts
const w = {
  a: 1,
  b: 2
};

w = {}; // this line will raise an error

w.c = 3; // error

w.a++; // OK
```


## Type definition <a name="type-definition"></a>

In case if a variable is declared through the assignment of value/function call with a known type, there is no need to define type explicitly.

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/7z8zcmlz4x3mw60un7e6.png 'Automatic type inference')

But if you don't know the initial value you should make a declaration like this:


```ts
export class User {
  private name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }
}
```


> Did you notice that the _constructor_ declaration does not have a return type? It is one of the special cases when the return type cannot be defined.

Let's examine this example!

Firstly, take a look at how fields _name_ and _age_ are declared:


```ts
class User {
  private name: string;
  private age: number;
}
```


We have not only defined the fields but also have declared their types. Now, TypeScript will not allow assigning a value of the wrong type to these properties of a class.


```ts
class User {
  private name: string;

  constructor(value: number) {
    this.name = value; // this line will raise an error
  }
}
```


Next, let's have a look at how methods of the class are defined:


```ts
export class User {
  private age: number;

  constructor(age: number) {
    this.age = age;
  }

  getAge(): number {
    return this.age;
  }
}
```


The _getAge_ function has a return type defined right after function contract declaration:


```ts
getAge(): number {
  return this.age;
}
```


This declaration disallows us to return any type except defined:


```ts
getAge(): number {
  if (typeof this.age !== 'number') {
    return 'wrong value!'; // this line will raise an error
  }

  return this.age;
}
```


# Interfaces <a name="interfaces"></a>

Interfaces are a way to describe the structure of an object.

Now, let's take a look at the example:


```ts
interface IUser {
  name: string;
  readonly approved: boolean;
  age?: number;
}
```


> It is a good practice to start the names of interfaces with _I_. Thus it will be easier to distinguish interfaces from other types in the declaration clauses.

You are already familiar with the first type of declaration:


```ts
interface IUser {
  name: string;
}
```


The above definition requires that the object must have field _name_ of type _string_.

The next definition instructs typescript to require that the object has a _read-only_ field _approved_ of type _boolean_:


```ts
interface IUser {
  readonly approved: boolean;
}
```


The last definition introduces the declaration of an optional field:


```ts
interface IUser {
  age?: number;
}
```


So, the field _age_ of type _number_ is optional in this interface.

Here is an example of usage:


```ts
interface IUser {
  name: string;
  readonly approved: boolean;
  age?: number;
}

const user1: IUser = {}; // error
const user2: IUser = { name: 'John' }; // error
const user2: IUser = { name: 'John', approved: true }; // OK

user2.name = 'Bob'; // OK
user2.approved = false; // this line will raise an error
user2.age = 20; // OK
```


TypeScript will force you to follow the interface definition. Thus you and others who will use your code will avoid making mistakes. Ain't it superb?

# Functions <a name="functions"></a>

As you have seen above, definitions of functions can also be improved by TypeScript.

Here is an example:


```ts
function double(value: number, roundup?: boolean): number {
  if (roundup === true) {
    value = Math.round(value);
  }

  return value * 2;
}

double(10.5); // result 21
double(10.5, true); // result 22
```


This function tells us that it expects one _required_ parameter of type number and another _optional_ parameter of type boolean. Also, the declaration tells us that this function will return a number.

# Generics <a name="generics"></a>

Generics are used in case if a type can be replaced or inferred from usage.

> The next examples are very simplified to show the gist.

Let's say that you need to perform the same operation for different types of data:


```ts
function fNumber(arg: number): number {
  return arg;
}

function fString(arg: string): string {
  return arg;
}

function fBoolean(arg: boolean): boolean {
  return arg;
}

fNumber(true); // error
fString(1); // error
fBoolean('string'); // error
```


Instead of duplicating code over and over again, we can use a generic function!


```ts
function f<T>(arg: T): T {
  return arg;
}

f(true); // OK
f(1); // OK
f('string'); // OK
```


In the latter example, the type is inferred from the argument. So, we can use even complex types!


```ts
interface IData {
  valid: boolean;
}

function f<T>(arg: T): T {
  return arg;
}

const data: IData = { valid: true };

f(data); // OK
```


# Types overview <a name="types-overview"></a>

To catch the difference between types and interfaces, please, refer to this post:


<iframe class="liquidTag" src="https://dev.to/embed/post?args=stereobooster%2Ftypescript-type-vs-interface-2n0c" style="border: 0; width: 100%;"></iframe>


Here I will give you a glimpse of how types can help you. Let's take a look at an example:


```ts
type ReturnTypeFunction = () => boolean;
type ReturnType = boolean | ReturnTypeFunction;

interface IButton {
  disabled: ReturnType;
}
```


> Please, note that type names should follow the CamelCase convention.

Now let's examine the example.

Firstly, we declaring type which refers to a function which returns a boolean value:


```ts
type ReturnTypeFunction = () => boolean;
```


Next, we define a _union type_ which combines raw boolean value with the alias type which we declared above:


```ts
type ReturnType = boolean | ReturnTypeFunction;
```


Lastly, we use our union type as a type for a field of the interface:


```ts
interface IButton {
  disabled: ReturnType;
}
```


Later on, you can extend this union type with generic to avoid code duplication:


```ts
type ReturnTypeFunction<T> = () => T;
type ReturnType<T> = T | ReturnTypeFunction<T>;

interface IButton {
  disabled: ReturnType<boolean>;
}
```


# Conclusion <a name="conclusion"></a>

I hope that you will find this brief overview helpful.

Summary:

TypeScript will help to effectively build your application.

Other people (including the future you) will benefit from statically defined types.

Every change will affect all parts of an application.

You will know the structure of the data.

Real-time linters will help you to follow the defined types.

PS:

If you have found any errors or if you wish to clarify something, please, let me know!

Thank you!

# Update

If you want to know how the cover image was generated, check out this post:


<iframe class="liquidTag" src="https://dev.to/embed/post?args=peacefullatom%2Fmini-map-29o9" style="border: 0; width: 100%;"></iframe>


*[This post is also available on DEV.](https://dev.to/peacefullatom/why-use-typescript-4nej)*


<script>
const parent = document.getElementsByTagName('head')[0];
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.1.1/iframeResizer.min.js';
script.charset = 'utf-8';
script.onload = function() {
    window.iFrameResize({}, '.liquidTag');
};
parent.appendChild(script);
</script>    
