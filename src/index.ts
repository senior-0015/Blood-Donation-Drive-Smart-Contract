// Importing necessary modules
import { $query, $update, Record, StableBTreeMap, Vec, match, Result, nat64, ic, Opt, Principal } from 'azle';
import { v4 as uuidv4 } from 'uuid';

// Defining record types for different entities
type Hospital = Record<{
  id: string;
  name: string;
  location: string;
  created_date: nat64;
  updated_at: Opt<nat64>;
}>;

type Patient = Record<{
  id: string;
  name: string;
  blood_type: string;
  created_date: nat64;
  updated_at: Opt<nat64>;
}>;

type Donor = Record<{
  id: string;
  name: string;
  blood_type: string;
  created_date: nat64;
  updated_at: Opt<nat64>;
}>;

type Pledge = Record<{
  id: string;
  donor_id: string;
  patient_id: string;
  amount: string;
  created_date: nat64;
  updated_at: Opt<nat64>;
}>;

type PledgePayload = Record<{
  donor_id: string;
  patient_id: string;
  amount: string;
}>;

type PledgeResponse = Record<{
  msg: string;
  amount: number;
}>;

// Creating instances of StableBTreeMap for each entity type
const hospitalStorage = new StableBTreeMap<string, Hospital>(0, 44, 512);
const patientStorage = new StableBTreeMap<string, Patient>(1, 44, 512);
const donorStorage = new StableBTreeMap<string, Donor>(2, 44, 512);
const pledgeStorage = new StableBTreeMap<string, Pledge>(3, 44, 512);

// Helper function to get entity from storage
function getEntity<T>(storage: StableBTreeMap<string, T>, id: string): T | null {
  return match(storage.get(id), {
    Some: (entity) => entity,
    None: () => null,
  });
}

// Function to initialize the blood donation drive
$update;
export function initBloodDrive(): string {
  if (!hospitalStorage.isEmpty() || !patientStorage.isEmpty() || !donorStorage.isEmpty() || !pledgeStorage.isEmpty()) {
    return `Blood donation drive has already been initialized`;
  }

  // Initialize default hospital
  const hospital = {
    id: uuidv4(),
    name: "Central Hospital",
    location: "City Center",
    created_date: ic.time(),
    updated_at: Opt.None,
  };
  hospitalStorage.insert(hospital.id, hospital);

  return hospital.id;
}

$query;
// Function to get information about hospitals
export function getHospitals(): Result<Vec<Hospital>, string> {
  const hospitals = hospitalStorage.values();
  if (hospitals.length === 0) {
    throw new Error("No hospitals found");
  }
  return Result.Ok(hospitals);
}

$query;
// Function to get information about patients
export function getPatients(): Result<Vec<Patient>, string> {
  const patients = patientStorage.values();
  if (patients.length === 0) {
    throw new Error("No patients found");
  }
  return Result.Ok(patients);
}

$query;
// Function to get information about donors
export function getDonors(): Result<Vec<Donor>, string> {
  const donors = donorStorage.values();
  if (donors.length === 0) {
    throw new Error("No donors found");
  }
  return Result.Ok(donors);
}

// Function to add a new patient
$update;
export function addPatient(name: string, blood_type: string): string {
  const patient = {
    id: uuidv4(),
    name: name,
    blood_type: blood_type,
    created_date: ic.time(),
    updated_at: Opt.None,
  };
  patientStorage.insert(patient.id, patient);
  return patient.id;
}

// Function to add a new donor
$update;
export function addDonor(name: string, blood_type: string): string {
  const donor = {
    id: uuidv4(),
    name: name,
    blood_type: blood_type,
    created_date: ic.time(),
    updated_at: Opt.None,
  };
  donorStorage.insert(donor.id, donor);
  return donor.id;
}

