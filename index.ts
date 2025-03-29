import { Transport, SentMessageInfo } from "nodemailer";
import MailchimpTransactional, {
  MessagesSendTemplateRequest,
  MessagesSendRequest,
  RecipientMergeVar,
  MessagesMessage,
  ApiClient,
} from "@mailchimp/mailchimp_transactional";
import * as packageData from "./package.json";
import { Options } from "nodemailer/lib/mailer";

export interface MailChimpMessage extends Options {
  merge_vars: RecipientMergeVar[];
  template: MessagesSendTemplateRequest;
}

interface MailchimpTransportOptions {
  apiKey: string;
  senderMail?: string;
  senderName?: string;
}

class MailchimpTransport implements Transport {
  name: string;
  version: string;
  client: ApiClient;
  options: MailchimpTransportOptions;

  constructor(options: MailchimpTransportOptions) {
    if (!options.apiKey) {
      throw new Error("Mailchimp Transactional API key is required");
    }

    this.options = options;
    this.name = packageData.name;
    this.version = packageData.version;
    this.client = MailchimpTransactional(options.apiKey);
  }

  send(
    mail: any,
    callback: (err: Error | null, info?: SentMessageInfo) => void
  ): void {
    mail.normalize((err: Error, source: MailChimpMessage) => {
      if (err) {
        return callback(err);
      }

      if (source.template) {
        this.sendWithTemplate(source, callback);
      } else {
        this.sendStandardEmail(source, callback);
      }
    });
  }

  private sendWithTemplate(
    source: MailChimpMessage,
    callback: (err: Error | null, info?: SentMessageInfo) => void
  ) {
    console.log("iam here");
    const message: MessagesMessage = this.buildMailchimpMessage(source);

    const mailchimpTemplateMsg: MessagesSendTemplateRequest = {
      template_name: source.template.template_name,
      template_content : source.template.template_content || [],
      message: {
        ...message,
        merge_vars: source.merge_vars || [],
      },
    };

    this.client.messages
      .sendTemplate(mailchimpTemplateMsg)
      .then((response: any ) => {
        if(response instanceof Error) {
          callback(response);
        }
      });
  }

  private sendStandardEmail(
    source: any,
    callback: (err: Error | null, info?: SentMessageInfo) => void
  ): void {
    const message: MessagesMessage = this.buildMailchimpMessage(source);

    const mailchimpMsg: MessagesSendRequest = {
      message,
    };

    this.client.messages
      .send(mailchimpMsg)
      .then((response: any) => {
        const result = response[0];
        if (result.status === "rejected" || result.status === "invalid") {
          return callback(
            new Error(
              `Mailchimp error: ${result.reject_reason || "Invalid request"}`
            )
          );
        }
        callback(null, {
          envelope: source.message.getEnvelope(),
          messageId: result._id,
        });
      })
      .catch((error: any) => {
        callback(error);
      });
  }

  private buildMailchimpMessage(source: any): MessagesMessage {
    const msg: any = {
      from_email: this.options.senderMail || source.from?.address || "",
      from_name: this.options.senderName || source.from?.name || "",
      subject: source.subject || "",
      text: source.text || undefined,
      html: source.html || undefined,
      to: [].concat(source.to || []).map((entry: any) => ({
        email: entry.address,
        name: entry.name || "",
        type: "to",
      })),
      headers: source.headers || {},
    };

    if (source.attachments) {
      msg.attachments = source.attachments.map((entry: any) => ({
        type: entry.contentType,
        name: entry.filename,
        content: entry.content.toString("base64"),
      }));
    }

    return msg;
  }
}

const MailchimpTransactionalTransport = (options: MailchimpTransportOptions): MailchimpTransport => {
  return new MailchimpTransport(options);
};

export default MailchimpTransactionalTransport;