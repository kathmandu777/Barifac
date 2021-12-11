import React from 'react';

import {
  Flex,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

export type ScoreSliderProps = {
  name: string;
  rate: number;
  score: number;
  onChange: (score: number) => void;
};

const ScoreSlider: React.FC<ScoreSliderProps> = ({
  name,
  rate,
  score,
  onChange,
}) => {
  return (
    <VStack w='full'>
      <Flex justifyContent='space-between' w='full'>
        <Text color='gray.500'>
          {name}({rate}%)
        </Text>
        <ArrowForwardIcon boxSize={6} color='whiteAlpha.900' />
      </Flex>
      <Flex w='full'>
        <Text lineHeight={6} color='whiteAlpha.900'>
          {score}/ 100
        </Text>
        <Slider defaultValue={score} onChange={onChange}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Flex>
    </VStack>
  );
};

export default ScoreSlider;
