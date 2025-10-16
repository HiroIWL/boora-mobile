import React, { useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Container } from 'components/Container';
import { Typography } from 'components/Typography';
import { Button } from 'components/Button';
import { FormSelect } from 'components/FormSelect';
import { FormInput } from 'components/FormInput';
import { getTurmas } from 'services/turmas';
import { getDesafioById, vincularDesafio } from 'services/desafios';
import { Platform } from 'react-native';

export default function VincularDesafioPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [turmas, setTurmas] = useState([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [nomeDesafio, setNomeDesafio] = useState('');

  const [displayDate, setDisplayDate] = useState('');
  const [apiDate, setApiDate] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [turmasData, desafioData] = await Promise.all([getTurmas(), getDesafioById(id)]);
        setTurmas(turmasData);
        setNomeDesafio(desafioData?.nome || '');
      } catch {
        setError('Erro ao carregar dados.');
      }
    }
    fetchData();
  }, [id]);

  function handleDateChange(value: string) {
    const onlyNumbers = value.replace(/\D/g, '');
    let formatted = '';
    if (onlyNumbers.length <= 2) formatted = onlyNumbers;
    else if (onlyNumbers.length <= 4)
      formatted = `${onlyNumbers.slice(0, 2)}/${onlyNumbers.slice(2)}`;
    else
      formatted = `${onlyNumbers.slice(0, 2)}/${onlyNumbers.slice(2, 4)}/${onlyNumbers.slice(4, 8)}`;
    setDisplayDate(formatted);

    if (onlyNumbers.length === 8) {
      const day = onlyNumbers.slice(0, 2);
      const month = onlyNumbers.slice(2, 4);
      const year = onlyNumbers.slice(4, 8);
      setApiDate(`${year}-${month}-${day}`);
    } else setApiDate('');
  }

  async function handleSubmit() {
    try {
      setLoading(true);
      setError('');

      await vincularDesafio(id, {
        data_desafio: apiDate,
        turmas: selected,
      });

      alert('Desafio atribuído com sucesso!');
      router.replace('/desafios');
    } catch {
      setError('Erro ao atribuir desafio.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container direction="column" align="center" gap={6} padding="md" className="flex-1">
      <Typography variant="title" color="black" weight="bold">
        Atribuir Desafios
      </Typography>

      <Typography variant="text" color="black">
        Desafio: {nomeDesafio || '...'}
      </Typography>

      <Container direction="column" gap={6} className="w-full max-w-md mt-12">
        <FormSelect
          label="Turmas"
          multi
          options={turmas.map((t) => ({ label: t.nome, value: t.id }))}
          onChange={(values) => setSelected(Array.isArray(values) ? values : [values])}
        />

        <FormInput
          label="Data do desafio"
          placeholder="DD/MM/AAAA"
          value={displayDate}
          maxLength={10}
          type="number"
          onChangeText={handleDateChange}
        />

        {error ? (
          <Typography variant="caption" color="primary" className="text-red-500">
            {error}
          </Typography>
        ) : null}

        <Button
          className="mt-16"
          variant="primary"
          textColor="white"
          onPress={handleSubmit}
          disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </Container>
    </Container>
  );
}
