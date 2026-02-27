# Sanjivni Hospital OPD Portal

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Hospital branding: "Sanjivni Hospital" OPD registration portal
- Login / Register account system for patients
  - Patient can create an account (name, email, password)
  - Patient can log in to view their own OPD registrations
- OPD patient registration form with fields:
  - Full Name
  - Age
  - Address
  - Gender (Male / Female / Other)
  - Appointment Date
  - Doctor selection
- OPD fee payment section with QR code image and UPI number: 7258871868
- Patient support contact number displayed: 8757188299
- Backend storage for patient accounts and OPD registrations
- Admin view to list all registered OPD patients

### Modify
- None (new project)

### Remove
- None (new project)

## Implementation Plan
1. Backend: Motoko canister with:
   - Patient account management: register, login, getMyProfile
   - OPD records: submitOPDForm, getMyOPDRecords, getAllPatients (admin)
   - Fields: name, age, address, gender, appointmentDate, doctor, timestamp, patientId
2. Frontend:
   - Landing page with hospital name, logo, tagline
   - Login / Sign Up page for patient accounts
   - OPD Registration Form (protected, requires login) with all required fields
   - Payment section showing UPI QR code and number 7258871868
   - Success confirmation after form submission
   - Patient dashboard to view their own appointment history
   - Support number 8757188299 in footer
   - Admin page to view all registered patients
