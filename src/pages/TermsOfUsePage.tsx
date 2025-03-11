const TermsOfUsePage = () => {
  return (
    <div className="container container-second">
        <h2>Terms of Use</h2>
        <p>Last updated: February 27, 2025.</p>
        <p>Please read these Terms and Conditions carefully before using our service.</p>

        <h3>Acceptance of Terms</h3>
        <p>By using Boost-clock, you agree to be bound by these Terms and Conditions.</p>

        <h3>Changes to the Terms</h3>
        <p>We may change these Terms at any time. The updated version will be effective immediately upon posting on this page.</p>

        <h3>Use of BoostСlock</h3>
        <ul>
            <li>You may use the service for personal, non-commercial purposes.</li>
            <li style={{lineHeight: 1.8}}>
                The Service is distributed under a Creative Commons Attribution-NonCommercial 4.0 International license (CC BY-NC 4.0). 
                This means that you are free to use and modify it, but only for non-commercial purposes and with attribution.
            </li>
            <li>You are not permitted to use Boost-clock in commercial projects without prior authorization.</li>
            <li>You may not reverse engineer, copy, or modify the service without complying with the license terms.</li>
            <li>You may not use Boost-clock for illegal activities.</li>
        </ul>

        <h3>Data Collection and Storage</h3>
        <p>We use local storage (localStorage) to store settings, tasks, achievements, and statistics for non-authenticated users.</p>
        <p>If you choose to create an account and authenticate via email/password or Google, your data will be stored securely in Firebase.</p>
        <p>All data stored in Firebase is protected by industry-standard security measures.</p>
        <p>If data is deleted from your device or Firebase, it cannot be recovered.</p>

        <h3>Limitation of Liability</h3>
        <p>We are not responsible for:</p>
        <ul>
            <li>Loss of data due to localStorage purging, system failures, or Firebase-related issues.</li>
            <li>Any loss caused by the use or inability to use the service.</li>
            <li>Errors or failures in the operation of the service.</li>
        </ul>

        <h3>Managing Your Data</h3>
        <p>If you wish to delete your account or export your data, please contact us using the email below.</p>

        <h3>Contacts</h3>
        <p>If you have any questions, please email us at <a href="mailto:flionx@mail.ru" 
        style={{color: 'currentColor', textDecoration: 'underline'}}>flionx@mail.ru</a>.</p>
    </div>
  )
}

export default TermsOfUsePage