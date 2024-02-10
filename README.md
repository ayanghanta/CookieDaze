# 🍪 CookieDaze 🍰

Welcome to CookieDaze, where every bite is an adventure! 🎉 Dive into a world of mouthwatering cakes and treats, crafted with love and baked to perfection. With CookieDaze, satisfying your sweet tooth has never been easier! 😉

## About 🎂

CookieDaze is your go-to destination for exploring a wide array of delectable cakes, from classic favorites to trendy delights. This web application offers a seamless browsing experience, intuitive cart management, secure payment integration, and personalized user profiles. It's time to indulge in a little slice of happiness! 😊

## CookieDaze is live 🌐:

Open your web browser and navigate to www.cookidaze.com.

## Features ✨

- **User Authentication**: Safeguard your cake cravings with secure JWT authentication.
- **Cake Catalog**: Discover a treasure trove of cakes to tantalize your taste buds.
- **Add to Cart**: Select your favorite cakes and breeze through checkout with ease.
- **Payment Integration**: Pay conveniently with Stripe, ensuring smooth transactions.
- **User Profile Management**: Customize your profile and add a sprinkle of personality.
- **Email Notifications**: Stay in the loop with delightful email updates on your orders.

## Technologies Used 🛠️

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

## Setup Instructions 🚀

Ready to join the CookieDaze adventure? Follow these simple steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/CookieDaze.git
   cd CookieDaze
   ```

## Install Dependencies 🔽

```bash
npm install
```

## Set Configuration 🖥️

Create a .env file in the root directory.

```bash
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


# FOR PRODUCTION MAIL SENDING SETUP
SENDGRID_USERNAME=your_SENDGRID_USERNAME
SENDGRID_PASSWORD=your_SENDGRID_password
SENDGRID_EMAIL=your_SENDGRID_email

#FOR STRIPE INTEGRATION
STRIPE_KEY=your_stripe_key

```

## Start the Server 🛜

```bash
npm start
```

## Access CookieDaze 🔗

Open your web browser and navigate to http://localhost:3000.

## Contributing 🤝

We're baking up something special, and your ideas are the secret ingredient! 🎂 If you'd like to contribute to CookieDaze, please fork the repository, whip up your changes in a new branch, and send us a delicious pull request.
