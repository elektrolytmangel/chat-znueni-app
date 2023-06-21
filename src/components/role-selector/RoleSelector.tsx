import { AiRole } from '../../model/app';
import { roles } from '../../model/defaults';
import { setPersistedRole } from '../../store/store';

type Props = {
  selectedRole: AiRole,
  setRole: (s: AiRole) => void,
}

const RoleSelector = ({ selectedRole, setRole }: Props) => {
  const handleRoleChange = (i: number) => {
    const r = roles.find(x => x.index === i);
    setRole(r!);
    setPersistedRole(r!);
  }

  return (
    <select className="form-select form-select-sm" value={selectedRole.index} onChange={e => handleRoleChange(parseInt(e.target.value))}>
      {roles.map(r => {
        return (
          <option key={r.index} value={r.index}>{r.displayName}</option>
        );
      })}
    </select>
  );
}

export default RoleSelector;