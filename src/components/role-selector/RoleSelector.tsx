import { AiRole, roles } from '../../model/app';

type Props = {
  setRole: (s: AiRole) => void,
}

const RoleSelector = ({ setRole }: Props) => {
  const handleRoleChange = (i: number) => {
    const r = roles.find(x => x.index === i);
    setRole(r!);
  }

  return (
    <select className="form-select form-select-sm" onChange={e => handleRoleChange(parseInt(e.target.value))}>
      {roles.map(r => {
        return (
          <option key={r.index} value={r.index}>{r.displayName}</option>
        );
      })}
    </select>
  );
}

export default RoleSelector;