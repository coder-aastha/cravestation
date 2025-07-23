import {MailtrapClient} from "mailtrap";
import dotenv from "dotenv";

dotenv.config();
 
export const client = new MailtrapClient({token: "eb8334232cccc41f11888d2751f06e5e"!});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Test",
};