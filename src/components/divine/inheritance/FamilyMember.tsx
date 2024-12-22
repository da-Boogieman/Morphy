import React from 'react';

export interface FamilyMemberData {
  id: string;
  name: string;
  birthdate: string;
  relation: string;
}

interface FamilyMemberProps {
  member: FamilyMemberData;
}

export function FamilyMember({ member }: FamilyMemberProps) {
  return (
    <div className="p-4 bg-purple-900/20 rounded-lg backdrop-blur-sm">
      <h3 className="text-lg font-semibold">{member.name}</h3>
      <p className="text-sm text-gray-300">{member.relation}</p>
      <div className="mt-2 text-xs font-mono bg-black/30 p-2 rounded">
        Born: {member.birthdate}
      </div>
    </div>
  );
}