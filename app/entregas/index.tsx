import React, { useEffect, useState } from 'react';
import { Container } from 'components/Container';
import { Typography } from 'components/Typography';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { FormInput } from 'components/FormInput';
import { ScrollView, Linking, Dimensions } from 'react-native';
import { getEntregas, avaliarEntrega } from 'services/entregas';
import { useUserType } from 'context/UserTypeContext';

export default function ListaEntregas() {
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<any | null>(null);
  const [nota, setNota] = useState('');
  const [saving, setSaving] = useState(false);

  const { userType } = useUserType();

  function handleNotaChange(n: string) {
    const value = n.replace(/\D/g, '');
    const num = Number(value);
    if (num < 0) return setNota('0');
    if (num > 999) return setNota('999');
    setNota(value);
  }

  async function fetchEntregas() {
    try {
      const data = await getEntregas();
      setEntregas(data);
    } catch {
      setError('Erro ao carregar entregas.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEntregas();
  }, []);

  async function handleAvaliar() {
    if (!selected) return;
    try {
      setSaving(true);
      await avaliarEntrega(selected.id, { nota: Number(nota) });
      alert('Nota atribuída com sucesso!');
      setSelected(null);
      setNota('');
      fetchEntregas();
    } catch {
      alert('Erro ao salvar nota.');
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return (
      <Container
        direction="column"
        align="center"
        gap={10}
        padding="md"
        className="flex-1 py-10"
        justify="center"
        style={{
          minHeight: Dimensions.get('window').height - 80,
        }}
        fluid>
        <Typography variant="text" color="black">
          Carregando entregas...
        </Typography>
      </Container>
    );

  if (error)
    return (
      <Container
        direction="column"
        align="center"
        gap={10}
        padding="md"
        className="flex-1 py-10"
        justify="center"
        style={{
          minHeight: Dimensions.get('window').height - 80,
        }}
        fluid>
        <Typography variant="text" color="black" className="text-red-500">
          {error}
        </Typography>
      </Container>
    );

  return (
    <Container
      direction="column"
      align="center"
      gap={10}
      padding="md"
      className="flex- py-12"
      fluid>
      <Typography variant="title" color="black" weight="bold">
        Avaliar Entregas
      </Typography>

      <ScrollView className="mt-12 w-full max-w-md" showsVerticalScrollIndicator={false}>
        <Container
          direction="column"
          style={{
            gap: 16,
          }}>
          {entregas.map((entrega: any) => (
            <Container
              key={entrega.id}
              direction="row"
              justify="between"
              align="center"
              padding="sm"
              bg="secondary"
              rounded
              gap={4}
              className="w-full">
              <Container className="flex-1" direction="column" align="start" justify="center">
                <Typography variant="label" color="black" weight="semibold">
                  Desafio: {entrega.desafio?.nome}
                </Typography>
                <Typography variant="label" color="black" weight="light">
                  {entrega.aluno?.nome} - {entrega.aluno?.turma?.nome}
                </Typography>
              </Container>

              {!entrega.nota ? (
                <Button
                  variant={userType === 'ALUNO' ? 'secondary' : 'primary'}
                  textColor="white"
                  onPress={() => setSelected(entrega)}
                  className="w-[100] px-6 py-1"
                  style={{
                    width: 125,
                  }}>
                  Avaliar
                </Button>
              ) : (
                <Button
                  variant="info"
                  textColor="white"
                  disabled
                  className="w-[100] px-6 py-1"
                  style={{
                    width: 125,
                  }}>
                  Avaliado
                </Button>
              )}
            </Container>
          ))}
        </Container>
      </ScrollView>

      {selected && (
        <Modal open={!!selected} onClose={() => setSelected(null)}>
          <Container
            direction="column"
            style={{
              gap: 16,
            }}
            padding="md">
            <Typography variant="subtitle" color="black" weight="bold">
              {selected.desafio?.nome}
            </Typography>

            <Typography variant="text" color="black">
              Aluno: {selected.aluno?.nome}
            </Typography>

            <Typography
              variant="text"
              color="primary"
              className="underline"
              onPress={() => Linking.openURL(selected.video_url)}>
              Abrir vídeo
            </Typography>

            <FormInput
              label="Nota"
              placeholder="Digite a nota do aluno"
              type="number"
              maxLength={3}
              value={nota}
              onChangeText={handleNotaChange}
            />

            <Container
              direction="row"
              justify="between"
              style={{
                gap: 16,
              }}
              className="mt-4 w-full">
              <Button
                className="flex-1"
                variant="white"
                textColor="black"
                onPress={() => setSelected(null)}>
                Cancelar
              </Button>

              <Button
                className="flex-1"
                variant="primary"
                textColor="white"
                onPress={handleAvaliar}
                disabled={saving}>
                {saving ? 'Salvando...' : 'Salvar'}
              </Button>
            </Container>
          </Container>
        </Modal>
      )}
    </Container>
  );
}
