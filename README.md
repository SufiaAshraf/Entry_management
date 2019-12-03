# Entry Management WebApp
A webapp used to manage the Incoming and Outgoing of Guests at a hotel, office or such place. The host is notified when a visitor checks in through Email and SMS with the details. The visitor is notified when he/she checks out Email.
*User authentication is used for hosts.*
*Nodemailer module is used for scheduling of mails.*
*Nexmo API is used for scheduling SMS.*

## Site

### Landing Page
Home Page of the WebApp. Host login form is present here.For a new host there is a signUp button(new host?) in the navbar
![](https://github.com/SufiaAshraf/Entry_Management/blob/master/Screenshots/login_page.png)

### Host Registration
A Sign Up form to add new Host to DB
![](https://github.com/SufiaAshraf/Entry_Management/blob/master/Screenshots/SignupHost.png)

### Vitor Homepage
This page shows all Visitors presently Checked In
![](https://github.com/SufiaAshraf/Entry_Management/blob/master/Screenshots/visitors_page.png)

### Visitor Check In Form
This page adds a new Visitor to DB
![](https://github.com/SufiaAshraf/Entry_Management/blob/master/Screenshots/Screenshot%20from%202019-12-02%2000-23-38.png)

### Check Out Page Of Visitor
This page checks out the visitor selected
![](https://github.com/SufiaAshraf/Entry_Management/blob/master/Screenshots/Ending_Checkout.png)

# Development
Want to contribute? Great!

To fix a bug or enhance an existing module, follow these steps:
* Fork the repo
* Create a new branch (git checkout -b improve-feature)
* Make the appropriate changes in the files
* Add changes to reflect the changes made
* Commit your changes (git commit -am 'Improve feature')
* Push to the branch (git push origin improve-feature)
* Create a Pull Request

# Built-with
* [Node-js](https://nodejs.org/en/docs/)  - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Npm](https://docs.npmjs.com/)  -   Npm is a package manager for the JavaScript programming language. It is the default package manager for the JavaScript runtime environment Node.js.
* [Nexmo](https://www.nexmo.com/)  - An API programmatically send and receive SMS in practically every country.
* [Bootstrap](https://getbootstrap.com/docs/3.3/)  - A free and open-source CSS framework directed at responsive, mobile-first front-end web development.Used for styling forms 

# To-Do
* To automatically detect the visited address using [Google API](https://developers.google.com/maps/documentation)
* Buy premium for [Nexmo](https://dashboard.nexmo.com/test-numbers) to send sms to any Host's number provided , so that we will not be limited to only white-listed contacts
* A liitle more styling