1. What is the difference between Component and PureComponent? give an
example where it might break my app.

A `Component` will always rerender when its `render` component is called. A `PureComponent` will do a shallow comparison of props and state to determine whether to rerender or not.
A `PureComponent` can break an application by rendering stale data if its comparison doesn't detect changes in the props or state, which can be very common with objects and arrays as shallow comparisons will compare only the references of this data and possibly miss updates.

---
2. Context + ShouldComponentUpdate might be dangerous. Can think of why is
that?

Using Context and ShouldComponentUpdate together might cause rendering of stale data or unnecessary rerendering because of out of sync data.

---
3. Describe 3 ways to pass information from a component to its PARENT.

A component can pass information to its parent component using:

- callback functions: the parent component will provide a function that will be executed by the child component at the appropriate moment with data from the child component.
- contexts: there should be a context wrapping both parent and child components that will provide data and functions to update it to both components, making it possible for child components to update data that is also consumed by its parent.
- state management: similar to the context, both child component and its parent will work with data coming from the state management so data can be updated in child component and make its way to its parent component.

---
4. Give 2 ways to prevent components from re-rendering.

In class components you should use `shouldComponentUpdate` lifecycle method to manually implement the logic to rerender the component (or not).
In functional components you should use `memo` HOC to wrap your component and it will take care of rerendering the component only when it receives new props.

---
5. What is a fragment and why do we need it? Give an example where it might
break my app.

A Fragment is a way of grouping multiple elements without adding a parent element to them. We need fragments to avoid unnecessary DOM elements for performance and style reasons.
The only way I can see fragments breaking an application is if they are misused and your component generate an unexpected DOM tree hence breaking your styles.

---
6. Give 3 examples of the HOC pattern.

- Authentication HOC: to require authentication for rendering the components that you wrap with it
- Layout HOC: to wrap a common layout around the component you are wrapping
- Data HOC: to add data to the context of the wrapped component

---
7. What's the difference in handling exceptions in promises, callbacks and
async...await.

- Promises
To handle errors in promises you need to use the `.catch` method to provide the function that will be executed in case the promise is rejected.
- Callbacks
To handle errors in callbacks you need to manually pass the error to the callback function that will need to expect the error in that way and handle it properly.
- Async/Await
To handle errors using async/await you need to wrap the `await` statemente in a try/catch block.

---
8. How many arguments does setState take and why is it async.

It takes 2 arguments: an object with the updated state and an optional callback to be executed after the state update.
This method is async because React batches multiple state updates to improve performance by avoiding excessive component rerenders. Since this method is async, any code that depends on the updated state should be executed in the callback to assure it will get the correct data.

---
9. List the steps needed to migrate a Class to Function Component.

- move all properties on `this.state` to their own properties using `useState` hook
- move all lifecycle methods to their corresponding `useEffect` implementation
- replace the `render` method with a return statement 

---
10. List a few ways styles can be used with components.

- inline styles: you can set `style` property in any native JSX element.
- CSS stylesheets, with or without CSS Modules
  - by importing a CSS file: `import './Component.css';`
    - this will import all the styles defined in that file
  - by importing the default export of a CSS file: `import styles from './Component.css';`
    - this will give you an object to apply each of the classes defined in that file only in the places you use it
    - example: `return <p className={styles.paragraph}>Lorem Ipsum</p>;`
- CSS-in-JS libraries: there are some libraries that allow you to write CSS styles in your JavaScript code.
  - examples: Styled Components and Emotion

---
11. How to render an HTML string coming from the server.

You need to use `dangerouslySetInnerHTML` in the parent element.