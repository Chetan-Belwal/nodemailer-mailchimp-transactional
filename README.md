# nodemailer-mailchimp-transactional

A **Nodemailer** transport for integrating with **Mailchimp Transactional (Mandrill)**, allowing you to send emails with templates and merge variables using Nodemailer.

# Contribution

This is open source project your idea, suggestion and issues are welcomed, Its just getting started.

## ✨ Features

- 📩 Send emails using **Mailchimp Transactional (Mandrill)**.
- 📜 Support for **Mailchimp email templates**.
- 🔀 Support for **merge variables**.
- 🛠️ Fully compatible with **Nodemailer**.
- ⚡ Easy setup and usage.

## 📦 Installation

Install via npm:

```sh
npm install nodemailer-mailchimp-transactional
```

Or via yarn:

```sh
yarn add nodemailer-mailchimp-transactional
```

## 🚀 Usage

### 1️⃣ Create a Nodemailer Transporter

```typescript
import nodemailer from 'nodemailer';
import MailchimpTransport, { MailChimpMessage } from 'nodemailer-mailchimp-transactional';

const transporter = nodemailer.createTransport(
  MailchimpTransport({ apiKey: 'YOUR_MAILCHIMP_API_KEY' })
);
```

### 2️⃣ Send a Simple Email

```typescript
const mailOptions: MailChimpMessage  = {
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

### 3️⃣ Send an Email Using a Template

```typescript
const mailOptions : MailChimpMessage = {
  from: 'sender@example.com',
  to: 'recipient@example.com',
  subject: 'Welcome to Our Platform!',
  template: {
    template_name: 'your template Name',
    template_content : []
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

## ⚙️ Configuration

| Option            | Type     | Description                                     |
|------------------|---------|-------------------------------------------------|
| `apiKey`         | string  | Your Mailchimp Transactional API key           |

## 🔗 API Reference

This package integrates with the [Mailchimp Transactional API](https://mailchimp.com/developer/transactional/), allowing you to send dynamic emails with rich features.

## 🛠 Troubleshooting

- Ensure you have a **valid API key** from [Mailchimp Transactional](https://mailchimp.com/developer/transactional/).
- Check Mailchimp’s **template names** match what you’re using.
- Ensure **merge variables** are formatted correctly.

## 📝 License

MIT License. See [LICENSE](LICENSE) for more details.

---

Happy Emailing! 🚀

