import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

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
export type _AzleResult_2 = { 'Ok' : Array<Pledge> } |
  { 'Err' : string };
export interface _SERVICE {
  'addDonor' : ActorMethod<[string, string], string>,
  'addPatient' : ActorMethod<[string, string], string>,
  'deleteDonor' : ActorMethod<[string], string>,
  'deletePatient' : ActorMethod<[string], string>,
  'deletePledge' : ActorMethod<[string], string>,
  'getDonors' : ActorMethod<[], _AzleResult>,
  'getHospitals' : ActorMethod<[], _AzleResult_1>,
  'getPatients' : ActorMethod<[], _AzleResult>,
  'getPledgesForPatient' : ActorMethod<[string], _AzleResult_2>,
  'initBloodDrive' : ActorMethod<[], string>,
  'makePledge' : ActorMethod<[PledgePayload], PledgeResponse>,
  'updateDonor' : ActorMethod<[string, string, string], string>,
  'updatePatient' : ActorMethod<[string, string, string], string>,
  'updatePledge' : ActorMethod<[string, string], string>,
}
