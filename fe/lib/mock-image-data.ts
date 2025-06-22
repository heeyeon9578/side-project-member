// lib/mock-image-data.ts

export const mockImages = Array.from({ length: 165 }, (_, i) => ({
    id: i + 1,
    image_name: `image_${i + 1}.jpg`,
    manuscript_url: i % 3 === 0 ? `/images/manuscript_${i + 1}.jpg` : null,
    original_transposed_url: i % 2 === 0 ? `/images/original_${i + 1}.jpg` : null,
  }));
  