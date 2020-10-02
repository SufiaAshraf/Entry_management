https://github.com/SufiaAshraf/Entry_management
# Entry Management WebApp
A webapp used to manage the Incoming and Outgoing of Guests at a hotel, office or such place. The host is notified when a visitor checks in through Email and SMS with the details. The visitor is notified when he/she checks out Email.Through this webApp it is possible to handle all visitors related to a single host at a time.
It is a secure app to handle meetings with any host.
*User authentication is used for hosts.*
*Nodemailer module is used for scheduling of mails.*
*Nexmo API is used for scheduling SMS.*

# Run
* Clone the repo
* run node app.js
* visit http://localhost:3000/visitors

# Built-with
* [Node-js](https://nodejs.org/en/docs/)  - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Npm](https://docs.npmjs.com/)  -   Npm is a package manager for the JavaScript programming language. It is the default package manager for the JavaScript runtime environment Node.js.
* [Nodemailer](https://www.npmjs.com/package/nodemailer)   - Npm package to send emails.
* [Nexmo](https://www.nexmo.com/)  - An API programmatically send and receive SMS in practically every country.
* [Bootstrap](https://getbootstrap.com/docs/3.3/)  - A free and open-source CSS framework directed at responsive, mobile-first front-end web development.Used for styling forms 
* [MongoDB](https://www.mongodb.com)  - For storing details in database for user (host) and visitors.

# Detailed functionality

* Firstly there's a host login page. For now , anyone can become Host by using registration form and signing up. Once host is logged in he/ she can attend any visitor visiting his address.

* When there's a visitor , the visitor checked-in on a particular address is added into database by the host handling that address. Once he/she checks in, his/her host gets an email stating visitor's details with the check -in time.

* When visitor has finally checked-in , a thumbnail of their details is created on visitors page until they check-out.

* When the visitor has to check-out , he has to click on the checkout button on his thumbnail then he's is redirected to a page where there is a final check-out button with a message.

* After his check-out he gets an email as well as SMS stating the details of his visit.


# Site

# Landing Page
Home Page of the WebApp. Host login form is present here.For a new host there is a signUp button(new host?) in the navbar
![](https://github.com/SufiaAshraf/Entry_management/blob/master/Screenshots/login.png)

# Host Registration
A Sign Up form to add new Host to DB
![](https://github.com/SufiaAshraf/Entry_management/blob/master/Screenshots/Signup.png)

# Visitor Homepage
This page shows all Visitors presently Checked In
![](https://github.com/SufiaAshraf/Entry_management/blob/master/Screenshots/visitorhome.png)

Screenshot of message and email to the host recieved are:
![](https://github.com/SufiaAshraf/Entry_management/blob/master/Message%20Screenshots/WhatsApp%20Image%202019-12-10%20at%205.31.39%20PM%20(1).jpeg)
![](https://github.com/SufiaAshraf/Entry_management/blob/master/Message%20Screenshots/WhatsApp%20Image%202019-12-10%20at%205.34.40%20PM.jpeg)


# Visitor Check In Form
This page adds a new Visitor to DB
![](https://github.com/SufiaAshraf/Entry_management/blob/master/Screenshots/newvisitor.png)

# Check Out Page Of Visitor
This page checks out the visitor selected
![](https://github.com/SufiaAshraf/Entry_management/blob/master/Screenshots/Checkout.png)

Screenshot of Email recieved by a visitor while checking out
![](https://github.com/SufiaAshraf/Entry_management/blob/master/Message%20Screenshots/WhatsApp%20Image%202019-12-10%20at%205.31.39%20PM.jpeg)

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


# To-Do
* To automatically detect the visited address using [Google API](https://developers.google.com/maps/documentation)
* Buy premium for [Nexmo](https://dashboard.nexmo.com/test-numbers) to send sms to any Host's number provided , so that we will not be limited to only white-listed contacts
* A little more styling
