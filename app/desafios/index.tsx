import React from 'react';
import { DesafioVisaoProfessor } from 'components/DesafioVisaoProfessor';
import { DesafioVisaoAluno } from 'components/DesafioVisaoAluno';
import { useUser } from 'context/UserContext';

export default function ListaDesafios() {
  const { user } = useUser();
  if (!user) return null;
  return user.role === 'PROFESSOR' ? <DesafioVisaoProfessor /> : <DesafioVisaoAluno />;
}
