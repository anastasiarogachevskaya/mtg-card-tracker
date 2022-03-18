export type ListingCardProps = {
  id: string;
  object: string;
  set: string;
  collector_number: string;
  name: string;
  image_uris: {
    small: string;
    normal: string;
  },
}