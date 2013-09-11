#Dev helper

A locomotive app to help developers

##The app

This app uses Locomotive, Passport and Mongoose. Also i've added a few tweaks to make things more automatic like the autoload of models.


##Templates

###Controllers
Your app needs controllers, this boilerplate defines them in a convenient way. Please use the following gist

* [Controller template](https://gist.github.com/srebolledo/6525483)

###Models
Also we need a way to manipulate the data, this is the gist for models that you can use.

* [Models template](https://gist.github.com/srebolledo/6525483)



###Views
To present your data, you will need a view. These are inside the app/views/*controller_name*/ folder, refer to the following gists to get the correct template.

* [Index](https://gist.github.com/srebolledo/6526572)
* [New](https://gist.github.com/srebolledo/6526552)
* [Show](https://gist.github.com/srebolledo/6526593)
* [Edit](https://gist.github.com/srebolledo/6526588)

Each controller exports a variable that's the name of the file plus a css, so if your controller is called "user", there will be a *user.css* loaded in every single view that correspond to a user controller action.
This files must be located insde of *public/stylesheets/controllers/* to be catched by the app.
The same for javascript files, so if you want to run client-side javascript code, you can put your scripts inside of *public/javascript/controllers/*


