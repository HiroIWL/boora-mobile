import React, { useEffect, useState } from 'react';
import { Container } from 'components/Container';
import { Typography } from 'components/Typography';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { FormInput } from 'components/FormInput';
import { WebView } from 'react-native-webview';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Linking, View } from 'react-native';
import { getDesafioById } from 'services/desafios';
import { criarEntrega } from 'services/entregas';

export default function DesafioPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [desafio, setDesafio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchDesafio() {
      try {
        const data = await getDesafioById(id);
        setDesafio(data);
      } catch {
        setError('Erro ao carregar desafio.');
      } finally {
        setLoading(false);
      }
    }
    fetchDesafio();
  }, [id]);

  function isYoutube(url: string) {
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
  }

  function getYoutubeEmbed(url: string) {
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  }

  async function handleSubmit() {
    if (!videoUrl) return;

    if (!isYoutube(videoUrl)) {
      alert('video inválido, use um link do youtube');
      return;
    }

    setSubmitting(true);
    try {
      await criarEntrega({
        id_desafio: id,
        video_url: videoUrl,
      });
      setShowModal(false);
      setVideoUrl('');
      alert('Entrega registrada com sucesso!');
      router.replace('/desafios');
    } catch {
      alert('Erro ao registrar entrega.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading)
    return (
      <Container align="center" justify="center" className="flex-1">
        <Typography variant="text" color="black">
          Carregando desafio...
        </Typography>
      </Container>
    );

  if (error)
    return (
      <Container align="center" justify="center" className="flex-1">
        <Typography variant="text" color="black" className="text-red-500">
          {error}
        </Typography>
      </Container>
    );

  if (!desafio) return null;

  const embed = isYoutube(desafio.video_url) ? getYoutubeEmbed(desafio.video_url) : null;

  return (
    <Container
      direction="column"
      align="center"
      style={{
        gap: 32,
      }}
      padding="md"
      className="flex-1 bg-white py-12"
      fluid>
      <Typography variant="subtitle" color="black" weight="bold">
        Hoje seu desafio é "{desafio.nome}"!
      </Typography>

      <Container
        bg="primary"
        direction="column"
        gap={10}
        padding="md"
        rounded
        className="w-full max-w-md">
        <Container direction="column" gap={2}>
          <Typography variant="text" color="white" weight="semibold">
            Dicas:
          </Typography>
          <Typography variant="caption" color="white">
            {desafio.descricao}
          </Typography>
        </Container>

        <Container
          bg="white"
          direction="column"
          align="center"
          justify="center"
          rounded
          padding="sm"
          className="w-full"
          style={{
            gap: 8,
            marginTop: 16,
          }}>
          <Typography variant="text" color="black" weight="semibold">
            Ver Tutorial em vídeo
          </Typography>
          <Typography
            variant="text"
            color="primary"
            className="underline"
            onPress={() => Linking.openURL(videoUrl)}>
            Abrir vídeo
          </Typography>
        </Container>
      </Container>

      <Button
        variant="info"
        textColor="black"
        className="w-full max-w-md rounded-md bg-gray-200 px-6 py-3"
        onPress={() => setShowModal(true)}>
        Registre seu desafio 📷
      </Button>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Container
          direction="column"
          style={{
            gap: 16,
          }}>
          <Typography variant="subtitle" color="black" weight="bold">
            Registrar Entrega
          </Typography>

          <FormInput
            label="URL do vídeo"
            placeholder="Insira a URL do vídeo"
            value={videoUrl}
            onChangeText={setVideoUrl}
          />

          <Container
            justify="center"
            style={{
              gap: 16,
              display: 'flex',
              justifyContent: 'space-around',
            }}
            className="mt-4 w-full">
            <Button
              style={{
                maxWidth: 100,
              }}
              variant="primary"
              textColor="white"
              onPress={handleSubmit}
              disabled={submitting}>
              {submitting ? 'Enviando...' : 'Enviar'}
            </Button>

            <Button
              style={{
                maxWidth: 100,
              }}
              variant="white"
              textColor="black"
              onPress={() => setShowModal(false)}>
              Cancelar
            </Button>
          </Container>
        </Container>
      </Modal>
    </Container>
  );
}
