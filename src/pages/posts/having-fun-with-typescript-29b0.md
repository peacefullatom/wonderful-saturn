---
title: Having fun with TypeScript!
date: '2020-01-15T16:16:17.228Z'
excerpt: >-
  Table Of Contents    Conventions Button types Discriminated unions
  Intermediate interfaces...
thumb_img_path: >-
  https://res.cloudinary.com/practicaldev/image/fetch/s--Jo9ojCQo--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--f2kStVrV--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://thepracticaldev.s3.amazonaws.com/i/y7apajkrhgfpym78o8th.png
comments_count: 0
positive_reactions_count: 6
tags:
  - typescript
canonical_url: 'https://scipios.netlify.com/posts/having-fun-with-typescript-29b0/'
template: post
---
<a href="https://www.buymeacoffee.com/peacefullatom" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>

# Table Of Contents
  * [Conventions](# conventions)
  * [Button types](# button-types)
  * [Discriminated unions](# discriminated-unions)
  * [Intermediate interfaces](# intermediate-interfaces)
  * [Working types](# working-types)
  * [Example](# example)
  * [Code sandbox](# code-sandbox)
  * [Conclusion](# conclusion)


TypeScript makes developers' life easier.

In this article, we will walk through the creation of a set of types and interfaces.

The [playground](# code-sandbox) for this example is attached at the end of this article.

# Conventions

In my practice, I prefer to use types to define unions. The role of interfaces is to describe an object structure.

Why?

Thus, it is easier to distinguish types and interfaces.

Here is an example:


```ts
/** a function that returns a generic type */
type GenericFunction<T> = () => T;
/**
 * a type that can be a generic value or
 * a function that returns a generic value
 */
type GenericMixedValue<T> = T | GenericFunction<T>;

/** description of an element */
interface IElement {
  /** disabled state is of type GenericMixedValue */
  disabled: GenericMixedValue<boolean>;
}

/** a function that randomly disables an element :) */
const disabled: GenericFunction<boolean> = (): boolean => {
  return Math.random() > 0.5 ? true : false;
};

/** declaration of an element */
const element: IElement = {
  disabled
};
```


In the above example, all types and interfaces are declared in [CamelCase](https://en.wikipedia.org/wiki/Camel_case), but interfaces are prefixed with capital letter _i_.

This way, you will always know that the declaration refers to an interface:


```ts
const element: IElement;
```


On the other hand, you will perfectly see when the type is referred:


```ts
const disabled: GenericFunction<boolean> = (): boolean;
```


# Button types

In our example, we will define a flexible button description with the help of TypeScript.

A button can be of any type from this set: _positive_, _negative_, _neutral_, and _custom_.

Here is the definition:


```ts
/** positive button type */
const buttonTypePositive = "positive";
/** negative button type */
const buttonTypeNegative = "negative";
/** neutral button type */
const buttonTypeNeutral = "neutral";
/** custom button type */
const buttonTypeCustom = "custom";
```


Next, let's define two types: _ButtonTypeMain_ and _ButtonType_.


```ts
/** main button types */
type ButtonTypeMain = typeof buttonTypePositive | typeof buttonTypeNegative;

/** all button types */
type ButtonType =
  | typeof buttonTypeNeutral
  | typeof buttonTypeCustom
  | ButtonTypeMain;
```


> The _ButtonTypeMain_ will be used later to define a union type.

The _ButtonTypeMain_ set includes a _positive_ and _negative_ type of button, while the _ButtonTypeMain_ combines _all_ of the types.

# [Discriminated unions](http://www.typescriptlang.org/docs/handbook/advanced-types.html# discriminated-unions)

Discriminated unions are the wonder of typing!

With the help of such unions, you can gain flexibility via TypeScript!

Let's look further at our example.

Firstly, let's define a base interface _IButton_:


```ts
/** base button interface */
interface IButton {
  type: ButtonType;
  title?: string;
  disabled?: boolean;
  style?: string;
  action?: () => void;
}
```


Please note that all of the interface parameters are optional except for the _type_. Another important moment is that the _type_ parameter can accept only values from _ButtonType_.

Next, we will use the _type_ parameter to declare the interfaces of exact button types.


```ts
/** positive button interface */
interface IButtonPositive extends IButton {
  type: typeof buttonTypePositive;
  handleEnterKey?: boolean;
}
```


Ok, let's take a look at what has happened here a bit more thoroughly:

- This interface extends and thus inherits properties of the _IButton_.
- This interface sets the _type_ property to _buttonTypePositive_.
- This interface adds new optional field _handleEnterKey_.

So, we have created the first discriminated interface.

Next, let's add a discriminated interface for the negative button as follows:


```ts
/** negative button interface */
interface IButtonNegative extends IButton {
  type: typeof buttonTypeNegative;
  handleEscapeKey?: boolean;
}
```


Its declaration looks similar to the declaration of the IButtonPositive interface with two major differences:

- This interface sets the _type_ property to _buttonTypeNegative_.
- This interface adds new optional field _handleEscapeKey_.

To catch the difference by hands, let's create a union type that will make the discrimination work:


```ts
/** test union button type */
type ButtonUnion = IButtonPositive | IButtonNegative;
```


Now let's try to define a positive button. Take a look at the screenshot:

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/nkw6fgfe0hv3zv1tf80m.png "Define a positive button type")

TypeScript allows us to define the _handleEnterKey_ field.

But if we will change the value to "negative":

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/r1g2tc82l75rvmzgw591.png "Define a negative button type")

TypeScript will allow defining the _handleEscapeKey_ field!

Moreover, if we will try to set a not appropriate field we will get an error:

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/ln0p3mqonaes57um28zr.png "handleEnterKey does not exist on positive type")

> Conclusion: the discriminative types allow having a single flexible interface with the exact set of properties selected by the value of a field.

# Intermediate interfaces

Interfaces can be extended. But what if at some level you have to derive several interfaces that have a lot in common?

In this case, we can leverage an intermediate interface.

Let's take a look at the example below:


```ts
interface IElement<T> {
  type: string;
  value: T;
}

interface IInput<T> extends IElement<T> {
  placeholder?: string;
  tooltip?: string;
}

interface IStringInput extends IInput<string> {
  type: "string";
}

interface INumberInput extends IInput<number> {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
}
```


In the above example, _IElement_ is a base interface that declares a generic _value_ and property _type_ to build discriminant interfaces.

Next, we declare the _IInput_, which acts as an intermediate interface. This interface adds a set of optional fields: _placeholder_ and _tooltip_.

Lastly, we use the _IInput_ to build two data type-specific interfaces: _INumberInput_ and _IStringInput_.

Now, let's use that knowledge to finish building interfaces for the button.

Firstly, the intermediate interface:


```ts
/** extender interface for the neutral and custom buttons */
interface IButtonCustomized extends IButton {
  title: string;
  action: () => void;
  handleKey?: string;
}
```


The _IButtonCustomized_ extends _IButton_ interface and adds a common optional property: _handleKey_.

The important moment here is that this interface makes fields _title_ and _action_ **mandatory**.

Next, let's define the remaining interfaces:


```ts
/** neutral button interface */
interface IButtonNeutral extends IButtonCustomized {
  type: typeof buttonTypeNeutral;
}

/** custom button interface */
interface IButtonCustom extends IButtonCustomized {
  type: typeof buttonTypeCustom;
  style: ButtonStyle;
}
```


# Working types

To start using everything that we build let's define a union type:


```ts
/** union button type */
type ButtonUnion =
  | ButtonTypeMain
  | IButtonPositive
  | IButtonNegative
  | IButtonNeutral
  | IButtonCustom;
```


And then export the type that will be used by end-users:


```ts
/** button type */
export type Button = GenericValueOrArray<ButtonUnion>;
```


> Another side note: don't export intermediate and helping types/interfaces because they will confuse the users.

# Example

Take a look at the example below:


```ts
import { Button } from "./types";

// defining the buttons
const buttons: Button = [
  "positive",
  { type: "negative" },
  {
    type: "neutral",
    title: "I won't do anything!",
    action: () => console.log("neutral hit")
  },
  {
    type: "custom",
    title: "Hit me!",
    action: () => console.log("custom hit"),
    style: "custom"
  }
];
```


> Feel free to use the embedded [playground](# code-sandbox) at the bottom of the article to see the results.

From the above declaration, you can figure out several things:

- Buttons list can be declared as a string, an object, or an array of strings/objects.
- Predefined button types _positive_ and _negative_ can be declared as a string (later on, the parser will add default values if something is missing).
- The value of the _type_ property modifies the list of available fields.
- TypeScript will throw an error if the user will try to define a field that is not defined in the respective interface.

Isn't that lovely?

Here goes a simplified example of the parser:


```ts
import { Button } from "./types";

/**
 * create the button
 * @param type button type
 * @param className button style
 * @param caption button title
 * @param action button action
 */
function create(
  type: string,
  className?: string,
  caption?: string,
  action?: ButtonAction
): HTMLButtonElement {
  const button = document.createElement("button");

  // implement your logic here

  return button;
}

/**
 * parse buttons list and create elements
 * @param buttons buttons list
 */
export function parse(buttons: Button): HTMLButtonElement[] {
  const result: HTMLButtonElement[] = [];
  if (typeof buttons === "string") {
    result.push(create(buttons));
  } else if (buttons instanceof Array) {
    buttons.forEach(button => {
      if (typeof button === "string") {
        result.push(create(button));
      }
      if (typeof button === "object" && button.type) {
        result.push(
          create(button.type, button.style, button.title, button.action)
        );
      }
    });
  } else if (typeof buttons === "object" && buttons.type) {
    result.push(
      create(buttons.type, buttons.style, buttons.title, buttons.action)
    );
  }
  return result;
}
```


> Please, refer to the embedded [code sandbox](# code-sandbox) at the bottom of the post for a more solid example.

The _parse_ function checks the type of the passed data:
- If this is a string, then we try to create a button with default settings.
- Otherwise, we iterate the array of strings/objects.
- Lastly, we received an object that has a _type_ field.

All the rest data will be skipped to avoid potential errors.

If data fits any conditions listed above, then we try to create a button and push it into the resulting array.

# Code sandbox


<iframe class="liquidTag" src="https://dev.to/embed/codesandbox?args=agitated-wiles-mf281" style="border: 0; width: 100%;"></iframe>


# Conclusion

TypeScript extends your abilities to define data structure, as well as to manipulate them.

Effectively combining the union types with sets of interfaces, we can forge the discriminated types that will add one more level of flexibility to your projects.

Moreover, this will also improve the user experience of other fellow developers who will benefit via time-saving and productivity-boosting.


*[This post is also available on DEV.](https://dev.to/peacefullatom/having-fun-with-typescript-29b0)*


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
