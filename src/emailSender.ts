export class EmailSender {
    public send(name: string, email: string, subject: string, body: string) {
        console.log(`
Sending email.....

-- start of e-mail -----------------------------------
To: ${name} <${email}>
Subject: ${subject}
------------------------------------------------------
${body}

-- end of e-mail -------------------------------------`)
    }
}
