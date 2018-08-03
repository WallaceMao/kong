module.exports = {
  OK: '0',
  SYS_ERROR: '-1',
  SYS_FORBIDDEN: '10401',
  SYS_NOT_FOUND: '10404',
  BIZ_PARAMETER_ERROR: '20001',
  messageMap: {
    '0': 'success',
    '-1': 'system error',
    '10401': 'forbidden',
    '10404': 'not found',
    '20001': 'invalid parameter'
  }
}
