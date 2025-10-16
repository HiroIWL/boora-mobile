import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Container } from 'components/Container';
import { Typography } from 'components/Typography';
import { Button } from 'components/Button';
import { FormInput } from 'components/FormInput';
import { criarDesafio } from 'services/desafios';

export default function CriarDesafioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    nome: '',
    duracao: '',
    descricao: '',
    video_url: '',
    nota_maxima: '',
  });

  function isYoutubeUrl(url: string) {
    const pattern =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w\-]{11}($|&|\?)/i;
    return pattern.test(url);
  }

  async function handleSubmit() {
    try {
      setLoading(true);
      setError('');

      if (form.video_url && !isYoutubeUrl(form.video_url)) {
        setError('Insira uma URL válida do YouTube.');
        setLoading(false);
        return;
      }

      const body = {
        nome: form.nome,
        duracao: Number(form.duracao),
        descricao: form.descricao,
        video_url: form.video_url,
        nota_maxima: Number(form.nota_maxima),
      };

      await criarDesafio(body);
      alert('Desafio criado com sucesso!');
      router.replace('/desafios');
    } catch {
      setError('Erro ao criar desafio.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container direction="column" align="center" gap={6} padding="md" className="flex-1" fluid>
      <Typography variant="title" color="black" weight="bold">
        Criar Novo Desafio
      </Typography>

      <Container direction="column" gap={6} className="mt-16 w-full max-w-md">
        <FormInput
          label="Nome do desafio"
          placeholder="Digite o nome do desafio"
          value={form.nome}
          onChangeText={(text) => setForm({ ...form, nome: text })}
        />

        <FormInput
          label="Duração"
          placeholder="Duração do desafio (em minutos)"
          type="number"
          value={form.duracao}
          onChangeText={(text) => setForm({ ...form, duracao: text })}
        />

        <FormInput
          label="Descrição"
          placeholder="Insira a descrição do desafio"
          value={form.descricao}
          onChangeText={(text) => setForm({ ...form, descricao: text })}
        />

        <FormInput
          label="Inserir a URL de vídeo tutorial"
          placeholder="Insira a URL do vídeo"
          value={form.video_url}
          onChangeText={(text) => setForm({ ...form, video_url: text })}
        />

        <FormInput
          label="Nota máxima"
          placeholder="Ex: 100"
          type="number"
          value={form.nota_maxima}
          onChangeText={(text) => setForm({ ...form, nota_maxima: text })}
        />

        {error ? (
          <Typography variant="caption" color="primary" className="text-red-500">
            {error}
          </Typography>
        ) : null}

        <Button
          className="mt-8"
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
