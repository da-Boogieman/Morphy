import React from 'react';
import { useSkeletonKey } from '../../../hooks/useSkeletonKey';

interface InheritanceKeyProps {
  childId: string;
  birthdate: string;
  name: string;
}

export function InheritanceKey({ childId, birthdate, name }: InheritanceKeyProps) {
  const { generateKey } = useSkeletonKey();
  
  const generateInheritanceKey = async () => {
    // Create unique quantum signature using birthdate
    const signature = await generateKey(`${childId}-${birthdate}`);
    return signature;
  };

  return (
    <div className="p-4 bg-purple-900/20 rounded-lg backdrop-blur-sm">
      <h3 className="text-lg font-semibold">{name}'s Quantum Key</h3>
      <p className="text-sm text-gray-300 mt-1">Protected by birthdate verification</p>
      
      <div className="mt-4 text-xs font-mono bg-black/30 p-2 rounded">
        Quantum Signature: {childId}
      </div>
    </div>
  );
}