# image-upload-tutorial

The purpose of this project was to understand how to use [Multer](https://www.npmjs.com/package/multer) to upload images to an express server while using react/typescript front end. (This is sort of how we will use it in the [GAMMA project](https://github.com/dustin-s/gamma/)).

## The Journey

### The Express server with Multer

I read through the Multer documentation and it seemed pretty straight forward, but it showed that it could be used as either a middleware or as a function. I started out using it as a middleware, but I wanted to explore using it as a function. I started out setting it up as a file. I used 2 different tutorials to help me with this:

- [React JS+ Node JS File Upload Example](https://www.tutsmake.com/react-js-node-js-file-upload-tutorial-with-example/)
- [Upload images with React, ExpressJS and mySQL](https://dev.to/maureenoldyck/upload-images-with-react-expressjs-and-mysql-47jn)

The problem I had with both of these tutorials is that neither one used Express.Routes and did everything within the main server file. I fixed this by building a configuration file that would create my storage definition (where to write the file and how to name the file). I could then import this to where ever I needed the Multer definition. It turned out that I didn't even need it in my main server file at all, just in my routes files where it was used.

The next step was to figure out how to ensure that only the proper filetypes were being saved. This wasn't too bad, you just used the FilterFile option and it will only load any file that matches the mime type. The problem was, how do I catch the error? I read a number of StackOverflow articles and even the Multer documentation itself and some other tutorials. Most of them said the same thing, use Multer as a function, not a middleware.

I created Multer as a function and sure enough, I could use it to capture errors. I still tried to figure out how to do it with using it as middleware. If I called the controller with `uploadSingle(err, req, res, next) {}` I could capture the error, however, for some reason, it wouldn't pass on the success. If I left off the `err` parameter, it worked fine, but I couldn't capture the error. At this point, I abandoned that and started chasing the no middleware solution which worked just fine. I think in the long run, it will work better for GAMMA anyways.

### The Single Upload React/TypeScript Page

There was nothing really special about setting up this page as I could pretty much take it out of the tutorial. The problems were the types for TypeScript, but those are easy enough to search for.
I created a simple page that would upload the file, display status messages (error, status, and loading).

The tricky part was coming up with how to display the uploaded image. I got to learn about `URL.createObjectURL(file)` which converts a blob into a local "url" object so that React can display it as an image with a source of a URL.

### The Multiple Upload React/TypeScript Page

This became more challenging. I didn't want to use the same screen. So, I had the idea of using a button to control the screen or a carousel type object. I got lost in how to do this with TypeScript and then I found this nice tutorial on how to create a carousel:

- [Creating a Carousel in React](https://medium.com/octopus-wealth/creating-a-carousel-in-react-e45918738212)

The problem I had with this is he was using styled components, which I didn't want to bother with. I _could_ use them, but I was using CSS, so I decided to convert them out of styled components.
Once I got the carousel made, it didn't work quite the way I wanted it to. I had to move buttons around and fix containers. At that point, I thought it looked pretty good.

I was able to create the Multiple screen real easily and it would upload the images. However, when I went to display the images, I decided to re-use the Carousel. It would only display the first and last image. I didn't really try to hard to get it to work correctly with the modulus because I recognized that it would only display one image at a time.

### Fixing the Carousel

So the Carousel, by design, only worked in one direction or the other. For some reason, it would only show the first and last item in the list, but it was only supposed to show 1 item at a time. I'm proud to say, that most of the modifications to the carousel were all me with virtually no help from Google!

I started out by making an array of items to display that would only hold the items needed. Then I made sure that the values of the `children` array would never be out of bounds. Once I had the array showing the correct indexes for the image selected, I imported the array. I then used this new array to display in to the items needed. Everything worked, I could cycle through all of the photos uploaded. The only problem is that it looks bad when you change the images because there is no animation. It worked well enough for my purposes for now. Next was to figure out how to get the multiple files to upload.

### Loading Multiple Files in Express

This was almost anticlimactic. I think I only changed a couple of words in the upload single function so that it was loading an array rather than a single file and it worked like a charm. The hardest part about that was figuring out how to get TypeScript to load the data into the `formData` object, which wasn't hard once I understood that the `formData.append()` command can use the same field name to load in an array so it became a simple for loop at that point.

### Back to Animation of the Carousel

At this point the project was pretty much complete. However, I'm not satisfied with the animation. So it is back to working on that.

## Tutorial list:

- [React JS+ Node JS File Upload Example](https://www.tutsmake.com/react-js-node-js-file-upload-tutorial-with-example/)
- [Upload images with React, ExpressJS and mySQL](https://dev.to/maureenoldyck/upload-images-with-react-expressjs-and-mysql-47jn)

- [Creating a Carousel in React](https://medium.com/octopus-wealth/creating-a-carousel-in-react-e45918738212)  
  Utilizing React, Hooks, TypeScript and Styled Components.

## Other helpful sites:

- [Multer File Type Validation Tutorial with Example](https://www.positronx.io/multer-file-type-validation-tutorial-with-example/#:~:text=Define%20multer%20object%20and%20pass,which%20comes%20with%20Multer%20middleware)
- [Node.js Multer File Upload Type Validation Filters and Limit File Size and Error Handling Using Express Full Tutorial For Beginners With Examples](https://codingshiksha.com/javascript/node-js-multer-file-upload-type-validation-filters-and-limit-file-size-and-error-handling-using-express-full-tutorial-for-beginners-with-examples/)
