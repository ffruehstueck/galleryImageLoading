import { GallerySlideType } from '../types/gallery';

export const galleryData: GallerySlideType[] = [
  {
    id: '1',
    title: 'Mountain Retreat',
    description: 'Serene views of alpine landscapes',
    mainImage: {
      src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Mountain landscape with lake'
    },
    hiddenImages: [
      {
        src: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Mountain cabin'
      },
      {
        src: 'https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Mountain trail'
      }
    ]
  },
  {
    id: '2',
    title: 'Ocean Serenity',
    description: 'Peaceful coastal scenery',
    mainImage: {
      src: 'https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Coastal view with blue ocean'
    },
    hiddenImages: [
      {
        src: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Beach sunset'
      },
      {
        src: 'https://images.pexels.com/photos/533923/pexels-photo-533923.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Rocky coastline'
      }
    ]
  },
  {
    id: '3',
    title: 'Urban Exploration',
    description: 'Vibrant city life and architecture',
    mainImage: {
      src: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'City skyline at night'
    },
    hiddenImages: [
      {
        src: 'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'City street with cafes'
      },
      {
        src: 'https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Modern architecture'
      }
    ]
  }
];