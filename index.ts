import { Transport, SentMessageInfo } from "nodemailer";
import MailchimpTransactional, {
  MessagesSendTemplateRequest,
  MessagesSendRequest,
  MessagesMessage,
  ApiClient,
  BaseRequest,
} from "@mailchimp/mailchimp_transactional";
import * as packageData from "./package.json";
import { Options } from "nodemailer/lib/mailer";
import MailMessage from "nodemailer/lib/mailer/mail-message";
import SendmailTransport from "nodemailer/lib/sendmail-transport";

type MappableNodemailerFields =
  | "from"
  | "to"
  | "cc"
  | "bcc"
  | "replyTo"
  | "subject"
  | "text"
  | "html"
  | "headers"
  | "priority";

type OverlappingMailchimpFields =
  | "from_email"
  | "from_name"
  | "to"
  | "subject"
  | "html"
  | "text"
  | "headers"
  | "important"
  | "bcc_address";

export interface MailchimpMessage
  extends Pick<Options, MappableNodemailerFields>,
    Omit<MessagesMessage, OverlappingMailchimpFields>,
    BaseRequest {
  template?: Pick<
    MessagesSendTemplateRequest,
    "template_content" | "template_name"
  >;
  async?: boolean;
  ip_pool?: string;
  send_at?: string;
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
    mail: MailMessage<SendmailTransport.SentMessageInfo>,
    callback: (err: Error | null, info?: SentMessageInfo) => void
  ): void {
    (
      mail.normalize as (
        cb: (err: Error | null, data: MailchimpMessage) => void
      ) => void
    )((err, source: MailchimpMessage) => {
      if (source.template) {
        this.sendWithTemplate(source, callback);
      } else {
        return this.sendStandardEmail(source, callback);
      }
    });
  }

  private sendWithTemplate(
    source: MailchimpMessage,
    callback: (err: Error | null, info?: SentMessageInfo) => void
  ) {
    const message: MessagesMessage = this.buildMailchimpMessage(source);

    const mailchimpTemplateMsg: MessagesSendTemplateRequest = {
      template_name: source.template?.template_name || "",
      template_content: source.template?.template_content || [],
      message,
      ip_pool: source.ip_pool,
      async: source.async,
      send_at: source.send_at,
      outputFormat: source.outputFormat,
    };

    this.client.messages
      .sendTemplate(mailchimpTemplateMsg)
      .then((response: any) => {
        if (response instanceof Error) {
          callback(response);
        } else {
          callback(null, response);
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
      ip_pool: source.ip_pool,
      async: source.async,
      send_at: source.send_at,
      outputFormat: source.outputFormat,
    };

    this.client.messages.send(mailchimpMsg).then((response: any) => {
      if (response instanceof Error) {
        callback(response);
      } else {
        callback(null, response);
      }
    });
  }

  private buildMailchimpMessage(source: MailchimpMessage): MessagesMessage {
    const msg: any = {
      from_email:
        this.options.senderMail ?? typeof source.from === "string"
          ? source.from
          : source.from?.address ?? "",
      from_name:
        this.options.senderName ?? typeof source.from === "string"
          ? source.from
          : source.from?.address ?? "",
      subject: source.subject ?? "",
      text: source.text ?? undefined,
      html: source.html ?? undefined,
      to: [].concat((source.to as any) ?? []).map((entry: any) => ({
        email: entry.address,
        name: entry.name ?? "",
        type: "to",
      })),
      headers: source.headers ?? {},
      important: source.priority,
      track_opens: source.track_opens,
      track_clicks: source.track_clicks,
      auto_text: source.auto_text,
      auto_html: source.auto_html,
      inline_css: source.inline_css,
      url_strip_qs: source.url_strip_qs,
      preserve_recipients: source.preserve_recipients,
      view_content_link: source.view_content_link,
      tracking_domain: source.tracking_domain,
      signing_domain: source.signing_domain,
      return_path_domain: source.return_path_domain,
      merge: source.merge ?? !!(source.merge_vars || source.global_merge_vars),
      merge_language: source.merge_language ?? "mailchimp",
      tags: source.tags,
      subaccount: source.subaccount,
      metadata: source.metadata ?? {},
      recipient_metadata: source.recipient_metadata ?? [],
      google_analytics_domains: source.google_analytics_domains ?? [],
      google_analytics_campaign: source.google_analytics_campaign ?? undefined,
    };

    // Handle CC and BCC recipients
    if (source.cc) {
      const ccRecipients = [].concat(source.cc as any).map((entry: any) => ({
        email: entry.address,
        name: entry.name ?? "",
        type: "cc",
      }));

      msg.to = msg.to.concat(ccRecipients);
    }

    if (source.bcc) {
      const bccRecipients = [].concat(source.bcc as any).map((entry: any) => ({
        email: entry.address,
        name: entry.name ?? "",
        type: "bcc",
      }));
      msg.to = msg.to.concat(bccRecipients);
    }

    if (source.merge_vars) {
      msg.merge_vars = source.merge_vars;
    }
    if (source.global_merge_vars) {
      msg.global_merge_vars = source.global_merge_vars;
    }

    return msg;
  }
}

const MailchimpTransactionalTransport = (
  options: MailchimpTransportOptions
): MailchimpTransport => {
  return new MailchimpTransport(options);
};

export default MailchimpTransactionalTransport;
