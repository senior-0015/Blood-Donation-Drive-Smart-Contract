### Blood Donation Drive Smart Contract Documentation

#### Overview:

The Blood Donation Drive Smart Contract is designed to manage entities such as hospitals, patients, donors, and pledges in a blood donation drive. It includes functionalities for initializing the drive, adding and retrieving information about hospitals, patients, and donors, handling blood donation pledges, and performing CRUD operations on these entities.

#### Entities:

1. **Hospital:**
   - `id`: Unique identifier for the hospital.
   - `name`: Name of the hospital.
   - `location`: Location of the hospital.
   - `created_date`: Timestamp of when the hospital record was created.
   - `updated_at`: Optional timestamp indicating the last update to the hospital record.

2. **Patient:**
   - `id`: Unique identifier for the patient.
   - `name`: Name of the patient.
   - `blood_type`: Blood type of the patient.
   - `created_date`: Timestamp of when the patient record was created.
   - `updated_at`: Optional timestamp indicating the last update to the patient record.

3. **Donor:**
   - `id`: Unique identifier for the donor.
   - `name`: Name of the donor.
   - `blood_type`: Blood type of the donor.
   - `created_date`: Timestamp of when the donor record was created.
   - `updated_at`: Optional timestamp indicating the last update to the donor record.

4. **Pledge:**
   - `id`: Unique identifier for the pledge.
   - `donor_id`: ID of the donor making the pledge.
   - `patient_id`: ID of the patient receiving the pledge.
   - `amount`: Amount pledged by the donor.
   - `created_date`: Timestamp of when the pledge record was created.
   - `updated_at`: Optional timestamp indicating the last update to the pledge record.

#### Contract Functions:

1. **initBloodDrive():**
   - Initializes the blood donation drive, creating a default hospital if the drive has not been initialized.

2. **getHospitals():**
   - Returns a list of hospitals participating in the blood donation drive.

3. **getPatients():**
   - Returns a list of patients registered in the blood donation drive.

4. **getDonors():**
   - Returns a list of donors participating in the blood donation drive.

5. **addPatient(name: string, blood_type: string):**
   - Adds a new patient to the blood donation drive.

6. **addDonor(name: string, blood_type: string):**
   - Adds a new donor to the blood donation drive.

7. **makePledge(payload: PledgePayload):**
   - Handles a blood donation pledge from a donor to a patient.

8. **getPledgesForPatient(patient_id: string):**
   - Returns a list of pledges made for a specific patient.

9. **updatePatient(id: string, name: string, blood_type: string):**
   - Updates information for an existing patient.

10. **updateDonor(id: string, name: string, blood_type: string):**
   - Updates information for an existing donor.

11. **deletePatient(id: string):**
    - Deletes a patient from the blood donation drive.

12. **deleteDonor(id: string):**
    - Deletes a donor from the blood donation drive.

13. **updatePledge(id: string, amount: string):**
    - Updates the amount pledged for an existing blood donation pledge.

14. **deletePledge(id: string):**
    - Deletes a blood donation pledge.

## installation

```bash
git clone https://github.com/senior-0015/Blood-Donation-Drive-Smart-Contract.git
cd Blood-Donation-Drive-Smart-Contract
npm install
dfx start --background --clean
npm run gen-deploy
```
