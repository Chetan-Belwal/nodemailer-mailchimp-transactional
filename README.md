# nodemailer-mailchimp-transactional

A **Nodemailer** transport for integrating with **Mailchimp Transactional (Mandrill)**, allowing you to send emails with templates and merge variables using Nodemailer.

---

## ✨ Features

- 📩 Send emails using **Mailchimp Transactional (Mandrill)**.
- 💜 Support for **Mailchimp email templates**.
- 🔀 Support for **merge variables**.
- 🛠️ Fully compatible with **Nodemailer**.
- ⚡ Easy setup and usage.

---

## 📦 Installation

### 1⃣ Install the package

For npm:
```sh
npm install nodemailer-mailchimp-transactional
```

For yarn:
```sh
yarn add nodemailer-mailchimp-transactional
```

### 2⃣ Install `nodemailer` as a peer dependency

Since `nodemailer` is a **peer dependency**, make sure to install it separately:

```sh
npm install nodemailer
# or
yarn add nodemailer
```

---

## 📚 TypeScript Users

If you're using **TypeScript**, you'll need to install the required types:

```sh
npm install --save-dev @types/nodemailer @types/mailchimp__mailchimp_transactional
# or
yarn add -D @types/nodemailer @types/mailchimp__mailchimp_transactional
```

These types ensure that your package works seamlessly with TypeScript.

---

## 🚀 Usage

### ✅ TypeScript Example

#### 1⃣ Create a Nodemailer Transporter

```typescript
import nodemailer from 'nodemailer';
import MailchimpTransport, { MailChimpMessage } from 'nodemailer-mailchimp-transactional';

const transporter = nodemailer.createTransport(
  MailchimpTransport({ apiKey: 'YOUR_MAILCHIMP_API_KEY' })
);
```

#### 2⃣ Send a Simple Email

```typescript
const mailOptions: MailChimpMessage = {
  from: 'sender@example.com',
  to: 'recipient@example.com',
  subject: 'Hello from Mailchimp!',
  text: 'This is a test email.',
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Email sent:', info);
  }
});
```

#### 3⃣ Send an Email Using a Template

```typescript
const mailOptions: MailChimpMessage = {
  from: 'sender@example.com',
  to: 'recipient@example.com',
  subject: 'Welcome to Our Platform!',
  template: {
    template_name: 'your-template-name',
    template_content: [],
  },
  merge_vars: [
    {
      rcpt: 'recipient@example.com',
      vars: [
        { name: 'FIRST_NAME', content: 'Ninja' },
        { name: 'WELCOME_TEXT', content: 'Welcome to our platform!' },
      ],
    },
  ],
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Template Email sent:', info);
  }
});
```

---

## 🎉 JavaScript (Non-TypeScript) Example

If you're using plain JavaScript, here’s how to get started:

#### 1⃣ Create a Nodemailer Transporter

```javascript
const nodemailer = require('nodemailer');
const MailchimpTransport = require('nodemailer-mailchimp-transactional');

const transporter = nodemailer.createTransport(
  MailchimpTransport({ apiKey: 'YOUR_MAILCHIMP_API_KEY' })
);
```

#### 2⃣ Send a Simple Email

```javascript
const mailOptions = {
  from: 'sender@example.com',
  to: 'recipient@example.com',
  subject: 'Hello from Mailchimp!',
  text: 'This is a test email.',
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Email sent:', info);
  }
});
```

#### 3⃣ Send an Email Using a Template

```javascript
const mailOptions = {
  from: 'sender@example.com',
  to: 'recipient@example.com',
  subject: 'Welcome to Our Platform!',
  template: {
    template_name: 'your-template-name',
    template_content: [],
  },
  merge_vars: [
    {
      rcpt: 'recipient@example.com',
      vars: [
        { name: 'FIRST_NAME', content: 'Ninja' },
        { name: 'WELCOME_TEXT', content: 'Welcome to our platform!' },
      ],
    },
  ],
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Template Email sent:', info);
  }
});
```

---

## ⚙️ Configuration

| Option            | Type     | Description                                   |
|------------------|---------|-------------------------------------------------|
| `apiKey`         | string  | Your Mailchimp(Mandrill) API key            |


## 🔗 API Reference

This package integrates with the [Mailchimp Transactional API](https://mailchimp.com/developer/transactional/), allowing you to send dynamic emails with rich features.

---

## 🛠 Troubleshooting

- ✅ Ensure you have a **valid API key** from [Mailchimp Transactional](https://mailchimp.com/developer/transactional/).
- 📚 Check that Mailchimp’s **template names** match what you're using.
- 🔀 Ensure **merge variables** are formatted correctly.

---

## 📝 License

MIT License. See [LICENSE](LICENSE) for more details.

---

Happy Emailing! 🚀

