module.exports = {
  OK: '0',
  SYS_ERROR: '-1',
  SYS_FORBIDDEN: '10401',
  SYS_NOT_FOUND: '10404',
  BIZ_PARAMETER_ERROR: '20001',
  BIZ_INVITE_CODE_INVALID: '20002',
  BIZ_INVITE_CODE_CLOSED: '20003',
  BIZ_UNIT_NOT_COMPATIBLE: '20004',
  BIZ_PROJECT_CODE_INVALID: '20005',
  BIZ_PASSWORD_INVALID: '20006',
  BIZ_THIRD_PARTY_INVALID: '20007',
  messageMap: {
    '0': 'success',
    '-1': 'system error',
    '10401': 'forbidden',
    '10404': 'not found',
    '20001': 'invalid parameter',
    '20002': 'invite code is invalid',
    '20003': 'invite code is closed',
    '20004': 'value unit not compatible',
    '20005': 'project code is invalid',
    '20006': 'password is invalid',
    '20007': 'third party app is invalid'
  }
}
