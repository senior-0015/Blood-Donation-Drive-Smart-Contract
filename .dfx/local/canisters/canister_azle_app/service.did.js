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
  const Pledge = IDL.Record({
    'id' : IDL.Text,
    'patient_id' : IDL.Text,
    'updated_at' : IDL.Opt(IDL.Nat64),
    'donor_id' : IDL.Text,
    'amount' : IDL.Text,
    'created_date' : IDL.Nat64,
  });
  const _AzleResult_2 = IDL.Variant({
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
    'addPatient' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'deleteDonor' : IDL.Func([IDL.Text], [IDL.Text], []),
    'deletePatient' : IDL.Func([IDL.Text], [IDL.Text], []),
    'deletePledge' : IDL.Func([IDL.Text], [IDL.Text], []),
    'getDonors' : IDL.Func([], [_AzleResult], ['query']),
    'getHospitals' : IDL.Func([], [_AzleResult_1], ['query']),
    'getPatients' : IDL.Func([], [_AzleResult], ['query']),
    'getPledgesForPatient' : IDL.Func([IDL.Text], [_AzleResult_2], ['query']),
    'initBloodDrive' : IDL.Func([], [IDL.Text], []),
    'makePledge' : IDL.Func([PledgePayload], [PledgeResponse], []),
    'updateDonor' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Text], []),
    'updatePatient' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Text], []),
    'updatePledge' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
