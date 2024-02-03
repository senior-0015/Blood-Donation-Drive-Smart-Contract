import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Donor {
  'id' : string,
  'updated_at' : [] | [bigint],
  'name' : string,
  'blood_type' : string,
  'created_date' : bigint,
}
export interface Hospital {
  'id' : string,
  'updated_at' : [] | [bigint],
  'name' : string,
  'created_date' : bigint,
  'location' : string,
}
export interface MedicalRecord {
  'id' : string,
  'patient_id' : string,
  'updated_at' : [] | [bigint],
  'prescription' : string,
  'diagnosis' : string,
  'doctor_name' : string,
  'created_date' : bigint,
}
export interface Organ {
  'id' : string,
  'patient_id' : string,
  'updated_at' : [] | [bigint],
  'name' : string,
  'donor_id' : string,
  'created_date' : bigint,
}
export interface Pledge {
  'id' : string,
  'patient_id' : string,
  'updated_at' : [] | [bigint],
  'donor_id' : string,
  'amount' : string,
  'created_date' : bigint,
}
export interface PledgePayload {
  'patient_id' : string,
  'donor_id' : string,
  'amount' : string,
}
export interface PledgeResponse { 'msg' : string, 'amount' : number }
export type _AzleResult = { 'Ok' : Array<Donor> } |
  { 'Err' : string };
export type _AzleResult_1 = { 'Ok' : Array<Hospital> } |
  { 'Err' : string };
export type _AzleResult_2 = { 'Ok' : Array<MedicalRecord> } |
  { 'Err' : string };
export type _AzleResult_3 = { 'Ok' : Array<Organ> } |
  { 'Err' : string };
export type _AzleResult_4 = { 'Ok' : Array<Pledge> } |
  { 'Err' : string };
export interface _SERVICE {
  'addDonor' : ActorMethod<[string, string], string>,
  'addMedicalRecord' : ActorMethod<[string, string, string, string], string>,
  'addOrgan' : ActorMethod<[string, string, string], string>,
  'addPatient' : ActorMethod<[string, string], string>,
  'deleteDonor' : ActorMethod<[string], string>,
  'deleteMedicalRecord' : ActorMethod<[string], string>,
  'deleteOrgan' : ActorMethod<[string], string>,
  'deletePatient' : ActorMethod<[string], string>,
  'deletePledge' : ActorMethod<[string], string>,
  'findMatchingDonorsForPatient' : ActorMethod<[string, string], _AzleResult>,
  'findPotentialDonorsForPatient' : ActorMethod<[string], _AzleResult>,
  'getDonors' : ActorMethod<[], _AzleResult>,
  'getHospitals' : ActorMethod<[], _AzleResult_1>,
  'getMedicalRecordsForPatient' : ActorMethod<[string], _AzleResult_2>,
  'getOrganDonorsForPatient' : ActorMethod<[string], _AzleResult>,
  'getOrgans' : ActorMethod<[], _AzleResult_3>,
  'getOrgansDonatedByDonor' : ActorMethod<[string], _AzleResult_3>,
  'getOrgansReceivedByPatient' : ActorMethod<[string], _AzleResult_3>,
  'getPatients' : ActorMethod<[], _AzleResult>,
  'getPledgeSummary' : ActorMethod<[], number>,
  'getPledgesForPatient' : ActorMethod<[string], _AzleResult_4>,
  'initBloodDrive' : ActorMethod<[], string>,
  'makePledge' : ActorMethod<[PledgePayload], PledgeResponse>,
  'removeExpiredPledges' : ActorMethod<[number], string>,
  'updateDonor' : ActorMethod<[string, string, string], string>,
  'updateHospitalInfo' : ActorMethod<[string, string, string], string>,
  'updateMedicalRecord' : ActorMethod<[string, string, string], string>,
  'updateOrgan' : ActorMethod<[string, string], string>,
  'updatePatient' : ActorMethod<[string, string, string], string>,
  'updatePledge' : ActorMethod<[string, string], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
