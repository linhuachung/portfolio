export function mapFieldValueToTranslation( fieldValue, tValues ) {
  const valueMap = {
    'Available': 'available',
    '3+ Years': 'years',
    'Vienamese': 'nationality',
    'English, Vietnamese': 'languages'
  };

  const translationKey = valueMap[fieldValue];
  return translationKey ? tValues( translationKey ) : fieldValue;
}

export function mapServiceValueToTranslationKey( serviceValue ) {
  const serviceMap = {
    'fe': 'frontend',
    'be': 'backend',
    'fs': 'fullstack'
  };

  return serviceMap[serviceValue] || serviceValue;
}

export function mapCvValidationCodeToTranslationKey( code ) {
  const codeMap = {
    'NOT_FOUND': 'notAvailable',
    'OUTDATED_PATH': 'outdatedPath',
    'INVALID_PATH': 'invalidPath'
  };

  return codeMap[code] || 'notAvailable';
}
