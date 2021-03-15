# 关于 class 的一切

## TypeScript
```ts
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}
let greeter = new Greeter("world");
// .d.ts 类型声明文件
declare class Greeter {
    greeting: string;
    constructor(message: string);
    greet(): string;
}
declare let greeter: Greeter;
```
-->
```js
"use strict";
class Greeter {
    constructor(message) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
let greeter = new Greeter("world");
```

## 静态方法与静态属性

## 实例属性

## 私有属性与私有方法

## new.target

## Object.getPrototypeOf()

## super

## 类的 prototype 属性和 __proto__ 属性

## Mixin 模式

## extends

## implements

## Inheritance
## Public, private, and protected...
## Public by default
## ECMAScript private Fields
## Understanding protected
## Readonly modifier
## Parameter properties
## Accessors
## Static Properties
## Abstract Classes
## Advanced Techniques
## Contructor functions
## Using a class an interface