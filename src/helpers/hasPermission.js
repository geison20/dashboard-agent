const Permissions = ["admin", "agent", "read"];

export default function hasPermission(permitedArray, agentPermission) {
	return permitedArray.some((permission) => permission === agentPermission);
}
