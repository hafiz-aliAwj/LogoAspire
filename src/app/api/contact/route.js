import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, phone } = await req.json();
    console.log(name, email, phone);
    if (!name || !email || !phone ) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    // Create a transporter using Gmail
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "sabeebr97@gmail.com",
        pass: "dtte cuya rxvc ufxw", // generated ethereal password
      },
    });

    // Email details
    let mailOptions = {
      from: email, // User's email (sender)
      to: process.env.RECEIVER_EMAIL, // Fixed receiver email
      subject: `New Contact Us Form Submission from ${name}`,
      html: `
        <h3>Contact Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
