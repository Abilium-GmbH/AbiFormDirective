# Concurrent autosaving Form Directive

This is a demo of our autosaveable directive. It helps you to provide a neat user experience by reloading data on focusing of input fields inside of a form and automatically saving the fields after change.

## How does it work?

The directive can be assigned to any existing <form> element having a [formGroup]. Just add ```[abiForm]="dataService"``` where the dataService extends the class IService. This is important because it makes sure that the provided service implements the methods get() and set(). These methods are used to fetch and update an object on the server.

When a user clicks on one of the input fields, the current value of the field is fetched from the server and displayed. Then the user can update it. Eventually, he is leaving the field by clicking outside, the field value is updated on the server. The directive fetches the value before updating and checks that only this field is updated at once.

## When should I use it?

Use this directive whenever you want a user to provide a simple user experience where concurrent editing of data is frequently. 
Be aware that this is only a demonstration of an autosaveable form and that it is not complete. From here, one should implement the handling of undefined values, when the form has not been filled yet and maybe extend it with the value of a primary key like an ID to check if the object has been stored already, otherwise updating might fail. Further going one should check the validity of the data before updating.

## How do I test it?

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Open the window twice. Then enter some value in a field in one window. Afterwards enter the changed attribute field in the second window. Like that you can check concurrency.