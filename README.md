# nodemailer-mailchimp-transactional

A **Nodemailer** transport for integrating with **Mailchimp Transactional (Mandrill)**, allowing you to send emails with templates and merge variables using Nodemailer.

---

## ✨ Features

- 📩 Send emails using **Mailchimp Transactional (Mandrill)**.
- 💜 Support for **Mailchimp email templates**.
- 🔀 Support for **merge variables**.
- 🛠️ Fully compatible with **Nodemailer**.
- ⚡ Easy setup and usage.
- 🎯 Support for all **Mailchimp Transactional message fields**.
- 🏗️ **NestJS** integration support.

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
import MailchimpTransport, { MailchimpMessage } from 'nodemailer-mailchimp-transactional';

const transporter = nodemailer.createTransporter(
  MailchimpTransport({ apiKey: 'YOUR_MAILCHIMP_API_KEY' })
);
```

#### 2⃣ Send a Simple Email

```typescript
const mailOptions: MailchimpMessage = {
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
const mailOptions: MailchimpMessage = {
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

#### 4⃣ Advanced Email with Mailchimp-specific Options

```typescript
const mailOptions: MailchimpMessage = {
  from: 'sender@example.com',
  to: 'recipient@example.com',
  subject: 'Advanced Email Features',
  html: '<h1>Hello World!</h1>',
  // Mailchimp-specific tracking options
  track_opens: true,
  track_clicks: true,
  // Auto-generate text version from HTML
  auto_text: true,
  // Inline CSS for better email client compatibility
  inline_css: true,
  // Add tags for analytics
  tags: ['newsletter', 'promotional'],
  // Set importance
  important: true,
  // Custom metadata
  metadata: {
    campaign_id: 'summer-2024',
    user_segment: 'premium'
  },
  // Google Analytics tracking
  google_analytics_domains: ['yourwebsite.com'],
  google_analytics_campaign: 'email-campaign-2024',
  // Custom tracking domain
  tracking_domain: 'track.yourwebsite.com',
  // Subaccount (if using Mailchimp subaccounts)
  subaccount: 'your-subaccount-id'
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Advanced Email sent:', info);
  }
});
```

---

## 🎉 JavaScript (Non-TypeScript) Example

If you're using plain JavaScript, here's how to get started:

#### 1⃣ Create a Nodemailer Transporter

```javascript
const nodemailer = require('nodemailer');
const MailchimpTransport = require('nodemailer-mailchimp-transactional');

const transporter = nodemailer.createTransporter(
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
  merge_vars: [
    {
      rcpt: 'recipient@example.com',
      vars: [
        { name: 'FIRST_NAME', content: 'Ninja' },
        { name: 'WELCOME_TEXT', content: 'Welcome to our platform!' },
      ],
    },
  ],
  global_merge_vars: [
   { name: 'FIRST_NAME', content: 'Ninja' },
   { name: 'WELCOME_TEXT', content: 'Welcome to our platform!' },
  ]
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
  global_merge_vars: [
   { name: 'FIRST_NAME', content: 'Ninja' },
   { name: 'WELCOME_TEXT', content: 'Welcome to our platform!' },
  ]
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

## 🏗️ NestJS Integration

### Setting up with NestJS Mailer Module

Here's how to integrate the transport with NestJS using the `@nestjs-modules/mailer` package:

#### 1⃣ Install NestJS Mailer Dependencies

```sh
npm install @nestjs-modules/mailer @nestjs/config
# or
yarn add @nestjs-modules/mailer @nestjs/config
```

#### 2⃣ Create Mail Configuration Service

```typescript
import { Injectable } from '@nestjs/common';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import MailchimpTransport from 'nodemailer-mailchimp-transactional';
import MailMessage = require('nodemailer/lib/mailer/mail-message');

interface MailConfig {
  driver: 'smtp' | 'mchimp' | 'log';
  transport?: any;
}

@Injectable()
export class MailConfigService implements MailerOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMailerOptions(): Promise<MailerOptions> | MailerOptions {
    const mailConfig = this.configService.get<MailConfig>('mail');

    switch (mailConfig.driver) {
      case 'smtp':
        mailConfig.transport = {
          host: this.configService.get('MAIL_SMTP_HOST', 'localhost'),
          port: this.configService.get('MAIL_SMTP_PORT', 1025),
          tls: JSON.parse(
            this.configService.get('MAIL_SMTP_TLS', JSON.stringify('')),
          ),
          secure:
            this.configService.get('MAIL_SMTP_SECURE', 'false') === 'true',
          auth: {
            user: this.configService.get('MAIL_USERNAME'),
            pass: this.configService.get('MAIL_PASSWORD'),
          },
        };
        break;

      case 'mchimp': 
        mailConfig.transport = MailchimpTransport({
          apiKey: this.configService.get('MAILCHIMP_API_KEY')
        });
        break;

      case 'log':
      default:
        mailConfig.transport = {
          name: 'log',
          version: '1.0.0',
          send(
            mail: MailMessage<any>,
            callback: (err: Error | null, info: any) => void,
          ) {
            const input = mail.message.createReadStream();
            const envelope = mail.message.getEnvelope();
            const messageId = mail.message.messageId();
            input.pipe(process.stdout);
            input.on('end', function () {
              callback(null, {
                envelope,
                messageId,
              });
            });
          },
        };
    }

    return mailConfig;
  }
}
```

#### 3⃣ Register in App Module

```typescript
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { MailConfigService } from './mail-config.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),
  ],
})
export class AppModule {}
```

#### 4⃣ Use in Service

```typescript
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendWelcomeEmail(userEmail: string, userName: string) {
    await this.mailerService.sendMail({
      to: userEmail,
      subject: 'Welcome!',
      template: {
        template_name: 'welcome-template',
        template_content: [],
      },
      merge_vars: [
        {
          rcpt: userEmail,
          vars: [
            { name: 'USER_NAME', content: userName },
          ],
        },
      ],
      // Use any Mailchimp-specific options
      track_opens: true,
      track_clicks: true,
      tags: ['welcome', 'onboarding'],
    });
  }
}
```

---

## ⚙️ Configuration

| Option            | Type     | Description                                   |
|------------------|---------|-------------------------------------------------|
| `apiKey`         | string  | Your Mailchimp(Mandrill) API key            |
| `senderMail`     | string  | Default sender email (optional)              |
| `senderName`     | string  | Default sender name (optional)               |

---

## 📋 Supported Mailchimp Message Fields

This transport supports **all Mailchimp Transactional message fields** in addition to standard Nodemailer fields. Here are the key Mailchimp-specific options you can use:

### 🎯 Tracking & Analytics
- `track_opens`: boolean - Track email opens
- `track_clicks`: boolean - Track link clicks
- `google_analytics_domains`: string[] - Domains for Google Analytics
- `google_analytics_campaign`: string - GA campaign name
- `tracking_domain`: string - Custom tracking domain

### 🏷️ Organization & Metadata
- `tags`: string[] - Tags for categorization
- `metadata`: object - Custom metadata key-value pairs
- `subaccount`: string - Subaccount ID (if using subaccounts)

### 🎨 Content Processing
- `auto_text`: boolean - Auto-generate text version from HTML
- `auto_html`: boolean - Auto-generate HTML version from text
- `inline_css`: boolean - Inline CSS styles
- `url_strip_qs`: boolean - Strip query strings from URLs
- `preserve_recipients`: boolean - Preserve recipient list in headers
- `view_content_link`: boolean - Add view-in-browser link

### 🔗 Merge Variables & Personalization
- `merge`: boolean - Enable merge tag processing
- `merge_language`: string - Merge language ('mailchimp' or 'handlebars')
- `merge_vars`: array - Per-recipient merge variables
- `global_merge_vars`: array - Global merge variables for all recipients

### 📅 Scheduling & Delivery
- `async`: boolean - Send asynchronously
- `ip_pool`: string - Dedicated IP pool name
- `send_at`: string - Schedule send time (YYYY-MM-DD HH:MM:SS format)

### 🔒 Authentication & Domains
- `signing_domain`: string - Domain for DKIM signing
- `return_path_domain`: string - Custom return-path domain

### 📊 Recipients & Targeting
- `recipient_metadata`: array - Per-recipient metadata
- `important`: boolean - Mark as important/high priority

---

## 🔗 API Reference

This package integrates with the [Mailchimp Transactional API](https://mailchimp.com/developer/transactional/), allowing you to send dynamic emails with rich features.

---

## 🛠 Troubleshooting

- ✅ Ensure you have a **valid API key** from [Mailchimp Transactional](https://mailchimp.com/developer/transactional/).
- 📚 Check that Mailchimp's **template names** match what you're using.
- 🔀 Ensure **merge variables** are formatted correctly.
- 🏷️ Verify that any **custom tracking domains** are properly configured in your Mailchimp account.
- 📅 When using `send_at`, ensure the date format is correct (YYYY-MM-DD HH:MM:SS).

---

## 📝 License

MIT License. See [LICENSE](LICENSE) for more details.

---

Happy Emailing! 🚀