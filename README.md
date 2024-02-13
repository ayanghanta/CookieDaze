# 🍪 CookieDaze 🍰

Welcome to CookieDaze, where every bite is an adventure! 🎉 Dive into a world of mouthwatering cakes and treats, crafted with love and baked to perfection. With CookieDaze, satisfying your sweet tooth has never been easier! 😉

![Logo](https://cookiedaze.vercel.app/img/logos/main-logo.png)

## API Reference

#### API Documentation

https://documenter.getpostman.com/view/31858255/2s9Yynm4iF

| Parameter | Type | Description      |
| :-------- | :--- | :--------------- |
| `api_key` | `NA` | **Not Required** |

## Authors

- [@ayanghanta](https://github.com/ayanghanta)

## Features

- **User Authentication**: Safeguard your cake cravings with secure JWT authentication.
- **Cake Catalog**: Discover a treasure trove of cakes to tantalize your taste buds.
- **Add to Cart**: Select your favorite cakes and breeze through checkout with ease.
- **Payment Integration**: Pay conveniently with Stripe, ensuring smooth transactions.
- **User Profile Management**: Customize your profile and add a sprinkle of personality.
- **Email Notifications**: Stay in the loop with delightful email updates on your orders.

## Demo

https://cookiedaze.onrender.com/

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
NODE_ENV='development'

PORT=3000

DATABASE=mongodb://127.0.0.1:27017/cookie-daze

JWT_SECRET=your_secret_key
JWT_EXP_TIME=90d
JWT_COOKIE_EXPIRE=90

# FOR DEVELEPMENT MAIL SENDING SETUP
MAIL_USERNAME=mail_trap_username
MAIL_PASSWORD=mail_trap_password
MAIL_PORT=25
MAIL_HOST=sandbox.smtp.mailtrap.io
```

## Installation

```bash
  npm install
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/ayanghanta/CookieDaze.git
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Contributing

Contributions are always welcome!

We're baking up something special, and your ideas are the secret ingredient! 🍰 If you'd like to contribute to CookieDaze, please fork the repository, whip up your changes in a new branch, and send us a delicious pull request.

## Feedback

If you have any feedback, please reach out to us at ayanghanta674@gmail.com

## Lessons Learned

- **Payment Integration Complexity**: Integrating Stripe for payments highlighted the importance of robust security measures and thorough testing.

- **Image Processing Optimization**: Balancing image quality and file size required experimenting with different compression techniques.

- **Asynchronous Operations Management**: Utilizing promises and async/await improved code readability and efficiency for handling asynchronous operations.

- **User Experience Prioritization**: Iterative design improvements based on user feedback enhanced overall usability and accessibility.

- **Effective Error Handling**: Centralizing error handling logic and comprehensive logging facilitated efficient issue resolution and maintenance.

## Tech Stack

- **Node.js**: Powering the backend with JavaScript magic.
- **Express**: The icing on the cake for web application frameworks.
- **MongoDB**: A sweet spot for storing all our data.
- **Mongoose**: Our trusted sidekick for MongoDB modeling.
- **Pug**: Whipping up dynamic HTML content with ease.
- **Stripe**: Handling payments like a pro.
- **SendGrid**: Sending emails with a cherry on top.
- **JWT**: Keeping our cookies secure with JSON Web Tokens.
- **Multer**: Uploading files with a cherry on top.
- **Sharp**: Perfecting images like a true pastry chef.

## Screenshots

![App Screenshot](https://i.postimg.cc/YSjtpmW4/Screenshot-129.png)

![App Screenshot](https://i.postimg.cc/05zZp5pp/Screenshot-131.png)

![App Screenshot](https://i.postimg.cc/GmXs7GR9/Screenshot-130.png)

![App Screenshot](https://i.postimg.cc/9QkQwpVP/Screenshot-132.png)
