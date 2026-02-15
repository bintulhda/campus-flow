const nodemailer = require('nodemailer');

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send booking confirmation email
 */
const sendBookingEmail = async (clubEmail, clubName, status, details) => {
  try {
    const subject =
      status === 'approved'
        ? '✅ Booking Approved - CampusFlow'
        : '❌ Booking Rejected - CampusFlow';

    const statusMessage =
      status === 'approved'
        ? `Your booking for <b>${details.venueName}</b> on <b>${details.date}</b> (${details.timeSlot}) has been <b>APPROVED</b>!`
        : `Your booking request for <b>${details.venueName}</b> has been <b>REJECTED</b>.<br>Reason: ${details.reason}`;

    const htmlContent = `
      <h2>CampusFlow - Booking Confirmation</h2>
      <p>Dear ${clubName},</p>
      ${statusMessage}
      <br><br>
      <p><b>Booking Details:</b></p>
      <ul>
        <li>Venue: ${details.venueName}</li>
        <li>Date: ${details.date}</li>
        <li>Time Slot: ${details.timeSlot}</li>
        <li>Attendees: ${details.attendees}</li>
        <li>Status: ${status.toUpperCase()}</li>
      </ul>
      <br>
      <p>Best regards,<br>CampusFlow Team</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: clubEmail,
      subject,
      html: htmlContent,
    });

    console.log(`✉️  Email sent to ${clubEmail}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendBookingEmail };
