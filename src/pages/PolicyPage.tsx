const PolicyPage = () => {
  return (
    <div className="container container-second">
        <h2>Privacy Policy</h2>
        <p>Last updated: March 11, 2025.</p>
        <p>
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use Boost-clock.
        </p>

        <h3>1. Information We Collect</h3>
        <p>We collect the following types of information:</p>
        <ul>
            <li><strong>Account Information</strong>: If you create an account, we collect your email address and authentication data (via email/password or Google account).</li>
            <li><strong>Local Data</strong>: For non-authenticated users, we store settings, tasks, achievements, and statistics in your browser's localStorage.</li>
            <li><strong>Usage Data</strong>: We may collect information about how you interact with the service (e.g., features used, errors encountered).</li>
        </ul>

        <h3>2. How We Use Your Information</h3>
        <p>We use your information for the following purposes:</p>
        <ul>
            <li>To provide and maintain the service.</li>
            <li>To authenticate users and manage accounts.</li>
            <li>To store and sync your data across devices (if you are authenticated).</li>
            <li>To improve the service and develop new features.</li>
        </ul>

        <h3>3. Data Storage</h3>
        <p>Your data is stored in the following ways:</p>
        <ul>
            <li><strong>LocalStorage</strong>: For non-authenticated users, data is stored locally on your device.</li>
            <li><strong>Firebase</strong>: For authenticated users, data is stored securely in Firebase, a cloud-based service provided by Google.</li>
        </ul>

        <h3>4. Data Security</h3>
        <p>We take reasonable measures to protect your data:</p>
        <ul>
            <li>Firebase uses industry-standard security practices to protect your data.</li>
            <li>LocalStorage data is only accessible on your device and is not shared with us or third parties.</li>
        </ul>

        <h3>5. Your Rights</h3>
        <p>You have the following rights regarding your data:</p>
        <ul>
            <li><strong>Access</strong>: You can request a copy of your data.</li>
            <li><strong>Deletion</strong>: You can delete your account and all associated data.</li>
            <li><strong>Export</strong>: You can request an export of your data in a readable format.</li>
        </ul>
        <p>To exercise these rights, please contact us at <a href="mailto:flionx@mail.ru" 
        style={{color: 'currentColor', textDecoration: 'underline'}}>flionx@mail.ru</a>.</p>

        <h3>6. Cookies and Tracking</h3>
        <p>We do not use cookies or similar tracking technologies at this time.</p>

        <h3>7. Sharing Data with Third Parties</h3>
        <p>We do not share your data with third parties, with the exception of Firebase, which is only used for data storage and authentication purposes.</p>

        <h3>8. Changes to This Policy</h3>
        <p>
            We may update this Privacy Policy from time to time. The updated version will be effective immediately upon posting on this page. 
            We will notify you of significant changes via email or a notice within the service.
        </p>
    </div>
  )
}

export default PolicyPage