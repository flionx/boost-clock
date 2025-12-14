import { ListLegal, SubtitleLegal, TextLegal, TitleLegal } from "@/shared/ui/Legal"

const TermsPage = () => {
  return (
    <>
        <TitleLegal>Terms of Use</TitleLegal>
        <TextLegal>Last updated: December 14, 2025.</TextLegal>
        <TextLegal>Please read these Terms and Conditions carefully before using our service.</TextLegal>
        <SubtitleLegal>Acceptance of Terms</SubtitleLegal>
        <TextLegal>By accessing or using BoostClock, you agree to be bound by these Terms of Use. If you do not agree, please do not use the service.</TextLegal>
        <SubtitleLegal>Changes to the Terms</SubtitleLegal>
        <TextLegal>We may change these Terms at any time. The updated version will be effective immediately upon posting on this page.</TextLegal>
        <SubtitleLegal>Use of BoostСlock</SubtitleLegal>
        <ListLegal type="unordered">
            <li>The Service is distributed under the Creative Commons Attribution-NonCommercial 4.0 International license (CC BY-NC 4.0).</li>
            <li>You are free to use, modify, and share the Service for non-commercial purposes, provided that proper attribution is given.</li>
            <li>You may not use BoostClock or its source code for commercial purposes without prior written permission.</li>
            <li>You may not use the Service for illegal or harmful activities.</li>
        </ListLegal>
        <SubtitleLegal>Data Collection and Storage</SubtitleLegal>
        <TextLegal>We use local storage (localStorage) to store settings, tasks, achievements, and statistics for non-authenticated users.</TextLegal>
        <TextLegal>If you choose to create an account (via email/password or Google), your application data (tasks, statistics, achievements, settings) will be stored in Firebase Firestore and associated with your account.</TextLegal>
        <TextLegal>Firebase applies industry-standard security practices. However, no method of electronic storage is 100% secure.</TextLegal>
        <TextLegal>If data is deleted from your device or Firebase, it cannot be recovered.</TextLegal>
        <SubtitleLegal>Limitation of Liability</SubtitleLegal>
        <TextLegal>The Service is provided "as is" and "as available", without warranties of any kind.</TextLegal>
        <ListLegal type="unordered">
            <li>Loss of data due to localStorage clearing, system failures, or Firebase-related issues.</li>
            <li>Any loss caused by the use or inability to use the service.</li>
            <li>Errors or interruptions in the operation of the service.</li>
        </ListLegal>
        <SubtitleLegal>Managing Your Data</SubtitleLegal>
        <TextLegal>You may request deletion of your account and associated data at any time by contacting us at the email address below.</TextLegal>
        <SubtitleLegal>Contacts</SubtitleLegal>
        <TextLegal>If you have any questions, please email us at <a href="mailto:flionx@mail.ru" className="underline">flionx@mail.ru</a>.</TextLegal>
    </>
  )
}

export default TermsPage