// Function to handle a blood donation pledge
$update;
export function makePledge(payload: PledgePayload): PledgeResponse {
  const donor = getEntity(donorStorage, payload.donor_id);
  const patient = getEntity(patientStorage, payload.patient_id);

  if (!donor || !patient) {
    return {
      msg: "Invalid donor or patient ID",
      amount: 0,
    };
  }

  const pledge = {
    id: uuidv4(),
    donor_id: donor.id,
    patient_id: patient.id,
    amount: payload.amount,
    created_date: ic.time(),
    updated_at: Opt.None,
  };
  pledgeStorage.insert(pledge.id, pledge);

  return {
    msg: `Thank you for your pledge. Amount: $${payload.amount}`,
    amount: parseFloat(payload.amount),
  };
}

// Function to get pledges for a specific patient
$query;
export function getPledgesForPatient(patient_id: string): Result<Vec<Pledge>, string> {
  const pledges = pledgeStorage.values().filter((pledge) => pledge.patient_id === patient_id);
  if (pledges.length === 0) {
    throw new Error("No pledges found for the specified patient");
  }
  return Result.Ok(pledges);
}

// Function to update patient information
$update;
export function updatePatient(id: string, name: string, blood_type: string): string {
  const existingPatient = getEntity(patientStorage, id);

  if (existingPatient) {
    existingPatient.name = name;
    existingPatient.blood_type = blood_type;
    existingPatient.updated_at = Opt.Some(ic.time());
    patientStorage.insert(existingPatient.id, existingPatient);
    return existingPatient.id;
  }

  throw new Error("Patient not found");
}

// Function to update donor information
$update;
export function updateDonor(id: string, name: string, blood_type: string): string {
  const existingDonor = getEntity(donorStorage, id);

  if (existingDonor) {
    existingDonor.name = name;
    existingDonor.blood_type = blood_type;
    existingDonor.updated_at = Opt.Some(ic.time());
    donorStorage.insert(existingDonor.id, existingDonor);
    return existingDonor.id;
  }

  throw new Error("Donor not found");
}

// Function to delete a patient
$update;
export function deletePatient(id: string): string {
  const existingPatient = getEntity(patientStorage, id);

  if (existingPatient) {
    patientStorage.remove(id);
    return `Patient with ID: ${id} removed successfully`;
  }

  throw new Error("Patient not found");
}

// Function to delete a donor
$update;
export function deleteDonor(id: string): string {
  const existingDonor = getEntity(donorStorage, id);

  if (existingDonor) {
    donorStorage.remove(id);
    return `Donor with ID: ${id} removed successfully`;
  }

  throw new Error("Donor not found");
}

// Function to update a blood donation pledge
$update;
export function updatePledge(id: string, amount: string): string {
  const existingPledge = getEntity(pledgeStorage, id);

  if (existingPledge) {
    existingPledge.amount = amount;
    existingPledge.updated_at = Opt.Some(ic.time());
    pledgeStorage.insert(existingPledge.id, existingPledge);
    return `Pledge with ID: ${id} updated successfully`;
  }

  throw new Error("Pledge not found");
}

// Function to delete a blood donation pledge
$update;
export function deletePledge(id: string): string {
  const existingPledge = getEntity(pledgeStorage, id);

  if (existingPledge) {
    pledgeStorage.remove(id);
    return `Pledge with ID: ${id} removed successfully`;
  }

  throw new Error("Pledge not found");
}

$query;
export function findPotentialDonorsForPatient(patientBloodType: string): Result<Vec<Donor>, string> {
  const potentialDonors = donorStorage.values().filter((donor) => donor.blood_type === patientBloodType);
  if (potentialDonors.length === 0) {
    return Result.Err("No potential donors found for the specified blood type");
  }
  return Result.Ok(potentialDonors);
}

$query;
export function getPledgeSummary(): number {
  const totalPledgedAmount = pledgeStorage.values().reduce((total, pledge) => total + parseFloat(pledge.amount), 0);
  return totalPledgedAmount;
}

