export const idlFactory = ({ IDL }) => {
  const Donor = IDL.Record({
    'id' : IDL.Text,
    'updated_at' : IDL.Opt(IDL.Nat64),
    'name' : IDL.Text,
    'blood_type' : IDL.Text,
    'created_date' : IDL.Nat64,
  });
  const _AzleResult = IDL.Variant({ 'Ok' : IDL.Vec(Donor), 'Err' : IDL.Text });
  const Hospital = IDL.Record({
    'id' : IDL.Text,
    'updated_at' : IDL.Opt(IDL.Nat64),
    'name' : IDL.Text,
    'created_date' : IDL.Nat64,
    'location' : IDL.Text,
  });
  const _AzleResult_1 = IDL.Variant({
    'Ok' : IDL.Vec(Hospital),
    'Err' : IDL.Text,
  });
  const MedicalRecord = IDL.Record({
    'id' : IDL.Text,
    'patient_id' : IDL.Text,
    'updated_at' : IDL.Opt(IDL.Nat64),
    'prescription' : IDL.Text,
    'diagnosis' : IDL.Text,
    'doctor_name' : IDL.Text,
    'created_date' : IDL.Nat64,
  });
  const _AzleResult_2 = IDL.Variant({
    'Ok' : IDL.Vec(MedicalRecord),
    'Err' : IDL.Text,
  });
  const Organ = IDL.Record({
    'id' : IDL.Text,
    'patient_id' : IDL.Text,
    'updated_at' : IDL.Opt(IDL.Nat64),
    'name' : IDL.Text,
    'donor_id' : IDL.Text,
    'created_date' : IDL.Nat64,
  });
  const _AzleResult_3 = IDL.Variant({
    'Ok' : IDL.Vec(Organ),
    'Err' : IDL.Text,
  });
  const Pledge = IDL.Record({
    'id' : IDL.Text,
    'patient_id' : IDL.Text,
    'updated_at' : IDL.Opt(IDL.Nat64),
    'donor_id' : IDL.Text,
    'amount' : IDL.Text,
    'created_date' : IDL.Nat64,
  });
  const _AzleResult_4 = IDL.Variant({
    'Ok' : IDL.Vec(Pledge),
    'Err' : IDL.Text,
  });
  const PledgePayload = IDL.Record({
    'patient_id' : IDL.Text,
    'donor_id' : IDL.Text,
    'amount' : IDL.Text,
  });
  const PledgeResponse = IDL.Record({
    'msg' : IDL.Text,
    'amount' : IDL.Float64,
  });
  return IDL.Service({
    'addDonor' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'addMedicalRecord' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'addOrgan' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Text], []),
    'addPatient' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'deleteDonor' : IDL.Func([IDL.Text], [IDL.Text], []),
    'deleteMedicalRecord' : IDL.Func([IDL.Text], [IDL.Text], []),
    'deleteOrgan' : IDL.Func([IDL.Text], [IDL.Text], []),
    'deletePatient' : IDL.Func([IDL.Text], [IDL.Text], []),
    'deletePledge' : IDL.Func([IDL.Text], [IDL.Text], []),
    'findMatchingDonorsForPatient' : IDL.Func(
        [IDL.Text, IDL.Text],
        [_AzleResult],
        ['query'],
      ),
    'findPotentialDonorsForPatient' : IDL.Func(
        [IDL.Text],
        [_AzleResult],
        ['query'],
      ),
    'getDonors' : IDL.Func([], [_AzleResult], ['query']),
    'getHospitals' : IDL.Func([], [_AzleResult_1], ['query']),
    'getMedicalRecordsForPatient' : IDL.Func(
        [IDL.Text],
        [_AzleResult_2],
        ['query'],
      ),
    'getOrganDonorsForPatient' : IDL.Func([IDL.Text], [_AzleResult], ['query']),
    'getOrgans' : IDL.Func([], [_AzleResult_3], ['query']),
    'getOrgansDonatedByDonor' : IDL.Func(
        [IDL.Text],
        [_AzleResult_3],
        ['query'],
      ),
    'getOrgansReceivedByPatient' : IDL.Func(
        [IDL.Text],
        [_AzleResult_3],
        ['query'],
      ),
    'getPatients' : IDL.Func([], [_AzleResult], ['query']),
    'getPledgeSummary' : IDL.Func([], [IDL.Float64], ['query']),
    'getPledgesForPatient' : IDL.Func([IDL.Text], [_AzleResult_4], ['query']),
    'initBloodDrive' : IDL.Func([], [IDL.Text], []),
    'makePledge' : IDL.Func([PledgePayload], [PledgeResponse], []),
    'removeExpiredPledges' : IDL.Func([IDL.Float64], [IDL.Text], []),
    'updateDonor' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Text], []),
    'updateHospitalInfo' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'updateMedicalRecord' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'updateOrgan' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'updatePatient' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Text], []),
    'updatePledge' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
