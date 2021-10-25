import { CofeDbUser, CofeWhoami } from '@cofe/types';

export const user2whoami = ({
  user_metadata: { user_name, full_name, avatar_url },
  id,
  updated_at,
}: Partial<CofeDbUser>): Partial<CofeWhoami> => {
  return {
    id,
    updated_at,
    username: user_name || full_name,
    avatar_url,
    website: '',
  };
};