$update;
export function updateHospitalInfo(id: string, name: string, location: string): string {
  const existingHospital = match(hospitalStorage.get(id), {
    Some: (hospital) => hospital,
    None: () => ({} as unknown as Hospital),
  });

  if (existingHospital.id) {
    existingHospital.name = name;
    existingHospital.location = location;
    existingHospital.updated_at = Opt.Some(ic.time());
    hospitalStorage.insert(existingHospital.id, existingHospital);
    return existingHospital.id;
  }

  return "Hospital not found";
}

$update;
export function removeExpiredPledges(expiryThreshold: number): string {
  const currentTime = ic.time();
  const expiredPledges = pledgeStorage.values().filter((pledge) => currentTime - pledge.created_date > expiryThreshold);

  expiredPledges.forEach((pledge) => pledgeStorage.remove(pledge.id));

  return `${expiredPledges.length} expired pledges removed successfully`;
}

// Define a new record type for Organ
type Organ = Record<{
  id: string;
  name: string;
  donor_id: string; // The ID of the donor who donated the organ
  patient_id: string; // The ID of the patient who received the organ
  created_date: nat64;
  updated_at: Opt<nat64>;
}>;

// Create an instance of StableBTreeMap for Organ
const organStorage = new StableBTreeMap<string, Organ>(4, 44, 512);

// Function to add a new organ
$update;
export function addOrgan(name: string, donor_id: string, patient_id: string): string {
  const organ = {
    id: uuidv4(),
    name: name,
    donor_id: donor_id,
    patient_id: patient_id,
    created_date: ic.time(),
    updated_at: Opt.None,
  };
  organStorage.insert(organ.id, organ);
  return organ.id;
}

// Function to get information about organs
$query;
export function getOrgans(): Result<Vec<Organ>, string> {
  const organs = organStorage.values();
  if (organs.length === 0) {
    return Result.Err("No organs found");
  }
  return Result.Ok(organs);
}

// Function to update organ information
$update;
export function updateOrgan(id: string, name: string): string {
  const existingOrgan = match(organStorage.get(id), {
    Some: (organ) => organ,
    None: () => ({} as unknown as Organ),
  });

  if (existingOrgan.id) {
    existingOrgan.name = name;
    existingOrgan.updated_at = Opt.Some(ic.time());
    organStorage.insert(existingOrgan.id, existingOrgan);
    return existingOrgan.id;
  }

  return "Organ not found";
}

// Function to delete an organ
$update;
export function deleteOrgan(id: string): string {
  const existingOrgan = match(organStorage.get(id), {
    Some: (organ) => organ,
    None: () => ({} as unknown as Organ),
  });

  if (existingOrgan.id) {
    organStorage.remove(id);
    return `Organ with ID: ${id} removed successfully`;
  }

  return "Organ not found";
}

// Function to find matching donors for a specific patient based on blood type and location
$query;
export function findMatchingDonorsForPatient(patientBloodType: string, patientLocation: string): Result<Vec<Donor>, string> {
  const matchingDonors = donorStorage.values().filter((donor) => {
    // Check if the donor has the same blood type as the patient
    const hasMatchingBloodType = donor.blood_type === patientBloodType;

    // Check if the donor is located in the same location as the patient
    const isSameLocation = match(hospitalStorage.get(donor.id), {
      Some: (hospital) => hospital.location === patientLocation,
      None: () => false,
    });

    return hasMatchingBloodType && isSameLocation;
  });

  if (matchingDonors.length === 0) {
    return Result.Err("No matching donors found for the specified criteria");
  }

  return Result.Ok(matchingDonors);
}

