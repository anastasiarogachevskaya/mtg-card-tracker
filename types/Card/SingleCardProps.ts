export type SingleCardProps = {
  artist: string;
  id: string;
  object: string;
  name: string;
  type_line: string;
  image_uris: {
    png: string;
    small: string;
    normal: string;
    large: string;
    border_crop: string;
  },
  oracle_text: string;
  cmc: number;
  mana_cost: string;
  flavor_text: string;
  color_identity: [];
  set_name: string;
  set_type: string;
  released_at: string;
  rarity: string;
  reserved: boolean;
  reprint: boolean;
  promo: boolean;
  collector_number: number;
  prices: {
    [key: string]: string;
  }
}

/** 
 * Extra parameters for the card
 */
 export type AbbrProps = {
  cost?: string;
  colorName?: string;
}

export type CMCProps = {
  type: string;
  title: string;
  class: string;
}

export type BProps = {
  uppercase?: boolean;
}