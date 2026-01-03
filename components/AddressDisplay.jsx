import { formatAddress } from '@/lib/address-utils';

/**
 * AddressDisplay Component
 * Displays formatted address information
 * @param {Object} props
 * @param {Object} props.addressData - Address data object
 * @param {string} props.addressData.address - Street address
 * @param {string} props.addressData.addressCity - City value
 * @param {string} props.addressData.addressCountry - Country value
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.emptyText - Text to display when address is empty (default: 'Not provided')
 */
export function AddressDisplay( { addressData, className = '', emptyText = 'Not provided' } ) {
  const formattedAddress = formatAddress( addressData );

  if ( !formattedAddress ) {
    return (
      <span className={ `text-gray-500 dark:text-gray-400 italic ${className}` }>
        { emptyText }
      </span>
    );
  }

  return (
    <div className={ `text-gray-700 dark:text-gray-300 ${className}` }>
      { formattedAddress }
    </div>
  );
}