// Function to get organ donors for a specific patient
$query;
export function getOrganDonorsForPatient(patient_id: string): Result<Vec<Donor>, string> {
  const organDonors = organStorage.values().filter((organ) => organ.patient_id === patient_id);

  if (organDonors.length === 0) {
    return Result.Err("No organ donors found for the specified patient");
  }

  // Extract unique donor IDs from organ donors
  const donorIds = Array.from(new Set(organDonors.map((organ) => organ.donor_id)));

  // Retrieve donor information for the identified donor IDs
  const donors = donorIds.map((donorId) =>
    match(donorStorage.get(donorId), {
      Some: (donor) => donor,
      None: () => ({} as unknown as Donor),
    })
  );

  return Result.Ok(donors);
}

// Function to get organs donated by a specific donor
$query;
export function getOrgansDonatedByDonor(donor_id: string): Result<Vec<Organ>, string> {
  const donatedOrgans = organStorage.values().filter((organ) => organ.donor_id === donor_id);

  if (donatedOrgans.length === 0) {
    return Result.Err("No organs found for the specified donor");
  }

  return Result.Ok(donatedOrgans);
}

// Function to get organs received by a specific patient
$query;
export function getOrgansReceivedByPatient(patient_id: string): Result<Vec<Organ>, string> {
  const receivedOrgans = organStorage.values().filter((organ) => organ.patient_id === patient_id);

  if (receivedOrgans.length === 0) {
    return Result.Err("No organs found for the specified patient");
  }

  return Result.Ok(receivedOrgans);
}

// Define a new record type for MedicalRecord
type MedicalRecord = Record<{
  id: string;
  patient_id: string;
  doctor_name: string;
  diagnosis: string;
  prescription: string;
  created_date: nat64;
  updated_at: Opt<nat64>;
}>;

// Create an instance of StableBTreeMap for MedicalRecord
const medicalRecordStorage = new StableBTreeMap<string, MedicalRecord>(5, 44, 512);

// Function to add a new medical record
$update;
export function addMedicalRecord(patient_id: string, doctor_name: string, diagnosis: string, prescription: string): string {
  const medicalRecord = {
    id: uuidv4(),
    patient_id: patient_id,
    doctor_name: doctor_name,
    diagnosis: diagnosis,
    prescription: prescription,
    created_date: ic.time(),
    updated_at: Opt.None,
  };
  medicalRecordStorage.insert(medicalRecord.id, medicalRecord);
  return medicalRecord.id;
}

// Function to get medical records for a specific patient
$query;
export function getMedicalRecordsForPatient(patient_id: string): Result<Vec<MedicalRecord>, string> {
  const medicalRecords = medicalRecordStorage.values().filter((record) => record.patient_id === patient_id);

  if (medicalRecords.length === 0) {
    return Result.Err("No medical records found for the specified patient");
  }

  return Result.Ok(medicalRecords);
}

// Function to update medical record information
$update;
export function updateMedicalRecord(id: string, diagnosis: string, prescription: string): string {
  const existingRecord = match(medicalRecordStorage.get(id), {
    Some: (record) => record,
    None: () => ({} as unknown as MedicalRecord),
  });

  if (existingRecord.id) {
    existingRecord.diagnosis = diagnosis;
    existingRecord.prescription = prescription;
    existingRecord.updated_at = Opt.Some(ic.time());
    medicalRecordStorage.insert(existingRecord.id, existingRecord);
    return existingRecord.id;
  }

  return "Medical record not found";
}

// Function to delete a medical record
$update;
export function deleteMedicalRecord(id: string): string {
  const existingRecord = match(medicalRecordStorage.get(id), {
    Some: (record) => record,
    None: () => ({} as unknown as MedicalRecord),
  });

  if (existingRecord.id) {
    medicalRecordStorage.remove(id);
    return `Medical record with ID: ${id} removed successfully`;
  }

  return "Medical record not found";
}

// Mocking the 'crypto' object for testing purposes
globalThis.crypto = {
    // @ts-ignore
    getRandomValues: () => {
      let array = new Uint8Array(32);
  
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
  
      return array;
    },
  };
