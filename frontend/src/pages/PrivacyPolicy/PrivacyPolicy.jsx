import React from 'react'
import './PrivacyPolicy.css'
import FixedButtons from '../../components/FixedButtons/FixedButtons'

const PrivacyPolicy = () => {
  return (
    <div className='privacy-container'>
      <div className='privacy-header'>
        <h1>Privacy Policy</h1>
        <p className='privacy-subtitle'>Last Updated: January 16, 2026</p>
      </div>

      <div className='privacy-content'>
        <section className='privacy-section'>
          <h2>1. Introduction</h2>
          <p>
            Welcome to CityBites ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you
            have a positive experience on our platform. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website and mobile application.
          </p>
          <p>
            Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do
            not use our services.
          </p>
        </section>

        <section className='privacy-section'>
          <h2>2. Information We Collect</h2>
          <h3>2.1 Information You Provide Directly</h3>
          <ul className='policy-list'>
            <li><strong>Account Information:</strong> Name, email address, phone number, password, and delivery address</li>
            <li><strong>Payment Information:</strong> Credit/debit card details, billing address (processed securely)</li>
            <li><strong>Order Information:</strong> Food preferences, dietary restrictions, special requests</li>
            <li><strong>Communications:</strong> Messages, feedback, complaints, and customer support inquiries</li>
          </ul>

          <h3>2.2 Information Collected Automatically</h3>
          <ul className='policy-list'>
            <li><strong>Device Information:</strong> Device type, operating system, unique device identifiers</li>
            <li><strong>Log Data:</strong> IP address, access times, pages visited, and referring URLs</li>
            <li><strong>Location Data:</strong> GPS coordinates for delivery purposes (with your permission)</li>
            <li><strong>Cookies & Tracking:</strong> We use cookies and similar technologies to enhance user experience</li>
          </ul>
        </section>

        <section className='privacy-section'>
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect for various purposes, including:</p>
          <ul className='policy-list'>
            <li>Processing and fulfilling your food orders</li>
            <li>Providing customer support and responding to inquiries</li>
            <li>Personalizing your experience and recommending restaurants</li>
            <li>Sending order confirmations and delivery updates</li>
            <li>Processing payments securely</li>
            <li>Improving our website, mobile app, and services</li>
            <li>Conducting marketing campaigns and promotional activities</li>
            <li>Complying with legal obligations and resolving disputes</li>
            <li>Analytics and research for service improvement</li>
          </ul>
        </section>

        <section className='privacy-section'>
          <h2>4. Sharing Your Information</h2>
          <h3>We may share your information with:</h3>
          <ul className='policy-list'>
            <li><strong>Restaurants:</strong> Order and delivery details necessary to prepare and deliver your food</li>
            <li><strong>Delivery Partners:</strong> Location and contact information for order delivery</li>
            <li><strong>Payment Processors:</strong> Encrypted payment information for transaction processing</li>
            <li><strong>Service Providers:</strong> Third-party vendors for analytics, hosting, and customer support</li>
            <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
          </ul>
          <p>
            <strong>Important:</strong> We do not sell your personal information to third parties for marketing purposes.
          </p>
        </section>

        <section className='privacy-section'>
          <h2>5. Data Security</h2>
          <p>
            We implement comprehensive security measures to protect your personal information from unauthorized access,
            alteration, disclosure, or destruction. Our security measures include:
          </p>
          <ul className='policy-list'>
            <li>SSL/TLS encryption for data in transit</li>
            <li>Secure password hashing and storage</li>
            <li>Regular security audits and updates</li>
            <li>Restricted access to personal information</li>
            <li>Compliance with industry-standard security protocols</li>
          </ul>
          <p>
            However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security
            of your information.
          </p>
        </section>

        <section className='privacy-section'>
          <h2>6. Your Privacy Rights</h2>
          <p>You have the following rights regarding your personal information:</p>
          <ul className='policy-list'>
            <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
            <li><strong>Right to Rectification:</strong> Correct inaccurate information</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your data (subject to legal requirements)</li>
            <li><strong>Right to Restrict Processing:</strong> Limit how we use your information</li>
            <li><strong>Right to Data Portability:</strong> Receive your data in a portable format</li>
            <li><strong>Right to Opt-Out:</strong> Unsubscribe from marketing communications</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at <strong>contactCityBites@gmail.com</strong> with your
            request details.
          </p>
        </section>

        <section className='privacy-section'>
          <h2>7. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic,
            and understand user preferences. You can control cookie settings through your browser, though some features
            may not function properly if cookies are disabled.
          </p>
          <p>
            Types of cookies we use:
          </p>
          <ul className='policy-list'>
            <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
            <li><strong>Performance Cookies:</strong> Help us understand user behavior</li>
            <li><strong>Marketing Cookies:</strong> Used to deliver personalized advertisements</li>
          </ul>
        </section>

        <section className='privacy-section'>
          <h2>8. Children's Privacy</h2>
          <p>
            CityBites is not intended for children under the age of 18. We do not knowingly collect personal
            information from children. If we become aware that we have collected information from a child without
            parental consent, we will take steps to delete such information promptly.
          </p>
        </section>

        <section className='privacy-section'>
          <h2>9. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices of
            these external sites. We encourage you to review their privacy policies before providing any personal
            information.
          </p>
        </section>

        <section className='privacy-section'>
          <h2>10. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to provide our services and fulfill the
            purposes outlined in this Privacy Policy. You can request deletion of your account and associated data at
            any time.
          </p>
          <p>
            Retention periods vary based on the type of information:
          </p>
          <ul className='policy-list'>
            <li>Account data: Retained until account deletion</li>
            <li>Order history: Retained for 3 years for legal/tax purposes</li>
            <li>Payment information: Deleted after transaction completion</li>
            <li>Marketing data: Retained until opt-out</li>
          </ul>
        </section>

        <section className='privacy-section'>
          <h2>11. International Data Transfers</h2>
          <p>
            Your information may be transferred to, stored in, and processed in countries other than your country of
            residence. These countries may have data protection laws that differ from your home country. By using
            CityBites, you consent to such transfers.
          </p>
        </section>

        <section className='privacy-section'>
          <h2>12. Policy Updates</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws.
            We will notify you of any material changes by posting the updated policy on our website and updating the
            "Last Updated" date. Your continued use of our services constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className='privacy-section'>
          <h2>13. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <div className='contact-box'>
            <p><strong>Email:</strong> contactCityBites@gmail.com</p>
            <p><strong>Phone:</strong> +94 72 202 6105</p>
            <p><strong>Mailing Address:</strong> 123 Food Street, City Center, Your City, YC 12345</p>
            <p><strong>Data Protection Officer:</strong> privacy@citybites.com</p>
          </div>
          <p>
            We will respond to your inquiry within 30 business days.
          </p>
        </section>

        <section className='privacy-section'>
          <h2>14. Acknowledgment</h2>
          <p>
            By accessing and using CityBites, you acknowledge that you have read this Privacy Policy and agree to its
            terms. If you do not agree with any part of this policy, please discontinue using our services.
          </p>
        </section>
      </div>
      <FixedButtons />
    </div>
  )
}

export default PrivacyPolicy
