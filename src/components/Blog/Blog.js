import React from 'react';

const Blog = () => {
    return (
        <section className='p-6 bg-purple-400'>
            <div className='p-3 mb-3 bg-base-300 rounded'>
                <h3 className='text-lg font-semibold'>What are the different ways to manage a state in a React application?</h3>
                <p className='font-semibold'>There are Four ways to manage a state in React application.
                    1. Local state. <br />
                    2. Global state. <br />
                    3. Server state. <br />
                    4. URL state.</p>
            </div>
            <div className='p-3 mb-3 bg-base-300 rounded'>
                <h3 className='text-lg font-semibold'>How does prototypical inheritance work?</h3>
                <p>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.</p>
            </div>
            <div className='p-3 mb-3 bg-base-300 rounded'>
                <h3 className='text-lg font-semibold'> What is a unit test?</h3>
                <p>They enable you to catch bugs early in the development process.
                    Automated unit tests help a great deal with regression testing.
                    They detect code smells in your codebase. For example, if you’re having a hard time writing unit tests for a piece of code, it might be a sign that your function is too complex.</p>

                <h3 className='text-lg font-semibold'> Why should we write unit tests?</h3>
                <p>
                    1. They enable you to catch bugs early in the development process. <br />
                    2. Automated unit tests help a great deal with regression testing. <br />
                    3. They detect code smells in your codebase. For example, if you’re having a hard time writing unit tests for a piece of code, it might be a sign that your function is too complex.</p>
            </div>
            <div className='p-3 mb-3 bg-base-300 rounded'>
                <h3 className='text-lg font-semibold'>React vs. Angular vs. Vue?</h3>
                <p><strong>React :</strong>React.js or React JS or simply React are the different names of this framework. It is a JavaScript library that was released in 2013 and developed by Jordan Walke. It is an open-source, front-end framework used for building UI frameworks.</p>
                <p><strong>Angular :</strong>Angular is an open-source dynamic web application framework. It came in 2009 by Misko Hevery and Adam Abrons and is currently maintained by Google. It also uses HTML as a template language for extending its context and to create various application components.</p>
                <p><strong>Vue :</strong>Vue JS is a progressive JavaScript framework that uses MVVM (Model view view Model) for Building interfaces and single-page applications. It was created by Evan Vu and released in February 2014. Vue JS is written in JavaScript and typescript.</p>
            </div>
        </section>
    );
};

export default Blog;