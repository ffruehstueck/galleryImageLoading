export interface ImageType {
  src: string;
  alt: string;
}

export interface GallerySlideType {
  id: string;
  title: string;
  description: string;
  mainImage: ImageType;
  hiddenImages: ImageType[];
}