'use client';

import useProfileAvatar from '../../hooks/useProfileAvatar';
import { AvatarImage } from './ProfileAvatar.styles';

/**
 * The owner's photo from admin, with initials until it loads or when none is uploaded.
 * Decorative: the name is always printed beside it.
 */
export default function ProfileAvatar( { size = 84, ...props } ) {
  const avatar = useProfileAvatar();
  return (
    <AvatarImage src={ avatar || undefined } alt="" aria-hidden="true" variant="rounded" $size={ size } { ...props }>LC</AvatarImage>
  );
}
