import nodemailer from 'nodemailer';

const sendEmail = async (email, subject, html) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
		});
       
		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			html: html
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};

const emailVerificationTemplate = (link, user) => {
	let name, _ = user.local.fullName.split(" ");
	return `<h3> Hello ${user.local.fullName}</h3>
	<p>
	Thank you for creating an account with dynamikProperties.
	please click the link below to verify your account within 24 hours:
	</p>
	<br/>
	<a href="${link}">Click Here</a><br/>
	<br/>
	<p>If the button above isn’t working, paste the link below into your browser</p><br/>
	${link}
	<br/>
	<br/>
	<p>If you did not create an account with dynamikProperties, just ignore this message.<br/>
	<br/>
	Thank you for choosing dynamikProperties.
	</p>
	`
}

// password reset template
const passwordResetTemplate = (link, user) => {
	return `<p> Hi <strong>${user.local.fullName} </strong></p>,
	<br/>
	<p>
	There was recently a request to change the password on your account.
	If you requested this password change, please click the link below to set a new password within 24 hours:
	</p>
	<br/>
	<a href="${link}">Click Here</a><br/>
	<br/>
	<p>If the button above isn’t working, paste the link below into your browser</p><br/>
	${link}
	<br/>
	<br/>
	<p>If you don't want to change your password, just ignore this message.<br/>
	<br/>
	Thank you for choosing dynamikProperties.
	</p>
	`
}



export  {emailVerificationTemplate, passwordResetTemplate, sendEmail, }