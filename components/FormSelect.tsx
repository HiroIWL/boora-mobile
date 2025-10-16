import React, { useState } from 'react';
import { Modal, Pressable, View, FlatList, Text } from 'react-native';
import { Container } from './Container';
import { Typography } from './Typography';

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps {
  label: string;
  options: Option[];
  error?: string;
  multi?: boolean;
  placeholder?: string;
  name?: string;
  required?: boolean;
  onChange?: (value: string | string[]) => void;
}

export function FormSelect({
  label,
  options,
  error,
  multi = false,
  placeholder = 'Selecione...',
  onChange,
}: FormSelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  function handleSelect(value: string) {
    if (multi) {
      setSelected((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    } else {
      setSelected([value]);
      setOpen(false);
    }
  }

  function handleConfirm() {
    setOpen(false);
    if (onChange) onChange(multi ? selected : selected[0] || '');
  }

  const displayLabel =
    selected.length === 0
      ? placeholder
      : multi
        ? `${selected.length} selecionado(s)`
        : options.find((o) => o.value === selected[0])?.label || placeholder;

  return (
    <Container direction="column" gap={2} className="w-full">
      <Typography variant="label" color="black" weight="semibold">
        {label}
      </Typography>

      <Pressable
        onPress={() => setOpen(true)}
        className={[
          'w-full rounded-md border bg-white px-4 py-3',
          'flex-row items-center justify-between',
          error ? 'border-red-500' : 'border-gray-300',
        ].join(' ')}>
        <Text className={selected.length === 0 ? 'text-gray-400' : 'font-medium text-gray-900'}>
          {displayLabel}
        </Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <View className="flex-1 justify-center bg-black/40 px-6">
          <View className="max-h-[70%] rounded-lg bg-white shadow-lg">
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => {
                const isSelected = selected.includes(item.value);
                return (
                  <Pressable
                    onPress={() => handleSelect(item.value)}
                    className={[
                      'flex-row items-center justify-between border-b border-gray-200 px-4 py-3',
                      isSelected ? 'bg-orange-200' : '',
                    ].join(' ')}>
                    <Text
                      className={`${
                        isSelected ? 'font-semibold text-orange-700' : 'text-gray-800'
                      }`}>
                      {item.label}
                    </Text>
                    {isSelected && <Text className="text-orange-600">✓</Text>}
                  </Pressable>
                );
              }}
            />

            <Pressable onPress={handleConfirm} className="rounded-b-lg bg-[#FF8C00] px-4 py-3">
              <Text className="text-center font-semibold text-white">Confirmar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {error && (
        <Typography
          variant="caption"
          color="primary"
          weight="regular"
          className="mt-1 text-red-500">
          {error}
        </Typography>
      )}
    </Container>
  );
}
