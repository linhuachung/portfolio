'use client';

export default function EmptyState( { message = 'No data available', height = 'h-[300px]' } ) {
  return (
    <div className={ `flex items-center justify-center ${height} text-white/60` }>
      { message }
    </div>
  );
}

