---
title: Inferring types with TypeScript
date: '2020-02-04T09:55:51.359Z'
excerpt: >-
  TypeScript provides advanced tools for work with types. In this post, I will
  show you how you can inf...
thumb_img_path: >-
  https://res.cloudinary.com/practicaldev/image/fetch/s--FrINS8U5--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--LevfMyUV--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://dev-to-uploads.s3.amazonaws.com/i/rj0vr6pbfeahxx15l0fi.jpg
comments_count: 0
positive_reactions_count: 12
tags:
  - typescript
  - tutorial
canonical_url: 'https://scipios.netlify.com/posts/inferring-types-with-typescript-456j/'
template: post
---
TypeScript provides advanced tools for work with types. In this post, I will show you how you can infer the data provided in the base class.

The setup is simple: we will create a base component, a function that will create objects of a given type, and several classes.

# Base component

The base component may contain any common logic that you like to share between different classes. This way, you will avoid code replication and will have the ability to enrich your classes by modifying code in a single place.

Let's take a look at the class definition:


```ts
/**
 * - this class is providing base functionality for components.
 * - extend components with this class to get basic functionality.
 * - it is strongly advised to provide a type data <R> for this class 
 * to have an ability to provide the strictly typed data 
 * for the derived component before display it.
 */
class BaseComponent<R extends {} = any> {
  /**
   * - the optional external data of extendable type
   */
  data?: R;

  constructor() {}
}
```


> The above example was simplified. But you can add, for example, an ID, name, or any other metadata.

# Component interface

Next, we will define an interface that will describe data for the factory. As you can see below, the only mandatory field is the type of component to be created. The component's data is optional. Later on, you can extend this interface to fit your needs.


```ts
/**
 * component description
 */
interface IComponent<T extends BaseComponent, R> {
  /** the component class type */
  component: { new (): T };
  /** the user defined extendable optional data */
  data?: R;
}
```


Please, take a look at the definition of the component. First of all, we explicitly telling TypeScript that it should be derived from the BaseComponent class:


```ts
T extends BaseComponent
```


Next, we instructing TypeScript that the passed value has a constructor:


```ts
component: { new (): T };
```


# Component data type

It is impossible to get a type of data directly. But it is possible if we will leverage a helper type. Here it goes:


```ts
/**
 * helper type which only meaning is to extract user-provided type from provided component
 */
type ComponentData<W> = W extends BaseComponent<infer R> ? R : W;
```


To be short, this type tries to infer the user-defined type. If it is not possible when it will return the initial or unknown type. In either case, this will not produce an error.

# Factory function

The goal is to create a new instance of the desired component and return it only after the constructor will finish its work. Thus, by wrapping the logic into a promise, we can control what to do next in any situation:
- In case if the factory will successfully create the component, we can use it further. 
- In other cases, we can notify other components of what had happened.


```ts
/**
 * create component
 * @param settings component settings
 */
function create<T extends BaseComponent, R extends ComponentData<T>>(settings: IComponent<T, R>): Promise<T> {
  return new Promise<T>(resolve => {
    const result = new settings.component();
    result.data = settings.data;
    resolve(result);
  });
}
```


> The above example is simplified to catch the idea. 

Here is how we use the ComponentData type to infer the user-defined type. Firstly, we tell TypeScript that the component extends the BaseComponent class. After, we are giving a clue about where to search the user-defined type.


```ts
T extends BaseComponent, R extends ComponentData<T>
```


Finally, we leverage the IComponent interface to get the proper type of data:


```ts
settings: IComponent<T, R>
```


Now, as all is set, we can create the component, assign the passed data, and return the new instance to the caller.

# Example

> I'm living in the types-safe world of TypeScript for a pretty long time. So, I'm used to using it for frontend projects as well as backend code. That is why I prefer to describe all of the structures I'm working with via interfaces. And this example is not an exclusion.

Let's use all of that we have created above. To do so, we will create an interface and a class. Here is how they look like:


```ts
interface IUser {
  name: string;
  age: number;
}

class User extends BaseComponent<IUser> {
  constructor() {
    super();
  }
}
```


And use it:


```ts
create({ component: User, data: { age: 10, name: 'alice' } }).then(user => console.log(user.data));
```


TypeScript will check fields that we will pass to the data object. If a set of fields is wrong or types of a provided values mismatch, it will lead to a compilation error.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/oxwvn50knw1tw0jcv5qs.png "Compilation Error")

# Playground


<iframe class="liquidTag" src="https://dev.to/embed/codesandbox?args=ts-type-inference-fevd5" style="border: 0; width: 100%;"></iframe>


# Bottom line

TypeScript allows you to infer the type of data from base classes. Thus, it is possible to use and create objects via factories. That, in turn, will add an extra layer of safety to your application. Also, it enables you to reduce code replication by moving common logic into a single place. This approach works for frontend as well as for backend: I'm using it for modal windows, for example.

<a href="https://www.buymeacoffee.com/peacefullatom" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>

*[This post is also available on DEV.](https://dev.to/peacefullatom/inferring-types-with-typescript-456j)*


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
