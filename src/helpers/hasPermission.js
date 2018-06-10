const Permissions = ["admin", "agent", "read"];

export default function hasPermission (permission) {
  return Permissions.some(defaultPermisson => defaultPermisson === permission);
};
