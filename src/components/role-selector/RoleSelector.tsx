import { useCallback, useEffect, useState } from 'react';
import { AiRole } from '../../model/app';
import { roles as defaultRoles } from '../../model/defaults';
import { getPersistedCustomRole, setPersistedRole } from '../../store/store';
import CustomRoleForm from '../custom-role-form/CustomRoleForm';

type Props = {
  selectedRole: AiRole;
  setRole: (s: AiRole) => void;
};

const RoleSelector = ({ selectedRole, setRole }: Props) => {
  const [roles, setRoles] = useState<AiRole[]>(defaultRoles);

  const handleRoleChange = useCallback(
    (i: number) => {
      const r = roles.find((x) => x.index === i);
      if (!r) return;
      setRole(r);
      setPersistedRole(r);
    },
    [roles, setRole]
  );

  const onCustomRoleChanged = (r: AiRole) => {
    setRoles((s) => [...s.slice(0, 3), r]);
  };

  useEffect(() => {
    if (selectedRole.index === 3) {
      handleRoleChange(3);
    }
  }, [selectedRole, handleRoleChange]);

  useEffect(() => {
    const customRole = getPersistedCustomRole();
    if (customRole) {
      setRoles((s) => [...s.slice(0, 3), customRole]);
    }
  }, []);

  return (
    <>
      <select
        className="form-select form-select-sm"
        value={selectedRole.index}
        onChange={(e) => handleRoleChange(parseInt(e.target.value))}
      >
        {roles.map((r) => {
          return (
            <option key={r.index} value={r.index}>
              {r.displayName}
            </option>
          );
        })}
      </select>
      <CustomRoleForm onRoleChanged={onCustomRoleChanged} role={getPersistedCustomRole()} />
    </>
  );
};

export default RoleSelector;
