export interface Update {
  id: string;
  type: 'new_product' | 'promotion' | 'announcement';
  title: string;
  description: string;
  date: string;
}