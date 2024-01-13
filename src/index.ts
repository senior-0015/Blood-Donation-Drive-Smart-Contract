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
    return Result.Err("No hospitals found");
  }
  return Result.Ok(hospitals);
}

$query;
// Function to get information about patients
export function getPatients(): Result<Vec<Patient>, string> {
  const patients = patientStorage.values();
  if (patients.length === 0) {
    return Result.Err("No patients found");
  }
  return Result.Ok(patients);
}

$query;
// Function to get information about donors
export function getDonors(): Result<Vec<Donor>, string> {
  const donors = donorStorage.values();
  if (donors.length === 0) {
    return Result.Err("No donors found");
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
  const donor = match(donorStorage.get(payload.donor_id), {
    Some: (donor) => donor,
    None: () => ({} as unknown as Donor),
  });

  const patient = match(patientStorage.get(payload.patient_id), {
    Some: (patient) => patient,
    None: () => ({} as unknown as Patient),
  });

  if (!donor.id || !patient.id) {
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
    return Result.Err("No pledges found for the specified patient");
  }
  return Result.Ok(pledges);
}

// Function to update patient information
$update;
export function updatePatient(id: string, name: string, blood_type: string): string {
  const existingPatient = match(patientStorage.get(id), {
    Some: (patient) => patient,
    None: () => ({} as unknown as Patient),
  });

  if (existingPatient.id) {
    existingPatient.name = name;
    existingPatient.blood_type = blood_type;
    existingPatient.updated_at = Opt.Some(ic.time());
    patientStorage.insert(existingPatient.id, existingPatient);
    return existingPatient.id;
  }

  return "Patient not found";
}

// Function to update donor information
$update;
export function updateDonor(id: string, name: string, blood_type: string): string {
  const existingDonor = match(donorStorage.get(id), {
    Some: (donor) => donor,
    None: () => ({} as unknown as Donor),
  });

  if (existingDonor.id) {
    existingDonor.name = name;
    existingDonor.blood_type = blood_type;
    existingDonor.updated_at = Opt.Some(ic.time());
    donorStorage.insert(existingDonor.id, existingDonor);
    return existingDonor.id;
  }

  return "Donor not found";
}

// Function to delete a patient
$update;
export function deletePatient(id: string): string {
  const existingPatient = match(patientStorage.get(id), {
    Some: (patient) => patient,
    None: () => ({} as unknown as Patient),
  });

  if (existingPatient.id) {
    patientStorage.remove(id);
    return `Patient with ID: ${id} removed successfully`;
  }

  return "Patient not found";
}

// Function to delete a donor
$update;
export function deleteDonor(id: string): string {
  const existingDonor = match(donorStorage.get(id), {
    Some: (donor) => donor,
    None: () => ({} as unknown as Donor),
  });

  if (existingDonor.id) {
    donorStorage.remove(id);
    return `Donor with ID: ${id} removed successfully`;
  }

  return "Donor not found";
}

// Function to update a blood donation pledge
$update;
export function updatePledge(id: string, amount: string): string {
  const existingPledge = match(pledgeStorage.get(id), {
    Some: (pledge) => pledge,
    None: () => ({} as unknown as Pledge),
  });

  if (existingPledge.id) {
    existingPledge.amount = amount;
    existingPledge.updated_at = Opt.Some(ic.time());
    pledgeStorage.insert(existingPledge.id, existingPledge);
    return `Pledge with ID: ${id} updated successfully`;
  }

  return "Pledge not found";
}

// Function to delete a blood donation pledge
$update;
export function deletePledge(id: string): string {
  const existingPledge = match(pledgeStorage.get(id), {
    Some: (pledge) => pledge,
    None: () => ({} as unknown as Pledge),
  });

  if (existingPledge.id) {
    pledgeStorage.remove(id);
    return `Pledge with ID: ${id} removed successfully`;
  }

  return "Pledge not found";
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