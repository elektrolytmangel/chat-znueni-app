import { AiRole, roles } from '../../model/app';

type Props = {
  selectedRole: AiRole,
  setRole: (s: AiRole) => void,
}

export const setPersistedRole = (r: AiRole) => {
  localStorage.setItem('role', JSON.stringify(r));
}

export const getPersistedRole = (): AiRole => {
  const r = localStorage.getItem('role');
  if (r) {
    return JSON.parse(r);
  }

  return roles[0];
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