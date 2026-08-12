export interface Seeder {
  seed(): Promise<boolean>;
}
